-- Security Tables for Nexus Forge
-- Stores encrypted sensitive data, audit logs, sessions, and 2FA

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Encrypted user data table (PII, bank accounts, etc.)
CREATE TABLE IF NOT EXISTS encrypted_user_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data_type VARCHAR(50) NOT NULL, -- 'email', 'bank_account', 'card', 'pii'
  encrypted_value TEXT NOT NULL,
  iv TEXT NOT NULL,
  auth_tag TEXT NOT NULL,
  last_4 VARCHAR(4), -- For display purposes (cards, accounts)
  metadata JSONB, -- Additional non-sensitive metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, data_type)
);

-- Audit logs for security events
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'login', 'logout', 'data_access', 'data_modify', etc.
  resource VARCHAR(100) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Secure sessions table
CREATE TABLE IF NOT EXISTS secure_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for session lookups
CREATE INDEX IF NOT EXISTS idx_secure_sessions_token_hash ON secure_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_secure_sessions_user_id ON secure_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_secure_sessions_expires_at ON secure_sessions(expires_at);

-- Two-Factor Authentication table
CREATE TABLE IF NOT EXISTS user_2fa (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  secret_encrypted TEXT NOT NULL,
  secret_iv TEXT NOT NULL,
  secret_auth_tag TEXT NOT NULL,
  enabled BOOLEAN DEFAULT FALSE,
  backup_codes TEXT[], -- Encrypted backup codes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  enabled_at TIMESTAMP WITH TIME ZONE
);

-- API Keys table (for integrations)
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- Create index for API key lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) NOT NULL, -- IP address, user_id, or API key
  action VARCHAR(100) NOT NULL, -- 'login', 'api_call', etc.
  attempt_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(identifier, action)
);

-- Create index for rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier, action);

-- CSRF tokens table
CREATE TABLE IF NOT EXISTS csrf_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for CSRF token lookups
CREATE INDEX IF NOT EXISTS idx_csrf_tokens_token ON csrf_tokens(token);
CREATE INDEX IF NOT EXISTS idx_csrf_tokens_user_id ON csrf_tokens(user_id);

-- Password history (prevent reuse)
CREATE TABLE IF NOT EXISTS password_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for password history lookups
CREATE INDEX IF NOT EXISTS idx_password_history_user_id ON password_history(user_id);

-- Security settings per user
CREATE TABLE IF NOT EXISTS user_security_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  require_2fa BOOLEAN DEFAULT FALSE,
  session_timeout_minutes INTEGER DEFAULT 1440, -- 24 hours
  allowed_ip_addresses INET[],
  security_questions JSONB, -- Encrypted security questions/answers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM secure_sessions WHERE expires_at < NOW();
  DELETE FROM csrf_tokens WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  p_user_id UUID,
  p_action VARCHAR,
  p_resource VARCHAR,
  p_ip_address INET,
  p_user_agent TEXT,
  p_success BOOLEAN,
  p_details JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    resource,
    ip_address,
    user_agent,
    success,
    details
  ) VALUES (
    p_user_id,
    p_action,
    p_resource,
    p_ip_address,
    p_user_agent,
    p_success,
    p_details
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier VARCHAR,
  p_action VARCHAR,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 15
)
RETURNS BOOLEAN AS $$
DECLARE
  v_record RECORD;
  v_window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  v_window_start := NOW() - (p_window_minutes || ' minutes')::INTERVAL;
  
  SELECT * INTO v_record
  FROM rate_limits
  WHERE identifier = p_identifier
    AND action = p_action;
  
  -- Check if blocked
  IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > NOW() THEN
    RETURN FALSE;
  END IF;
  
  -- Reset if window expired
  IF v_record.window_start IS NULL OR v_record.window_start < v_window_start THEN
    UPDATE rate_limits
    SET attempt_count = 1,
        window_start = NOW(),
        blocked_until = NULL
    WHERE identifier = p_identifier AND action = p_action;
    RETURN TRUE;
  END IF;
  
  -- Increment counter
  IF v_record.attempt_count >= p_max_attempts THEN
    UPDATE rate_limits
    SET blocked_until = NOW() + (p_window_minutes || ' minutes')::INTERVAL
    WHERE identifier = p_identifier AND action = p_action;
    RETURN FALSE;
  ELSE
    UPDATE rate_limits
    SET attempt_count = attempt_count + 1
    WHERE identifier = p_identifier AND action = p_action;
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE encrypted_user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE secure_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_2fa ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE csrf_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_security_settings ENABLE ROW LEVEL SECURITY;

-- Policies for encrypted_user_data
CREATE POLICY "Users can view their own encrypted data"
  ON encrypted_user_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own encrypted data"
  ON encrypted_user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own encrypted data"
  ON encrypted_user_data FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own encrypted data"
  ON encrypted_user_data FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for audit_logs (read-only for users)
CREATE POLICY "Users can view their own audit logs"
  ON audit_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Policies for secure_sessions
CREATE POLICY "Users can view their own sessions"
  ON secure_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON secure_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for user_2fa
CREATE POLICY "Users can view their own 2FA settings"
  ON user_2fa FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own 2FA settings"
  ON user_2fa FOR ALL
  USING (auth.uid() = user_id);

-- Policies for API keys
CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own API keys"
  ON api_keys FOR ALL
  USING (auth.uid() = user_id);

-- Policies for CSRF tokens
CREATE POLICY "Users can view their own CSRF tokens"
  ON csrf_tokens FOR SELECT
  USING (auth.uid() = user_id);

-- Policies for user_security_settings
CREATE POLICY "Users can view their own security settings"
  ON user_security_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own security settings"
  ON user_security_settings FOR ALL
  USING (auth.uid() = user_id);

-- Create a scheduled job to clean up expired data (if pg_cron is available)
-- This would need to be run manually or via a cron job if pg_cron is not available
COMMENT ON FUNCTION cleanup_expired_sessions() IS 'Run this periodically to clean up expired sessions and tokens';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

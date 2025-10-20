-- Create prelander_deployments table for tracking all prelander downloads and hosting
CREATE TABLE IF NOT EXISTS prelander_deployments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  
  -- Deployment info
  email VARCHAR(255) NOT NULL,
  affiliate_code VARCHAR(50),
  package_type VARCHAR(20) NOT NULL CHECK (package_type IN ('quick', 'standard', 'secure', 'aws_hosted')),
  
  -- AWS hosting specific
  hosted_url TEXT,
  s3_key TEXT,
  domain_lock VARCHAR(255),
  
  -- Tracking
  downloads_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT unique_user_site_deployment UNIQUE (user_id, site_id, package_type)
);

-- Create indexes for better query performance
CREATE INDEX idx_prelander_deployments_user_id ON prelander_deployments(user_id);
CREATE INDEX idx_prelander_deployments_site_id ON prelander_deployments(site_id);
CREATE INDEX idx_prelander_deployments_package_type ON prelander_deployments(package_type);
CREATE INDEX idx_prelander_deployments_created_at ON prelander_deployments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE prelander_deployments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own deployments
CREATE POLICY "Users can view own deployments" 
  ON prelander_deployments 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can create their own deployments
CREATE POLICY "Users can create own deployments" 
  ON prelander_deployments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own deployments
CREATE POLICY "Users can update own deployments" 
  ON prelander_deployments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own deployments
CREATE POLICY "Users can delete own deployments" 
  ON prelander_deployments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_prelander_deployments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_prelander_deployments_timestamp
  BEFORE UPDATE ON prelander_deployments
  FOR EACH ROW
  EXECUTE FUNCTION update_prelander_deployments_updated_at();

-- Add comment for documentation
COMMENT ON TABLE prelander_deployments IS 'Tracks all prelander downloads and AWS hosting deployments';
COMMENT ON COLUMN prelander_deployments.package_type IS 'Type of package: quick (simple protected), standard (password protected), secure (military grade), aws_hosted (hosted on S3)';
COMMENT ON COLUMN prelander_deployments.s3_key IS 'S3 object key for AWS hosted prelanders';
COMMENT ON COLUMN prelander_deployments.domain_lock IS 'Optional domain restriction for the prelander';

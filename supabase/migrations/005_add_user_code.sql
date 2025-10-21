-- Add unique code field to organizations table
ALTER TABLE organizations ADD COLUMN user_code VARCHAR(10) UNIQUE;

-- Create function to generate unique user codes
CREATE OR REPLACE FUNCTION generate_user_code()
RETURNS VARCHAR(10) AS $$
DECLARE
    code VARCHAR(10);
    exists BOOLEAN;
BEGIN
    LOOP
        -- Generate 6-character alphanumeric code
        code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM organizations WHERE user_code = code) INTO exists;
        
        -- Exit loop if code is unique
        IF NOT exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate user code on organization creation
CREATE OR REPLACE FUNCTION set_user_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_code IS NULL THEN
        NEW.user_code := generate_user_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_user_code
    BEFORE INSERT ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION set_user_code();

-- Update existing organizations with user codes
UPDATE organizations 
SET user_code = generate_user_code() 
WHERE user_code IS NULL;

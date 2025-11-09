-- Fix role_requests table column name
-- This migration fixes the column name from current_user_role to current_role

-- Add the correct column if it doesn't exist
ALTER TABLE role_requests 
ADD COLUMN IF NOT EXISTS current_role text CHECK (current_role IN ('admin', 'project_manager', 'team_member'));

-- Copy data from old column to new column if old column exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'role_requests' AND column_name = 'current_user_role') THEN
        UPDATE role_requests 
        SET current_role = current_user_role 
        WHERE current_role IS NULL AND current_user_role IS NOT NULL;
    END IF;
END $$;

-- Drop the old column if it exists
ALTER TABLE role_requests 
DROP COLUMN IF EXISTS current_user_role;
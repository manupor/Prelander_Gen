# Setup Popup Fields in Database

## Problem
The editor is trying to save popup fields (`popup_title`, `popup_message`, `popup_prize`) but these columns don't exist in the database yet.

## Solution
Run the SQL script to add these columns to your Supabase database.

## Steps:

### 1. Open Supabase Dashboard
Go to: https://supabase.com/dashboard

### 2. Navigate to SQL Editor
- Select your project
- Click on "SQL Editor" in the left sidebar
- Click "New Query"

### 3. Copy and Paste this SQL:

```sql
-- Add popup fields to sites table
ALTER TABLE sites 
ADD COLUMN IF NOT EXISTS popup_title TEXT DEFAULT 'WINNER!',
ADD COLUMN IF NOT EXISTS popup_message TEXT DEFAULT 'Congratulations! You''ve won!',
ADD COLUMN IF NOT EXISTS popup_prize TEXT DEFAULT '$1,000 + 50 FREE SPINS';

-- Update existing rows to have default values
UPDATE sites 
SET 
  popup_title = COALESCE(popup_title, 'WINNER!'),
  popup_message = COALESCE(popup_message, 'Congratulations! You''ve won!'),
  popup_prize = COALESCE(popup_prize, '$1,000 + 50 FREE SPINS')
WHERE popup_title IS NULL OR popup_message IS NULL OR popup_prize IS NULL;
```

### 4. Run the Query
Click the "Run" button (or press Cmd/Ctrl + Enter)

### 5. Verify
You should see a success message. The columns are now added!

### 6. Test
Go back to your editor and try saving changes again. It should work now! ✅

## What This Does:
- Adds 3 new columns to the `sites` table
- Sets default values for existing sites
- Allows the editor to save popup customizations

## Alternative: Use the SQL file
You can also run the `add-popup-fields.sql` file directly in Supabase SQL Editor.

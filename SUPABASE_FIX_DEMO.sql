-- ============================================
-- FIX: Allow demo sites creation without auth
-- ============================================
-- Run this in Supabase SQL Editor to fix demo mode
-- ============================================

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow public insert for demo sites" ON sites;
DROP POLICY IF EXISTS "Users can create their own sites" ON sites;

-- Allow anyone to create demo sites (without authentication)
CREATE POLICY "Allow public insert for demo sites" ON sites
  FOR INSERT
  WITH CHECK (is_demo = true);

-- Allow authenticated users to create their own sites
CREATE POLICY "Users can create their own sites" ON sites
  FOR INSERT
  WITH CHECK (
    (auth.uid() = user_id AND is_demo = false) OR
    (is_demo = true)
  );

-- ============================================
-- ✅ DONE! Now demo sites can be created without login
-- ============================================

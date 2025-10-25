# Quick Fix Guide - Pirate Slots Download Error

## ⚡ Immediate Fix (5 minutes)

### Step 1: Update Database Constraint
Run this SQL in your Supabase SQL Editor:

```sql
-- Drop old constraint
ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;

-- Add new constraint with all templates
ALTER TABLE sites ADD CONSTRAINT sites_template_id_check 
CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7', 't9', 't10', 't11', 't12', 't13'));
```

### Step 2: Verify CastleSlot Folder Exists
Check that this folder exists:
```bash
ls -la public/CastleSlot/
```

If it doesn't exist, copy it:
```bash
cp -r public/fisherman-slot public/CastleSlot
```

### Step 3: Restart Your Dev Server
```bash
npm run dev
```

## ✅ Test the Fix

### Test 1: Fisherman Slot (t9)
1. Go to a site using template t9
2. Click download button
3. Select "⚡ DESCARGA RÁPIDA"
4. Verify ZIP downloads without errors
5. Extract ZIP and check for `game/` folder
6. Open `index.html` - game should load

### Test 2: Castle Slot (t10)
1. Go to a site using template t10
2. Click download button
3. Select "⚡ DESCARGA RÁPIDA"
4. Verify ZIP downloads without errors
5. Extract ZIP and check for `game/` folder
6. Open `index.html` - game should load

## 🔍 Troubleshooting

### Error: "Invalid character"
**Cause**: Obfuscator or ZIP generation issue  
**Check**: Server logs for detailed error  
**Fix**: Already implemented - safer obfuscation settings

### Error: "Download failed"
**Cause**: Missing game folder  
**Check**: `public/CastleSlot/` and `public/FisherMan Slot/` exist  
**Fix**: Copy folders as shown in Step 2

### Error: "Game not loading"
**Cause**: iframe path incorrect  
**Check**: View page source, look for iframe src  
**Should be**: `<iframe src="game/index.html">`  
**Fix**: Already implemented - automatic path replacement

### Error: "Template constraint violation"
**Cause**: Database not updated  
**Check**: Run SQL from Step 1  
**Verify**: `SELECT * FROM pg_constraint WHERE conname = 'sites_template_id_check';`

## 📊 Verify Everything Works

Run these checks:

```bash
# 1. Check game folders exist
ls -la public/ | grep -i slot

# Should show:
# FisherMan Slot
# CastleSlot  
# Pirates Slot (assets only)
# fisherman-slot

# 2. Check CastleSlot has index.html
ls public/CastleSlot/index.html

# 3. Check server logs when downloading
# Look for these messages:
# [DOWNLOAD] Looking for game folder: /path/to/public/CastleSlot
# [DOWNLOAD] Game folder found, reading files...
# [DOWNLOAD] Added: game/index.html
# [DOWNLOAD] Successfully included game files from CastleSlot
# [DOWNLOAD] Generating ZIP file...
# [DOWNLOAD] ZIP generated successfully (XXXXX bytes)
```

## 🎯 Expected Results

### Download Structure
```
download.zip
├── index.html          (with protections)
├── style.css           (protected styles)
├── README.md           (instructions)
├── SECURITY.txt        (security info)
└── game/               (only for t9, t10)
    ├── index.html      (game entry point)
    ├── style.css       (game styles)
    ├── scripts/        (game logic)
    └── [all game assets]
```

### Browser Console (should be clean)
- ✅ No "Failed to load" errors
- ✅ No "404" errors
- ✅ Game iframe loads successfully
- ⚠️ May show protection warnings (expected)

## 🚀 Deploy to Production

Once tested locally:

1. **Commit changes**:
```bash
git add .
git commit -m "fix: resolve download errors for game templates t9/t10"
```

2. **Push to repository**:
```bash
git push origin main
```

3. **Deploy** (Vercel auto-deploys from main)

4. **Run database migration** in production Supabase

5. **Test production** with real downloads

## ⏱️ Timeline

- Database update: 1 minute
- Folder verification: 2 minutes
- Testing: 5-10 minutes
- **Total: ~15 minutes**

## 🆘 Still Having Issues?

Check the detailed summary:
```bash
cat DOWNLOAD_FIX_SUMMARY.md
```

Or review the code changes:
```bash
git diff src/app/api/download-simple-protected/route.ts
```

---

**Status**: ✅ All fixes implemented  
**Testing**: Ready to test  
**Deployment**: Ready after testing

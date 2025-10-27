# 🚀 Deployment Guide - Fortune Wheel Prelander

## 📦 What You Have

A complete, ready-to-deploy Fortune Wheel game optimized for affiliate marketing with:
- ✅ 4 themes (Underwater, China, Christmas, Pirates)
- ✅ 8-sector wheels
- ✅ 3-spin counter system
- ✅ Winner pop-up with CTA
- ✅ Configurable external URL
- ✅ Mobile responsive
- ✅ Zero external dependencies

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - FREE)

**Step 1:** Install Netlify CLI (one-time)
```bash
npm install -g netlify-cli
```

**Step 2:** Deploy from terminal
```bash
cd "/Users/manu/Downloads/Wheel Olavivo/game"
netlify deploy --prod
```

**Step 3:** Follow prompts:
- Authorize with Netlify account
- Create new site or select existing
- Publish directory: `.` (current directory)

**Your game will be live at**: `https://your-site-name.netlify.app`

**🔧 Configure URL:**
```
https://your-site-name.netlify.app/game.html?theme=underwater&url=YOUR_AFFILIATE_URL
```

---

### Option 2: Drag & Drop Deployment (Easiest)

1. **Zip the entire `game` folder**
2. **Go to one of these platforms:**
   - [Netlify Drop](https://app.netlify.com/drop) (FREE)
   - [Vercel](https://vercel.com) (FREE)
   - [Surge.sh](https://surge.sh) (FREE)
3. **Drag and drop the folder**
4. **Get instant URL!**

---

### Option 3: GitHub Pages (FREE)

**Step 1:** Create GitHub repository
```bash
cd "/Users/manu/Downloads/Wheel Olavivo/game"
git init
git add .
git commit -m "Initial commit - Fortune Wheel Game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fortune-wheel.git
git push -u origin main
```

**Step 2:** Enable GitHub Pages
1. Go to repository Settings
2. Pages section
3. Source: `main` branch, `/root` folder
4. Save

**Your game will be at**: `https://YOUR_USERNAME.github.io/fortune-wheel/index_main.html`

---

### Option 4: Traditional Web Hosting (cPanel, FTP)

1. **Connect via FTP** to your web hosting
2. **Upload entire `game` folder** to `public_html/wheel/`
3. **Access at**: `https://yourdomain.com/wheel/index_main.html`

---

## 🎯 Integration with Affiliate Platform

### Scenario 1: Direct Landing Page

Use as standalone prelander:
```
Traffic Source → Your Game URL → Offer URL
```

**Example:**
```
https://your-game.netlify.app/game.html?theme=christmas&url=https://offers.com/claim?aff=12345
```

### Scenario 2: Multiple Variations

Create different URLs for A/B testing:
```
Variation A: ?theme=underwater&url=https://track.com/v1
Variation B: ?theme=china&url=https://track.com/v2
Variation C: ?theme=christmas&url=https://track.com/v3
Variation D: ?theme=pirates&url=https://track.com/v4
```

### Scenario 3: Tracking Tokens

Most platforms support URL parameters:

**Voluum:**
```
?url=https://offer.com/click/{clickid}&s1={campaignid}
```

**BeMob:**
```
?url=https://track.bemob.com/click/CAMPAIGN_ID?cid={click_id}
```

**ClickFlare:**
```
?url=https://tracking.com/?cid={click_id}&campaignid={campaign_id}
```

### Scenario 4: Template Editor Integration

If your platform has a template editor:

1. **Upload all files** to platform
2. **In template editor**, find the config section in `game.html`:
   ```javascript
   window.GAME_CONFIG = {
       theme: '{{THEME}}',                    // Platform variable
       externalUrl: '{{TRACKING_URL}}',       // Platform variable
       spinCount: 0,
       maxSpins: 3
   };
   ```
3. **Platform replaces** `{{TRACKING_URL}}` with actual offer URL

---

## 🔗 URL Structure Examples

### Basic Usage
```
https://your-domain.com/game.html?theme=underwater&url=https://offer.com
```

### With Subdomains (Better for compliance)
```
https://play.your-domain.com/game.html?theme=china&url=https://offer.com
```

### With Path-based Themes
```
https://your-domain.com/underwater/?url=https://offer.com
https://your-domain.com/china/?url=https://offer.com
https://your-domain.com/christmas/?url=https://offer.com
https://your-domain.com/pirates/?url=https://offer.com
```

### With Tracking Parameters
```
https://game.com/game.html?theme=underwater&url=https://offer.com/track?
  &source=facebook
  &campaign=holiday2025
  &ad_id=12345
  &click_id={clickid}
```

---

## ⚙️ Pre-Deployment Configuration

### 1. Set Default Theme (Optional)

Edit `game.html` line 35:
```javascript
const selectedTheme = urlParams.get('theme') || 'pirates';  // Change default here (underwater, china, christmas, pirates)
```

### 2. Set Fallback URL

Edit `game.html` line 36:
```javascript
const externalUrl = urlParams.get('url') || 'https://YOUR-FALLBACK-URL.com';
```

### 3. Change Spin Count

Edit `game.html` line 41:
```javascript
maxSpins: 3  // Change to 1, 2, 4, 5, etc.
```

### 4. Customize Landing Page

Edit `index_main.html`:
- Line 35: Change title "🎰 Fortune Wheel"
- Line 36: Change subtitle text
- Lines 39-51: Modify theme cards (add/remove themes)

---

## 🧪 Testing URLs

Before going live, test these scenarios:

```bash
# Test 1: Default theme
http://localhost:8000/game.html

# Test 2: Specific theme
http://localhost:8000/game.html?theme=china

# Test 3: With custom URL
http://localhost:8000/game.html?theme=christmas&url=https://google.com

# Test 4: Pirates theme with background
http://localhost:8000/game.html?theme=pirates&url=https://google.com

# Test 4: Landing page
http://localhost:8000/index_main.html

# Test 5: Mobile (Chrome DevTools → Device Mode)
```

---

## 📊 Traffic Flow Setup

### Complete Setup Example:

1. **Deploy to Netlify**: `https://fortune-wheel.netlify.app`

2. **Create Campaign URLs**:
   ```
   Facebook Ads → https://fortune-wheel.netlify.app/game.html?theme=underwater&url=https://tracking.com/fb
   Google Ads → https://fortune-wheel.netlify.app/game.html?theme=china&url=https://tracking.com/google
   Native Ads → https://fortune-wheel.netlify.app/game.html?theme=christmas&url=https://tracking.com/native
   TikTok Ads → https://fortune-wheel.netlify.app/game.html?theme=pirates&url=https://tracking.com/tiktok
   ```

3. **Tracking platform** receives click from game

4. **User redirects** to actual offer

---

## 🔒 Important Notes

### For Compliance:
- Ensure you have rights to use the game
- Add privacy policy if collecting data
- Follow advertising platform guidelines
- Don't make false prize claims

### For Performance:
- Enable CDN (Netlify/Vercel includes this)
- Compress images if needed (already optimized)
- Monitor loading times (should be < 3 seconds)

### For Conversion:
- Test different themes per traffic source
- Monitor spin 1 vs spin 3 completion rate
- A/B test CTA button text
- Track modal appearance vs clicks

---

## 🆘 Quick Troubleshooting

**Issue**: Game doesn't load after deployment
- Check browser console for errors
- Ensure all files uploaded (especially theme folders)
- Verify paths are correct (relative, not absolute)

**Issue**: CTA button goes to wrong URL
- Check URL parameter: `?url=YOUR_URL`
- URL must be properly encoded if it contains special characters
- Use `encodeURIComponent()` for complex URLs

**Issue**: Theme doesn't load
- Verify theme name is correct: underwater, china, christmas, or pirates
- Check that theme folder exists with all PNG files
- Console will show 404 errors if files missing

---

## ✅ Pre-Launch Checklist

- [ ] Test all 4 themes work correctly (underwater, china, christmas, pirates)
- [ ] Spin counter counts to 3
- [ ] Modal appears on 3rd spin
- [ ] CTA button redirects correctly
- [ ] Mobile responsive (test on real device)
- [ ] No console errors
- [ ] Fast loading time (< 3 seconds)
- [ ] Sounds work (might need user interaction first)
- [ ] Tracking URLs work correctly
- [ ] Have backup/fallback URL set

---

## 📈 Next Steps After Deployment

1. **Set up tracking** with your affiliate platform
2. **Create multiple theme variations** for A/B testing
3. **Monitor conversion rates** by theme
4. **Test different traffic sources**
5. **Optimize based on data**

---

## 🎓 Advanced: CDN Setup

For high traffic, use a CDN:

1. **Deploy to Netlify/Vercel** (includes CDN)
2. **Or use Cloudflare**:
   - Add your domain to Cloudflare
   - Enable CDN
   - Set caching rules for /png/, /js/, /audio/

3. **Or use AWS CloudFront**:
   - Upload to S3 bucket
   - Create CloudFront distribution
   - Point domain to distribution

---

## 📞 Support Resources

- Check `README.md` for configuration
- Review `/documentation/documentation.pdf` for original game docs
- Use browser DevTools console for debugging
- Test locally first: `python3 -m http.server 8000`

---

**Status**: ✅ Ready for Production Deployment  
**Time to Deploy**: < 5 minutes  
**Cost**: FREE (using Netlify/Vercel/GitHub Pages)

Good luck with your affiliate campaigns! 🚀

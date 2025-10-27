# 🎰 Fortune Wheel - Affiliate Marketing Prelander

## 📋 Overview

This is a customized Fortune Wheel game optimized for affiliate marketing prelanders. The game includes:
- **4 themes**: Underwater, China, Christmas, Pirates
- **8 sectors** per wheel
- **Spin counter** system (3 spins maximum)
- **Winner pop-up modal** with CTA button that appears on the 3rd spin
- **Configurable external URL** for conversion tracking

## 🚀 Quick Start

### Local Testing

1. Open terminal in the `game` folder
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open browser: `http://localhost:8000/index_main.html`

### Files Structure

```
game/
├── index_main.html       ← Main landing page (theme selector)
├── game.html             ← Game page with wheel
├── index.html            ← Original file (backup)
├── js/
│   ├── phaser.js         ← Game engine
│   ├── wheelGame.js      ← Main game logic (modified)
│   └── animCoins.js      ← Coin animations
├── audio/                ← Sound effects
├── fonts/                ← Bitmap fonts
├── underwater/           ← Theme assets
│   ├── js/wheel_config_8.js
│   └── png/
├── china/                ← Theme assets
│   ├── js/wheel_config_8.js
│   └── png/
├── christmas/            ← Theme assets
│   ├── js/wheel_config_8.js
│   └── png/
└── pirates/              ← Theme assets (with background)
    ├── js/wheel_config_8.js
    └── png/background pirates.jpg
```

## 🎨 User Flow

1. **Landing Page** (`index_main.html`)
   - User navigates through 4 themes using carousel (← → arrows)
   - Themes: Underwater, China, Christmas, Pirates
   - Can also click on theme cards or indicator dots
   - Swipe support on mobile devices
   - Keyboard navigation (arrow keys)
   - Clicks "Start Game"

2. **Game Page** (`game.html`)
   - Shows selected theme wheel with 8 sectors
   - User spins the wheel (max 3 times)
   - Counter displays: "Spins: X/3"

3. **Winner Pop-up** (after 3rd spin)
   - Animated modal appears with confetti
   - Shows prize amount
   - "CLAIM BONUS" button
   - Redirects to external URL

## ⚙️ Configuration

### Method 1: URL Parameters (Recommended for Template Editors)

Pass configuration via URL parameters:

```
game.html?theme=underwater&url=https://your-offer-url.com
```

**Parameters:**
- `theme`: underwater | china | christmas | pirates (default: underwater)
- `url`: Your affiliate offer URL (default: https://example.com/claim-bonus)

### Method 2: Edit game.html

Edit the configuration section in `game.html`:

```javascript
// Line ~35 in game.html
window.GAME_CONFIG = {
    theme: 'underwater',                              // Change theme here
    externalUrl: 'https://your-affiliate-url.com',   // Change URL here
    spinCount: 0,
    maxSpins: 3
};
```

### Method 3: Dynamic Template Variable

For platforms with template editors (like Voluum, ClickFunnels, etc.):

Replace the URL with your tracking token:

```javascript
externalUrl: '{{TRACKING_URL}}',  // Platform replaces this with actual URL
```

Or in the HTML meta:

```html
<script>
    window.AFFILIATE_URL = '{{TRACKING_URL}}';
</script>
```

Then reference it:
```javascript
externalUrl: window.AFFILIATE_URL || 'https://fallback-url.com',
```

## 🎯 Integration Examples

### Example 1: Direct Link
```
https://your-domain.com/game.html?theme=christmas&url=https://offer.com/claim?aff=123
```

### Example 2: With Tracking Tokens
```
https://your-domain.com/game.html?theme=underwater&url=https://track.com/click?cid={{CLICK_ID}}
```

### Example 3: Multiple Themes on Same Domain
```
/underwater.html  → game.html?theme=underwater&url=...
/china.html       → game.html?theme=china&url=...
/christmas.html   → game.html?theme=christmas&url=...
```

## 🔧 Customization Options

### Change Number of Spins

Edit `game.html` line ~41:
```javascript
maxSpins: 3  // Change to 1, 2, 4, etc.
```

### Change Prize Values

Edit each theme's config file:
- `underwater/js/wheel_config_8.js`
- `china/js/wheel_config_8.js`
- `christmas/js/wheel_config_8.js`
- `pirates/js/wheel_config_8.js`

```javascript
sectors: [
    { win: 100, text: '$100', isBigWin: false },
    { win: 200, text: '$200', isBigWin: false },
    // ... modify as needed
]
```

### Modify Pop-up Text

Edit `game.html` around line ~82:
```html
<h2>WINNER!</h2>                           <!-- Change text -->
<p id="prizeAmount">You won $800!</p>      <!-- Dynamic prize -->
<button class="cta-button">CLAIM BONUS</button>  <!-- CTA text -->
```

### Change Colors/Styling

Edit CSS in `game.html` (lines 25-170) or `index_main.html` (lines 7-124)

## 📊 Conversion Optimization Features

✅ **Engagement**: Interactive game keeps users engaged  
✅ **Forced Interaction**: Must spin 3 times to see CTA  
✅ **Winner Psychology**: "WINNER!" modal increases click-through  
✅ **Visual Effects**: Confetti, animations, sounds enhance excitement  
✅ **Mobile Responsive**: Works on all devices  
✅ **No Close Button**: Modal can't be closed easily (conversion optimization)  
✅ **Carousel Navigation**: Easy theme selection with arrows, perfect for template editors  
✅ **Touch/Swipe Support**: Optimized for mobile user experience  
✅ **Keyboard Navigation**: Arrow keys for desktop users

## 🌐 Deployment

### Option 1: Static Hosting
Upload entire `game/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any web hosting

### Option 2: CDN
Host assets on CDN and embed game page in iframe:
```html
<iframe src="https://cdn.your-domain.com/game/game.html?theme=underwater&url=https://offer.com" 
        width="100%" height="100%" frameborder="0"></iframe>
```

### Option 3: Landing Page Builder
Use the game as a prelander in:
- ClickFunnels
- Unbounce
- Leadpages
- Custom landing page platform

## 🔍 Testing Checklist

- [ ] Theme selection works on index_main.html
- [ ] Each theme loads correctly (underwater, china, christmas, pirates)
- [ ] Spin counter increments: 1/3, 2/3, 3/3
- [ ] Winner modal appears after 3rd spin
- [ ] Prize amount displays correctly in modal
- [ ] CLAIM BONUS button redirects to correct URL
- [ ] Mobile responsive (test on phone/tablet)
- [ ] All sounds play correctly
- [ ] No console errors in browser

## 🐛 Troubleshooting

**Issue**: Modal doesn't appear after 3rd spin  
**Fix**: Check browser console for errors, ensure `window.showWinnerModal` is defined

**Issue**: Wrong URL redirect  
**Fix**: Verify URL parameter or GAME_CONFIG.externalUrl value

**Issue**: Theme doesn't load  
**Fix**: Ensure PNG files exist in `{theme}/png/` folder

**Issue**: Sounds don't play  
**Fix**: Check browser console, some browsers block autoplay. User interaction (spin) should enable sound.

## 📱 Mobile Optimization

The game automatically scales to fit mobile screens. Tested on:
- iOS Safari
- Android Chrome
- Mobile Firefox
- Tablet devices

## 🎓 Advanced: A/B Testing

Test different variations:
1. **Spin counts**: 1 vs 3 vs 5 spins
2. **Themes**: Which converts best?
3. **CTA text**: "CLAIM BONUS" vs "GET PRIZE" vs "CLAIM NOW"
4. **Prize values**: Higher values vs realistic values
5. **Pop-up timing**: Immediate vs 2-second delay

Track with URL parameters:
```
?theme=underwater&url=https://track.com/v1  ← Version 1
?theme=china&url=https://track.com/v2       ← Version 2
```

## 📝 Notes

- Original game supports 6, 8, 10, 12, 14, 16 sectors (currently using 8)
- 15 total themes available (currently using 4: underwater, china, christmas, pirates)
- Pirates theme includes custom background image
- All assets are self-contained (no external dependencies)
- Uses Phaser 3 game engine (included)
- Cross-browser compatible (Chrome, Firefox, Safari, Edge)

## 🆘 Support

For questions or customization requests, refer to:
- `/documentation/documentation.pdf` (original documentation)
- Browser DevTools console for debugging
- Check this README for configuration options

---

**Ready for Production** ✅  
Last Updated: 2025  
Version: 1.0 - Affiliate Marketing Edition

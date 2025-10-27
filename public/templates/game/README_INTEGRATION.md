# 🎰 Wheel Game - Integration Guide

## 📋 Project Overview

This is a Fortune Wheel game with 4 themed templates ready for prelander integration.

## 🎨 Available Themes

1. **🌊 Underwater** - Blue ocean theme with animated bubbles
2. **🏮 China** - Traditional Chinese theme with red/gold colors
3. **🎄 Christmas** - Festive holiday theme
4. **🏴‍☠️ Pirates** - Pirate treasure theme with golden glow effect

## 📁 Project Structure

```
game/
├── index_selector.html          # Theme selector carousel (use this as entry point)
├── game.html                    # Main game page
├── js/
│   └── wheelGame.js            # Phaser game engine configuration
├── underwater/
│   ├── js/
│   │   └── wheel_config_8.js   # 8-sector wheel configuration
│   └── png/
│       ├── underwater_background.jpg
│       ├── Wheel_8.png
│       └── [other assets]
├── china/
│   ├── js/
│   │   └── wheel_config_8.js
│   └── png/
│       ├── china.jpg
│       └── [other assets]
├── christmas/
│   ├── js/
│   │   └── wheel_config_8.js
│   └── png/
│       ├── xmas_back.png
│       └── [other assets]
└── pirates/
    ├── js/
    │   └── wheel_config_8.js to wheel_config_16.js
    └── png/
        └── [pirate assets]
```

## 🚀 Usage

### Option 1: Theme Selector (Recommended)
```html
<iframe src="path/to/game/index_selector.html" width="100%" height="100%"></iframe>
```

### Option 2: Direct Theme Link
```html
<!-- Underwater -->
<iframe src="path/to/game/game.html?theme=underwater" width="100%" height="100%"></iframe>

<!-- China -->
<iframe src="path/to/game/game.html?theme=china" width="100%" height="100%"></iframe>

<!-- Christmas -->
<iframe src="path/to/game/game.html?theme=christmas" width="100%" height="100%"></iframe>

<!-- Pirates -->
<iframe src="path/to/game/game.html?theme=pirates" width="100%" height="100%"></iframe>
```

## ⚙️ URL Parameters

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `theme` | Theme name (underwater, china, christmas, pirates) | Yes | - |
| `preview` | Preview mode (true/false) | No | false |
| `externalUrl` | Redirect URL after spin | No | - |
| `maxSpins` | Maximum number of spins allowed | No | 999 |

### Example with all parameters:
```
game.html?theme=underwater&externalUrl=https://example.com/claim-bonus&maxSpins=3
```

## 🎯 Features by Theme

### Underwater 🌊
- Full-screen background image (1920x1060)
- Animated CSS bubbles floating
- Transparent canvas
- White text on purple wheel

### China 🏮
- Full-screen background image (1920x1229)
- Transparent canvas
- White text on wheel

### Christmas 🎄
- Full-screen background image (1920x1080)
- Transparent canvas
- White text on red/green wheel

### Pirates 🏴‍☠️
- Golden glow effect on wheel
- Multiple wheel configurations (6, 8, 10, 12, 14, 16 sectors)
- Treasure theme

## 🛠️ Technical Details

### Dependencies
- **Phaser v3.55.2** (included via CDN in game.html)
- Modern browser with WebGL support

### Canvas Configuration
- Width: 1920px
- Height: 1080px
- Responsive scaling (RESIZE mode)

### Background Images
All backgrounds are positioned at:
- Display size: 2400x1400 (ensures full coverage)
- Depth: -100 (behind all game elements)
- Position: centered

### Performance
- Background images optimized for web (max 1920x1229)
- Transparent canvas for themes with backgrounds
- Lazy loading for non-active theme iframes

## 📦 Integration Steps

1. **Upload entire `game/` folder** to your server
2. **Test locally** with: `python3 -m http.server 8080`
3. **Access selector**: `http://localhost:8080/index_selector.html`
4. **Integrate in prelander** using iframe or direct link

## 🔧 Customization

### Change Prize Values
Edit the `sectors` array in each theme's `wheel_config_8.js`:

```javascript
sectors: [
    { win: 100, text: '$100', isBigWin: false },
    { win: 200, text: '$200', isBigWin: false },
    // ... add more sectors
]
```

### Change External URL
Pass via URL parameter:
```
game.html?theme=underwater&externalUrl=https://your-landing-page.com
```

### Adjust Spin Limits
```
game.html?theme=underwater&maxSpins=5
```

## 🎨 Selector Carousel Features

- ✅ Left/Right navigation arrows
- ✅ Direct card click to select
- ✅ Indicator dots with click support
- ✅ Keyboard navigation (Arrow keys)
- ✅ Swipe support (mobile)
- ✅ Full-screen game preview
- ✅ Smooth animations

## ⚠️ Important Notes

1. **CORS**: Ensure proper CORS headers if hosting assets separately
2. **HTTPS**: Use HTTPS in production for audio/video autoplay
3. **Image Size**: Keep background images under 2MB for performance
4. **WebGL**: Requires WebGL-capable browser (most modern browsers)

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- Desktop: Full 1920x1080 canvas
- Tablet: Scaled proportionally
- Mobile: Scaled with maintain aspect ratio

## 🐛 Troubleshooting

### Background not showing
- Check browser console for texture errors
- Verify image path and file name
- Ensure image is not too large (max ~2000x2000)
- Clear browser cache (Cmd+Shift+R)

### Numbers not visible
- Check depth values in wheel_config
- Verify font files are loaded
- Check console for bitmap font errors

### Canvas black background
- Verify theme name matches exactly (lowercase)
- Check transparent setting in wheelGame.js
- Ensure body class is applied (check DevTools)

## 📞 Support

For issues or questions, check:
1. Browser console for errors
2. Network tab for failed asset loads
3. Ensure all files are uploaded correctly

## ✅ Checklist for Production

- [ ] All images optimized (<2MB each)
- [ ] Test all 4 themes
- [ ] Verify external URL redirects work
- [ ] Test on mobile devices
- [ ] Check HTTPS compatibility
- [ ] Test max spins limit
- [ ] Verify preview mode works

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Engine**: Phaser 3.55.2

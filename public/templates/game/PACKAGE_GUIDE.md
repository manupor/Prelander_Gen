# 📦 Wheel Game - Packaging Guide for Prelanders

## 🎯 Quick Start for Integration

This game is ready to be integrated into your prelander template editor system.

## 📋 Essential Files for Production

### Core Files (Required)
```
game/
├── index_selector.html          ⭐ Main entry point
├── game.html                     ⭐ Game page
├── js/
│   ├── wheelGame.js             ⭐ Game engine
│   ├── phaser.js                ⭐ Phaser framework
│   └── animCoins.js             ⭐ Coin animations
└── fonts/
    ├── roboto_72_1.png          ⭐ Bitmap font
    └── roboto_72_1.xml          ⭐ Font config
```

### Theme-Specific Files

#### 🌊 Underwater Theme
```
underwater/
├── js/wheel_config_8.js         ⭐ Configuration
└── png/
    ├── underwater_background.jpg ⭐ Background (1920x1060)
    ├── Wheel_8.png
    ├── WheelBorder.png
    ├── SpinButton.png
    ├── SpinButtonHover.png
    ├── Pointer.png
    ├── CenterPin.png
    ├── LightSector_8.png
    └── CoinSheet.png
```

#### 🏮 China Theme
```
china/
├── js/wheel_config_8.js         ⭐ Configuration
└── png/
    ├── china.jpg                 ⭐ Background (1920x1229)
    ├── Wheel_8.png
    ├── WheelBorder.png
    ├── SpinButton.png
    ├── SpinButtonHover.png
    ├── Pointer.png
    └── [same assets as underwater]
```

#### 🎄 Christmas Theme
```
christmas/
├── js/wheel_config_8.js         ⭐ Configuration
└── png/
    ├── xmas_back.png             ⭐ Background (1920x1080)
    ├── Wheel_8.png
    ├── WheelBorder.png
    ├── SpinButton.png
    ├── SpinButtonHover.png
    ├── Pointer.png
    ├── CenterPin.png
    ├── PointerBorder.png
    ├── Lamp.png
    ├── LampOn.png
    └── [other assets]
```

#### 🏴‍☠️ Pirates Theme
```
pirates/
├── js/
│   ├── wheel_config_6.js
│   ├── wheel_config_8.js        ⭐ Main config
│   ├── wheel_config_10.js
│   ├── wheel_config_12.js
│   ├── wheel_config_14.js
│   └── wheel_config_16.js
└── png/
    ├── Wheel_8.png (and 6, 10, 12, 14, 16)
    ├── WheelBorder.png
    ├── SpinButton.png
    └── [other pirate assets]
```

## 🚀 Deployment Methods

### Method 1: Static Hosting (Recommended)
Upload entire `/game` folder to your CDN or static hosting:

```bash
# Example structure on server
https://your-cdn.com/games/wheel/
├── index_selector.html
├── game.html
├── js/
├── underwater/
├── china/
├── christmas/
└── pirates/
```

### Method 2: Embed in Template Editor
Use as an iframe component:

```html
<!-- In your prelander template -->
<div class="wheel-game-container">
    <iframe 
        src="https://your-cdn.com/games/wheel/index_selector.html"
        width="100%" 
        height="800px"
        frameborder="0"
        allowfullscreen>
    </iframe>
</div>
```

### Method 3: Direct Theme Integration
Link directly to specific theme:

```html
<iframe src="https://your-cdn.com/games/wheel/game.html?theme=underwater&externalUrl={{LANDING_URL}}&maxSpins=3"></iframe>
```

## 🔧 Template Variables for Editor

### Configurable Parameters
Make these editable in your template editor:

```javascript
const gameConfig = {
    theme: 'underwater',           // dropdown: underwater, china, christmas, pirates
    externalUrl: '{{LANDING_URL}}', // text input: redirect URL
    maxSpins: 3,                   // number input: 1-999
    preview: false                 // boolean: preview mode
};

// Build URL
const gameUrl = `game.html?theme=${gameConfig.theme}&externalUrl=${gameConfig.externalUrl}&maxSpins=${gameConfig.maxSpins}`;
```

## 📊 Size & Performance

### Total Package Size
- **Minimal (1 theme)**: ~500KB
- **All 4 themes**: ~2.5MB
- **With all themes (15 total)**: ~15MB

### Optimized Background Images
- ✅ Underwater: 248KB (1920x1060)
- ✅ China: ~200KB (1920x1229)
- ✅ Christmas: 163KB (1920x1080) - optimized from 10MB!
- ✅ Pirates: Not using background yet

### Load Time
- Initial load: ~1-2s (with CDN)
- Theme switch: Instant (preloaded)
- Spin animation: 60 FPS

## 🎨 Customization for Clients

### Easy Customizations (No code)
1. **Change prize values**: Edit `sectors` in wheel_config
2. **Change redirect URL**: Pass via URL parameter
3. **Set spin limit**: Pass via URL parameter
4. **Choose theme**: Pass via URL parameter

### Advanced Customizations (Requires editing)
1. **Add more themes**: Duplicate theme folder, update assets
2. **Change wheel colors**: Edit wheel PNG images
3. **Modify animations**: Edit wheelGame.js
4. **Add sound effects**: Add audio files, update config

## 🔐 Security Considerations

1. **External URL validation**: Sanitize redirect URLs
2. **Spin limit enforcement**: Server-side validation recommended
3. **CORS**: Configure if hosting assets separately
4. **CSP**: Allow Phaser CDN and inline scripts

## 📱 Mobile Optimization

The game is **fully responsive**:
- ✅ Touch controls (swipe, tap)
- ✅ Auto-scaling canvas
- ✅ Optimized for portrait/landscape
- ✅ Fast loading on 4G

## 🧪 Testing Checklist

Before deploying to production:

```bash
# 1. Test locally
cd game/
python3 -m http.server 8080
# Open: http://localhost:8080/index_selector.html

# 2. Test all themes
- [ ] Underwater loads with background
- [ ] China loads with background  
- [ ] Christmas loads with background
- [ ] Pirates loads with golden glow

# 3. Test all features
- [ ] Carousel navigation works
- [ ] Spin mechanism works
- [ ] External URL redirect works
- [ ] Spin limit works
- [ ] Preview mode works

# 4. Test on devices
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome
- [ ] Tablet
```

## 💾 Backup & Version Control

### Recommended Git Structure
```
.gitignore
/game/
  /underwater/
  /china/
  /christmas/
  /pirates/
  index_selector.html
  game.html
  /js/
  README_INTEGRATION.md
  PACKAGE_GUIDE.md
```

### .gitignore
```
# Development
node_modules/
.DS_Store
*.log

# Build
dist/
build/

# IDEs
.vscode/
.idea/
```

## 🌐 CDN Integration

### Using with Popular CDNs

**AWS S3 + CloudFront:**
```bash
aws s3 sync ./game s3://your-bucket/games/wheel/
```

**Netlify:**
```bash
netlify deploy --dir=./game --prod
```

**Vercel:**
```bash
vercel --prod
```

## 📞 Support & Updates

### Common Issues

**Q: Background not showing?**
A: Check console for image load errors. Verify CORS headers.

**Q: Canvas is black?**
A: Ensure theme parameter is lowercase and matches exactly.

**Q: Numbers not visible?**
A: Clear browser cache. Check bitmap font files loaded.

**Q: Spin limit not working?**
A: Implement server-side tracking for security.

### Update Process

1. Test changes locally
2. Backup current version
3. Deploy to staging
4. Test on staging
5. Deploy to production
6. Update version in README

## ✅ Production Deployment Checklist

- [ ] All images optimized (<500KB each)
- [ ] Test all 4 themes in production
- [ ] Verify HTTPS works
- [ ] Test external redirects
- [ ] Check mobile responsiveness
- [ ] Configure CORS if needed
- [ ] Set up CDN caching (1 week for images)
- [ ] Add monitoring/analytics
- [ ] Document custom configurations
- [ ] Train team on usage

---

**Ready for Production**: ✅ Yes  
**Total Setup Time**: ~10 minutes  
**Maintenance**: Minimal (asset updates only)

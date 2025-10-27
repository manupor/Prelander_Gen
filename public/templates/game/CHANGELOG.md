# 📋 Changelog - Fortune Wheel Game

## Version 1.2 - Carousel Navigation (October 26, 2025)

### ✨ New Features
- **🎠 Carousel Theme Selector**: Replaced grid layout with interactive carousel
  - Left/Right arrow buttons for navigation
  - Indicator dots showing current theme
  - Click on any theme card to select
  - Click on indicator dots to jump to theme
  - Keyboard navigation support (arrow keys)
  - Touch/swipe support for mobile devices
  - Smooth animations with elastic easing
  - Auto-center active theme
  - Disabled state for arrows at start/end

### 🎯 Benefits for Template Editors
- **Easier Integration**: Single-view carousel fits better in template editors
- **Better UX**: Focus on one theme at a time
- **Mobile Optimized**: Swipe gestures for touch devices
- **Accessible**: Multiple ways to navigate (arrows, dots, keyboard, touch)

### 🔧 Modified Files
1. `index_main.html` - Complete carousel implementation
   - Updated CSS for carousel layout
   - New carousel structure (arrows, track, indicators)
   - JavaScript for navigation logic
   - Touch/swipe event handlers
   - Keyboard event handlers

### 📱 Navigation Methods
- **Arrow Buttons**: Click ← or → buttons
- **Theme Cards**: Click on visible theme cards
- **Indicator Dots**: Click on dots below carousel
- **Keyboard**: Use ← → arrow keys
- **Touch**: Swipe left/right on mobile
- **Auto-initialize**: Starts on first theme (Underwater)

---

## Version 1.1 - Pirates Theme Added (October 26, 2025)

### ✨ New Features
- **🏴‍☠️ Pirates Theme Added**: New theme with custom background image
  - Background image: `pirates/png/background pirates.jpg`
  - Available in all sector configurations (6, 8, 10, 12, 14, 16)
  - Configured with proper depth layering for background display

### 🔧 Modified Files

#### Theme Configurations (Pirates)
1. `pirates/js/wheel_config_6.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

2. `pirates/js/wheel_config_8.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

3. `pirates/js/wheel_config_10.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

4. `pirates/js/wheel_config_12.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

5. `pirates/js/wheel_config_14.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

6. `pirates/js/wheel_config_16.js`
   - Activated background sprite: `background pirates.jpg`
   - Added background rendering in createWheel function

#### UI Updates
7. `index_main.html`
   - Added Pirates theme card with 🏴‍☠️ emoji
   - Updated theme selection interface

8. `config-tester.html`
   - Added Pirates theme option in dropdown
   - Updated configuration tester

#### Documentation Updates
9. `README.md`
   - Updated theme count: 3 → 4 themes
   - Added Pirates to all theme lists
   - Updated examples and configurations
   - Added note about Pirates background image

10. `DEPLOYMENT.md`
    - Updated theme count: 3 → 4 themes
    - Added Pirates to deployment examples
    - Updated A/B testing scenarios
    - Updated checklist and troubleshooting

11. `CHANGELOG.md` (new)
    - Created this changelog file

### 🎨 Technical Details

**Background Implementation:**
```javascript
// In each wheel_config_X.js file:
sprites: [
    {
        fileName: 'background pirates.jpg',  // Previously: null
        name: 'background',
    },
    // ... other sprites
]

// In createWheel function:
scene.background = addSprite('background', 0, 0, depth-1)?.setScale(1.0);
```

**Z-Index/Depth Layering:**
- Background: `depth - 1` (renders behind everything)
- Wheel elements: `depth` (normal layer)
- Interactive elements: `depth + 1` (front layer)

### 📦 Assets

**New/Updated Assets:**
- `pirates/png/background pirates.jpg` - Background image for pirates theme
- Total file size: ~XXX KB (optimized for web)

### 🎯 Available Themes

Now includes **4 complete themes**:
1. **🌊 Underwater** - Ocean/aquatic theme
2. **🏮 China** - Asian/Chinese theme  
3. **🎄 Christmas** - Holiday/winter theme
4. **🏴‍☠️ Pirates** - Pirate adventure theme (with background image)

### 🔗 Theme URLs

```
?theme=underwater
?theme=china
?theme=christmas
?theme=pirates
```

### ✅ Testing Status

- [x] Pirates theme loads correctly
- [x] Background image displays properly
- [x] All 6 sector configurations work (6, 8, 10, 12, 14, 16)
- [x] Background scales correctly
- [x] Z-index layering is correct (background behind wheel)
- [x] Theme selection UI updated
- [x] Documentation updated
- [x] Config tester updated

### 🚀 Deployment Notes

- No breaking changes
- Backward compatible with existing deployments
- New theme is opt-in via URL parameter
- Existing themes (underwater, china, christmas) unchanged
- Ready for immediate deployment

### 📝 Next Steps for Users

1. **Test Pirates theme locally:**
   ```
   http://localhost:8000/game.html?theme=pirates
   ```

2. **Use in production:**
   ```
   https://your-domain.com/game.html?theme=pirates&url=YOUR_OFFER_URL
   ```

3. **A/B Test pirates vs other themes:**
   - Compare conversion rates
   - Test with different traffic sources
   - Monitor engagement metrics

---

## Version 1.0 - Initial Release (October 26, 2025)

### 🎉 Initial Features

- Fortune wheel game engine (Phaser 3)
- 3 themes: Underwater, China, Christmas
- 8-sector wheels
- Spin counter system (3 spins)
- Winner pop-up modal with CTA
- Configurable external URL
- Mobile responsive design
- Theme selection interface
- Configuration tester tool
- Complete documentation

---

**Legend:**
- ✨ New Features
- 🔧 Modified/Updated
- 🐛 Bug Fixes
- 📝 Documentation
- 🚀 Deployment
- ⚠️ Breaking Changes

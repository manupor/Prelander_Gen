# Castle Slot Game Integration Guide

## 🎰 Overview

The Castle Slot game has been modified to be **deterministic** and **fully editable** for affiliate landing pages. The game triggers a win popup on the **second spin** and can be customized with different balances, logos, and CTA links.

## 🔧 Technical Implementation

### 1. Game Modifications

- **Deterministic Behavior**: Math.random() is overridden with a seeded random function
- **Spin Counter**: Global `spinCount` variable tracks player spins
- **Win Trigger**: Popup appears automatically on the second spin
- **Customizable Elements**: Balance, logo, and CTA URL are configurable

### 2. Files Modified

```
/public/CastleSlot/
├── index.html              # Added game-wrapper.js script
├── game-wrapper.js         # NEW: Deterministic game logic
└── [original game files]   # Untouched Construct 3 export

/src/templates/t13/
└── server.ts              # Updated iframe integration

/components/
└── CastleSlotGame.tsx     # NEW: React component

/examples/
└── castle-slot-landing.tsx # NEW: Complete landing page example
```

## 🚀 Quick Start

### Option 1: Using the Template System

1. Select "Castle Slot" template in the editor
2. Configure fields:
   - **Game Title**: Custom headline
   - **Game Balance**: Starting balance (e.g., 1000)
   - **Custom Logo**: URL to your logo image
   - **CTA URL**: Where users go after winning

### Option 2: Direct React Integration

```tsx
import CastleSlotGame from '../components/CastleSlotGame';

function MyLandingPage() {
  return (
    <CastleSlotGame
      balance={1500}
      logoUrl="https://your-cdn.com/logo.png"
      ctaUrl="https://your-casino.com/signup"
      onWin={() => console.log('Player won!')}
    />
  );
}
```

### Option 3: Direct Iframe Integration

```html
<iframe 
  src="/CastleSlot/index.html?balance=1000&logo=https://your-logo.com/logo.png&cta=https://casino.com"
  width="100%"
  height="600"
  style="border:none;"
></iframe>

<script>
  window.addEventListener("message", (e) => {
    if (e.data.type === "showWinPopup") {
      document.getElementById("popup-win").style.display = "flex";
    }
  });
</script>

<div id="popup-win" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); justify-content:center; align-items:center; z-index:9999;">
  <div style="background:white; padding:30px; border-radius:10px; text-align:center; max-width:400px;">
    <h2>🎉 Congratulations!</h2>
    <p>You've just unlocked your casino bonus!</p>
    <a href="https://casino-landing.com" target="_blank" 
       style="display:inline-block; margin-top:20px; background:#FFD700; color:#000; padding:15px 30px; border-radius:6px; text-decoration:none; font-weight:bold;">
       Claim Bonus
    </a>
  </div>
</div>
```

## 🎯 Affiliate Customization

### URL Parameters

Affiliates can customize the game using URL parameters:

```
https://your-landing.com/castle-slot?balance=2000&logo=https://affiliate.com/logo.png&cta=https://casino123.com
```

**Available Parameters:**
- `balance`: Starting balance (number)
- `logo`: Logo image URL (string)
- `cta`: Destination URL after win (string)

### Database Integration

For dynamic configuration, store affiliate settings in your database:

```sql
CREATE TABLE affiliate_configs (
  id SERIAL PRIMARY KEY,
  affiliate_id VARCHAR(50),
  balance INTEGER DEFAULT 1000,
  logo_url TEXT,
  cta_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

```tsx
// Example: Load config from database
const affiliateConfig = await getAffiliateConfig(affiliateId);

<CastleSlotGame
  balance={affiliateConfig.balance}
  logoUrl={affiliateConfig.logo_url}
  ctaUrl={affiliateConfig.cta_url}
/>
```

## 🎮 Game Behavior

### Deterministic Flow

1. **First Spin**: Normal slot animation, no win
2. **Second Spin**: Triggers win popup automatically
3. **Popup**: Shows customizable win message with CTA button
4. **CTA Click**: Redirects to affiliate casino link

### Customization Options

| Element | Editable | Method |
|---------|----------|---------|
| Starting Balance | ✅ | URL param, props, or database |
| Logo | ✅ | URL param, props, or database |
| CTA Link | ✅ | URL param, props, or database |
| Win Message | ✅ | Template configuration |
| Game Title | ✅ | Template configuration |
| Popup Design | ✅ | CSS customization |

## 📱 Responsive Design

The game is fully responsive and works on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablets (iPad, Android tablets)

## 🔒 Security Features

- **Sandbox**: Iframe runs in sandboxed environment
- **CORS**: Proper cross-origin message handling
- **No Direct DOM Access**: Game can't access parent page data
- **URL Validation**: CTA URLs are validated before redirect

## 📊 Analytics Integration

### Google Analytics

```tsx
const handleGameWin = () => {
  gtag('event', 'game_win', {
    event_category: 'engagement',
    event_label: 'castle_slot'
  });
};

const handleCTAClick = () => {
  gtag('event', 'conversion', {
    event_category: 'cta_click',
    event_label: 'claim_bonus'
  });
};
```

### Facebook Pixel

```tsx
const handleGameWin = () => {
  fbq('track', 'Lead');
};

const handleCTAClick = () => {
  fbq('track', 'InitiateCheckout');
};
```

## 🛠️ Advanced Customization

### Custom Popup Design

```css
.castle-slot-popup {
  /* Override default popup styles */
  background: linear-gradient(45deg, #your-brand-color, #secondary-color);
}

.castle-slot-popup .win-content {
  /* Customize popup content */
  border: 3px solid #your-accent-color;
}
```

### Custom Win Conditions

Modify `game-wrapper.js` to change win conditions:

```javascript
// Trigger win on 3rd spin instead of 2nd
if (window.gameState.spinCount === 3) {
  triggerWinPopup();
}

// Or add random chance
if (window.gameState.spinCount >= 2 && Math.random() < 0.7) {
  triggerWinPopup();
}
```

### Multiple Win Levels

```javascript
// Different rewards based on spin count
const rewards = {
  2: { prize: '$1,000 Bonus', cta: 'https://casino.com/small' },
  5: { prize: '$5,000 Bonus', cta: 'https://casino.com/big' },
  10: { prize: '$10,000 Jackpot', cta: 'https://casino.com/jackpot' }
};

if (rewards[window.gameState.spinCount]) {
  const reward = rewards[window.gameState.spinCount];
  triggerWinPopup(reward);
}
```

## 🐛 Troubleshooting

### Common Issues

**Game not loading:**
- Check that `/public/CastleSlot/` files are accessible
- Verify iframe src path is correct
- Check browser console for errors

**Popup not appearing:**
- Ensure message listener is set up correctly
- Check that `game-wrapper.js` is loading
- Verify spin detection is working

**Configuration not applying:**
- Check URL parameter encoding
- Verify iframe communication is working
- Test with simple static values first

### Debug Mode

Enable debug logging:

```javascript
// Add to game-wrapper.js
window.gameState.debug = true;

// Or via URL parameter
?debug=true
```

## 📈 Performance Optimization

- **Preload**: Game assets are preloaded for faster startup
- **Compression**: All assets are optimized for web delivery
- **Caching**: Proper cache headers for static assets
- **Lazy Loading**: Game loads only when needed

## 🔄 Updates and Maintenance

### Updating Game Content

1. Replace files in `/public/CastleSlot/`
2. Keep `game-wrapper.js` and modified `index.html`
3. Test deterministic behavior still works

### Version Control

```bash
# Track only the wrapper files
git add public/CastleSlot/game-wrapper.js
git add public/CastleSlot/index.html
git add components/CastleSlotGame.tsx

# Ignore large game assets if needed
echo "public/CastleSlot/*.png" >> .gitignore
echo "public/CastleSlot/*.jpg" >> .gitignore
```

## 📞 Support

For technical support or customization requests:
- Check the browser console for error messages
- Test with the provided examples
- Verify all files are properly uploaded
- Ensure proper iframe permissions are set

---

**Ready to integrate Castle Slot into your affiliate landing pages! 🏰🎰**

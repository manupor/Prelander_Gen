# T13 - Pirate's Treasures Slot Machine

## Overview
A fully functional 5x3 slot machine game with a pirate treasure theme.

## Features
- **5x3 Grid**: 5 reels with 3 rows each
- **15 Pirate Icons**: Bomb, treasure chest, compass, map, skull, anchor, flag, etc.
- **Win Detection**: Highlights 3+ matching horizontal symbols with golden glow
- **Animations**: Smooth spinning reels, floating coins, win celebrations
- **Auto Spin**: Continuous play mode
- **Win Modal**: Popup after winning combinations
- **Responsive**: Works on desktop and mobile
- **Theme**: Complete pirate beach scene with palm trees, ocean, clouds

## Game Mechanics
1. Click SPIN button to play
2. Reels spin for 2 seconds with stagger effect
3. Random icons appear on each cell
4. 3+ matching icons in a row = WIN
5. Balance increases based on bet multiplier
6. Win modal appears after multiple wins

## Editable Fields
- `headline`: Game title (default: "PIRATE'S TREASURES")
- `gameBalance`: Starting balance (default: 150,000)
- `cta`: Spin button text (default: "SPIN")
- `ctaUrl`: Redirect URL after win claim
- `popupTitle`: Win modal title
- `popupMessage`: Win modal message
- `popupPrize`: Prize display text

## Icons
💣 Bomb | 📜 Map | 🧭 Compass | 💀 Skull | ⚓ Anchor | 🏴‍☠️ Pirate Flag
🔭 Telescope | 🪝 Hook | 🛢️ Barrel | 👑 Crown | 💎 Gem | 🗝️ Key
⚔️ Swords | 🏆 Trophy | 🪙 Coin

## Technical Details
- Pure JavaScript (no external libraries)
- CSS Grid for slot layout
- CSS animations for spins and effects
- LocalStorage for balance persistence
- Fully self-contained (no API calls)

import { BrandConfig } from '../../lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const headline = brand.copy?.headline || "PIRATE'S TREASURES"
  const cta = brand.copy?.cta || 'SPIN'
  const ctaUrl = (brand as any).ctaUrl || 'https://example.com'
  const popupTitle = (brand as any).popupTitle || 'TREASURE FOUND!'
  const popupMessage = (brand as any).popupMessage || "You've discovered a legendary prize!"
  const popupPrize = (brand as any).popupPrize || '$5,000 + 100 FREE SPINS'
  const gameBalance = (brand as any).gameBalance || 150000

  // Pirates Slot symbol assets (ICON 1-15)
  const SYMBOL_ASSETS = [
    '/Pirates Slot/ICON 1.svg',
    '/Pirates Slot/ICON 2.svg', 
    '/Pirates Slot/ICON 3.svg',
    '/Pirates Slot/ICON 4.svg',
    '/Pirates Slot/ICON 5.svg',
    '/Pirates Slot/ICON 6.svg',
    '/Pirates Slot/ICON 7.svg',
    '/Pirates Slot/ICON 8.svg',
    '/Pirates Slot/ICON 9.svg',
    '/Pirates Slot/ICON 10.svg',
    '/Pirates Slot/ICON 11.svg',
    '/Pirates Slot/ICON 12.svg',
    '/Pirates Slot/ICON 13.svg',
    '/Pirates Slot/ICON 14.svg',
    '/Pirates Slot/ICON 15.svg'
  ]

  const css = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial Black', Arial, sans-serif;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    /* Full-screen responsive background */
    .game-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/Pirates Slot/background.svg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: 1;
    }

    /* Main game container - centered and responsive */
    .game-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 1000px;
      height: 90%;
      max-height: 700px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Top section integrated in frame */
    .top-section {
      position: absolute;
      top: 6%;
      right: 12%;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 15;
    }

    .pirates-title {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      color: #8B0000;
      font-size: 28px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      z-index: 15;
      font-family: 'Pirata One', cursive;
    }

    .balance-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .buy-coins-btn {
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      color: #8B4513;
      border: 2px solid #8B4513;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .buy-coins-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }

    .balance-display {
      background-image: url('/Pirates Slot/balance.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 180px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 16px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    /* Slot machine frame - perfectly centered */
    .slot-machine {
      position: relative;
      width: 100%;
      height: 550px;
      background-image: url('/Pirates Slot/frame.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 5x9 Grid container - contained within frame */
    .slot-grid {
      position: absolute;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(9, 1fr);
      gap: 2px;
      width: 380px;
      height: 290px;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Individual slot cells */
    .slot-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .slot-cell img {
      width: 75%;
      height: 75%;
      object-fit: contain;
      transition: all 0.3s ease;
    }

    /* Hover effects */
    .slot-cell:hover {
      transform: scale(1.08);
      z-index: 10;
    }

    .slot-cell:hover img {
      filter: brightness(1.3) drop-shadow(0 0 12px rgba(255, 215, 0, 0.9));
    }

    /* Animation effects */
    .slot-cell.spinning {
      animation: rollover-spin 0.8s ease-in-out;
    }

    .slot-cell.winning {
      animation: win-glow 1.2s ease-in-out infinite;
    }

    @keyframes rollover-spin {
      0% { 
        transform: translateY(0) rotateX(0deg);
        opacity: 1;
      }
      25% {
        transform: translateY(-20px) rotateX(90deg);
        opacity: 0.7;
      }
      50% {
        transform: translateY(-40px) rotateX(180deg);
        opacity: 0.3;
      }
      75% {
        transform: translateY(-20px) rotateX(270deg);
        opacity: 0.7;
      }
      100% { 
        transform: translateY(0) rotateX(360deg);
        opacity: 1;
      }
    }

    @keyframes win-glow {
      0%, 100% { 
        transform: scale(1);
        filter: brightness(1) drop-shadow(0 0 8px rgba(76, 175, 80, 0.8));
      }
      50% { 
        transform: scale(1.15);
        filter: brightness(1.4) drop-shadow(0 0 20px rgba(76, 175, 80, 1));
      }
    }

    /* Frame-integrated buttons positioned on frame elements */
    .frame-buttons {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .frame-buttons > * {
      pointer-events: all;
    }

    /* Bottom control bar integrated in frame */
    .bottom-controls {
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 85%;
      z-index: 15;
    }

    .menu-btn {
      background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
      color: #FFD700;
      border: 2px solid #FFD700;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .total-bet-display {
      text-align: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 11px;
    }

    .spin-btn {
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      color: #8B4513;
      border: 3px solid #8B4513;
      padding: 8px 16px;
      border-radius: 50%;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 60px;
      height: 60px;
    }

    .balance-display {
      text-align: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 11px;
    }

    .auto-spin-btn {
      background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
      color: #FFD700;
      border: 2px solid #FFD700;
      padding: 6px 8px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      line-height: 1.2;
    }

    /* Remove the old control panel */
    .control-panel {
      display: none;
    }

    /* Button hover effects */
    .menu-btn:hover,
    .spin-btn:hover,
    .auto-spin-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.7));
    }

    .spin-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      filter: grayscale(1);
    }

    .auto-spin-btn.active {
      filter: hue-rotate(120deg) brightness(1.3);
    }

    /* Win modal */
    .win-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: modal-fade-in 0.5s ease;
    }

    @keyframes modal-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .win-content {
      background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 5px solid #8D6E63;
      animation: modal-bounce 0.6s ease;
    }

    @keyframes modal-bounce {
      0% { transform: scale(0.5); }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .win-title {
      color: #8D6E63;
      font-size: 32px;
      margin-bottom: 15px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .win-message {
      color: #5D4037;
      font-size: 18px;
      margin-bottom: 20px;
      line-height: 1.4;
    }

    .win-prize {
      color: #2E7D32;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 30px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .claim-btn {
      background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
      color: white;
      border: none;
      padding: 18px 40px;
      border-radius: 30px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 6px 25px rgba(76,175,80,0.4);
      transition: all 0.3s ease;
    }

    .claim-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(76,175,80,0.6);
    }

    /* Floating coin animation */
    .floating-coin {
      position: absolute;
      width: 30px;
      height: 30px;
      pointer-events: none;
      z-index: 100;
      animation: float-up 2s ease-out forwards;
    }

    @keyframes float-up {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-100px);
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .game-container {
        width: 95%;
        height: 95%;
      }
      
      .pirates-title {
        width: 250px;
        height: 50px;
      }
      
      .slot-machine {
        height: 420px;
      }
      
      .slot-grid {
        width: 380px;
        height: 230px;
        gap: 6px;
        top: 43%;
      }
      
      .pirates-title {
        width: 350px;
        height: 70px;
        top: 2%;
      }
      
      .menu-btn,
      .auto-spin-btn {
        width: 75px;
        height: 38px;
        bottom: 12%;
      }
      
      .menu-btn {
        left: 6%;
      }
      
      .auto-spin-btn {
        right: 6%;
      }
      
      .total-bet-display {
        width: 95px;
        height: 38px;
        font-size: 12px;
        bottom: 12%;
        left: 22%;
      }
      
      .spin-btn {
        width: 85px;
        height: 55px;
        bottom: 10%;
      }
      
      .balance-display {
        width: 140px;
        height: 45px;
        font-size: 14px;
      }
      
      .buy-coins-btn {
        width: 90px;
        height: 35px;
      }
    }
  `

  const jsCode = `
    // Pirates Slot symbol assets
    const SYMBOL_ASSETS = [
      '/Pirates Slot/ICON 1.svg',
      '/Pirates Slot/ICON 2.svg', 
      '/Pirates Slot/ICON 3.svg',
      '/Pirates Slot/ICON 4.svg',
      '/Pirates Slot/ICON 5.svg',
      '/Pirates Slot/ICON 6.svg',
      '/Pirates Slot/ICON 7.svg',
      '/Pirates Slot/ICON 8.svg',
      '/Pirates Slot/ICON 9.svg',
      '/Pirates Slot/ICON 10.svg',
      '/Pirates Slot/ICON 11.svg',
      '/Pirates Slot/ICON 12.svg',
      '/Pirates Slot/ICON 13.svg',
      '/Pirates Slot/ICON 14.svg',
      '/Pirates Slot/ICON 15.svg'
    ];

    let balance = ${gameBalance};
    let bet = 85150;
    let isSpinning = false;
    let autoSpin = false;
    let spinCount = 0;
    let reelElements = [];

    function initGame() {
      const slotGrid = document.getElementById('slot-grid');
      
      // Create 5x9 grid matching reference
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 5; col++) {
          const cell = document.createElement('div');
          cell.className = 'slot-cell';
          cell.dataset.col = col;
          cell.dataset.row = row;
          
          const img = document.createElement('img');
          img.src = getRandomSymbol();
          img.alt = 'Pirate Symbol';
          img.draggable = false;
          cell.appendChild(img);
          
          slotGrid.appendChild(cell);
          
          // Store in column-based structure
          if (!reelElements[col]) {
            reelElements[col] = [];
          }
          reelElements[col][row] = cell;
        }
      }
      
      updateDisplay();
    }

    // Track used symbols to avoid immediate repetition
    let lastUsedSymbols = [];
    
    function getRandomSymbol() {
      let availableSymbols = SYMBOL_ASSETS.filter(symbol => 
        !lastUsedSymbols.includes(symbol)
      );
      
      // If we've used all symbols, reset the tracking
      if (availableSymbols.length === 0) {
        lastUsedSymbols = [];
        availableSymbols = [...SYMBOL_ASSETS];
      }
      
      const selectedSymbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
      
      // Track the last 8 symbols to avoid repetition
      lastUsedSymbols.push(selectedSymbol);
      if (lastUsedSymbols.length > 8) {
        lastUsedSymbols.shift();
      }
      
      return selectedSymbol;
    }

    function updateDisplay() {
      document.getElementById('balance').textContent = balance.toLocaleString();
    }

    async function spin() {
      if (isSpinning) return;
      
      if (balance < bet) {
        alert('Insufficient balance!');
        return;
      }
      
      isSpinning = true;
      balance -= bet;
      updateDisplay();
      
      const spinBtn = document.getElementById('spinBtn');
      spinBtn.disabled = true;
      
      // Remove previous winning effects
      document.querySelectorAll('.slot-cell.winning').forEach(cell => {
        cell.classList.remove('winning');
      });
      
      // Animate each column with staggered rollover effect
      const spinPromises = [];
      for (let col = 0; col < 5; col++) {
        const promise = new Promise(resolve => {
          // Start rollover animation for each row in this column
          for (let row = 0; row < 9; row++) {
            const cell = reelElements[col][row];
            setTimeout(() => {
              cell.classList.add('spinning');
              
              // Change symbol during the middle of animation
              setTimeout(() => {
                const img = cell.querySelector('img');
                img.src = getRandomSymbol();
              }, 400); // Middle of 0.8s animation
              
              // Remove spinning class after animation
              setTimeout(() => {
                cell.classList.remove('spinning');
              }, 800);
            }, row * 50); // Stagger rows within column
          }
          
          // Resolve when all rows in column are done
          setTimeout(() => {
            resolve();
          }, 1500 + (col * 200)); // Staggered column completion
        });
        spinPromises.push(promise);
      }
      
      await Promise.all(spinPromises);
      
      // Check for wins after all reels stop
      setTimeout(() => {
        checkWins();
        isSpinning = false;
        spinBtn.disabled = false;
        
        // Continue auto spin if enabled
        if (autoSpin) {
          spinCount++;
          setTimeout(() => spin(), 1500);
        }
      }, 500);
    }

    function checkWins() {
      const rows = [];
      
      // Build rows array for 9 rows
      for (let row = 0; row < 9; row++) {
        const rowSymbols = [];
        for (let col = 0; col < 5; col++) {
          const cell = reelElements[col][row];
          const img = cell.querySelector('img');
          rowSymbols.push({
            symbol: img.src,
            cell: cell
          });
        }
        rows.push(rowSymbols);
      }
      
      let hasWin = false;
      
      // Check each row for consecutive symbols
      rows.forEach((row, rowIndex) => {
        let consecutiveCount = 1;
        let currentSymbol = row[0].symbol;
        let winningCells = [row[0].cell];
        
        for (let i = 1; i < row.length; i++) {
          if (row[i].symbol === currentSymbol) {
            consecutiveCount++;
            winningCells.push(row[i].cell);
          } else {
            // Check if we have a win (3+ consecutive)
            if (consecutiveCount >= 3) {
              hasWin = true;
              winningCells.forEach(cell => cell.classList.add('winning'));
              
              const winAmount = bet * consecutiveCount;
              balance += winAmount;
              
              // Create floating coins
              winningCells.forEach((cell, index) => {
                setTimeout(() => createFloatingCoin(cell), index * 100);
              });
            }
            
            // Reset for next sequence
            consecutiveCount = 1;
            currentSymbol = row[i].symbol;
            winningCells = [row[i].cell];
          }
        }
        
        // Check final sequence
        if (consecutiveCount >= 3) {
          hasWin = true;
          winningCells.forEach(cell => cell.classList.add('winning'));
          
          const winAmount = bet * consecutiveCount;
          balance += winAmount;
          
          winningCells.forEach((cell, index) => {
            setTimeout(() => createFloatingCoin(cell), index * 100);
          });
        }
      });
      
      if (hasWin) {
        updateDisplay();
        setTimeout(() => {
          document.getElementById('winModal').style.display = 'flex';
        }, 1500);
      }
    }

    function createFloatingCoin(cell) {
      const coin = document.createElement('img');
      coin.className = 'floating-coin';
      coin.src = '/Pirates Slot/ICON 1.svg'; // Use coin asset
      coin.style.left = cell.offsetLeft + 'px';
      coin.style.top = cell.offsetTop + 'px';
      document.body.appendChild(coin);
      
      setTimeout(() => coin.remove(), 2000);
    }

    // Initialize game when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      initGame();
      
      // Spin button event
      document.getElementById('spinBtn').addEventListener('click', spin);
      
      // Auto spin button event
      document.getElementById('autoSpinBtn').addEventListener('click', function() {
        autoSpin = !autoSpin;
        this.classList.toggle('active', autoSpin);
        
        if (autoSpin) {
          spin();
        }
      });
      
      // Claim button event
      document.getElementById('claimBtn').addEventListener('click', function() {
        const ctaUrl = this.dataset.ctaUrl;
        window.open(ctaUrl, '_blank');
      });
      
      // Close modal when clicking outside
      document.getElementById('winModal').addEventListener('click', function(e) {
        if (e.target === this) {
          this.style.display = 'none';
        }
      });
    });
  `

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
  <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  <!-- Full-screen responsive background -->
  <div class="game-background"></div>
  
  <!-- Centered Pirates Treasures title -->
  <div class="pirates-title">${headline}</div>
  
  <!-- Main game container -->
  <div class="game-container">
    <!-- Top section with balance and buy coins -->
    <div class="top-section">
      <div class="balance-info">
        <div style="color: #FFD700; font-weight: bold;">${gameBalance.toLocaleString()}</div>
        <button class="buy-coins-btn" id="buyCoinsBtn">BUY COINS</button>
      </div>
    </div>
    
    <!-- Slot machine with frame -->
    <div class="slot-machine">
      <!-- 5x3 Grid of slot symbols -->
      <div class="slot-grid" id="slot-grid"></div>
    </div>
    
    <!-- Bottom control bar -->
    <div class="bottom-controls">
      <button class="menu-btn" id="menuBtn">MENU</button>
      <div class="total-bet-display">
        <div>TOTAL BET</div>
        <div>85,150</div>
      </div>
      <button class="spin-btn" id="spinBtn">SPIN</button>
      <div class="balance-display">
        <div>BALANCE</div>
        <div id="balance">${gameBalance.toLocaleString()}</div>
      </div>
      <button class="auto-spin-btn" id="autoSpinBtn">AUTO<br>SPIN</button>
    </div>
  </div>
  
  <!-- Win modal -->
  <div class="win-modal" id="winModal">
    <div class="win-content">
      <h2 class="win-title">${popupTitle}</h2>
      <p class="win-message">${popupMessage}</p>
      <div class="win-prize">${popupPrize}</div>
      <button class="claim-btn" id="claimBtn" data-cta-url="${ctaUrl}">${cta}</button>
    </div>
  </div>
  
  <script>${jsCode}</script>
</body>
</html>`

  return { html, css }
}

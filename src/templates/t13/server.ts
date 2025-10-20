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

    /* Top section with title and balance */
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 80px;
    }

    .pirates-title {
      background-image: url('/Pirates Slot/pirates treasure.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 350px;
      height: 70px;
      flex-shrink: 0;
    }

    .balance-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .buy-coins-btn {
      background-image: url('/Pirates Slot/buy coins.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 120px;
      height: 50px;
      border: none;
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
      height: 450px;
      background-image: url('/Pirates Slot/frame.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 5x3 Grid container - pixel-perfect alignment */
    .slot-grid {
      position: absolute;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 3px;
      width: 420px;
      height: 252px;
      top: 50%;
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
      width: 100%;
      height: 100%;
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
      animation: spin-effect 0.6s ease-in-out infinite;
    }

    .slot-cell.winning {
      animation: win-glow 1.2s ease-in-out infinite;
    }

    @keyframes spin-effect {
      0% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
      100% { transform: rotateY(360deg); }
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

    /* Bottom control panel */
    .control-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      height: 80px;
    }

    .menu-btn {
      background-image: url('/Pirates Slot/menu.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 100px;
      height: 50px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .total-bet-display {
      background-image: url('/Pirates Slot/total bet.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 140px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 14px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    .spin-btn {
      background-image: url('/Pirates Slot/spin.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 120px;
      height: 70px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .auto-spin-btn {
      background-image: url('/Pirates Slot/auto spin.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 100px;
      height: 50px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
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
        height: 350px;
      }
      
      .slot-grid {
        width: 320px;
        height: 192px;
        gap: 2px;
      }
      
      .control-panel {
        padding: 0 20px;
        height: 60px;
      }
      
      .menu-btn,
      .auto-spin-btn {
        width: 80px;
        height: 40px;
      }
      
      .total-bet-display {
        width: 110px;
        height: 40px;
        font-size: 12px;
      }
      
      .spin-btn {
        width: 90px;
        height: 55px;
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
      
      // Create 5x3 grid of slot cells
      for (let row = 0; row < 3; row++) {
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
          
          // Store in column-based structure for game logic
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
      
      // Animate each column with delay
      const spinPromises = [];
      for (let col = 0; col < 5; col++) {
        const promise = new Promise(resolve => {
          // Add spinning effect to all cells in this column
          for (let row = 0; row < 3; row++) {
            const cell = reelElements[col][row];
            cell.classList.add('spinning');
          }
          
          setTimeout(() => {
            // Update symbols and remove spinning effect
            for (let row = 0; row < 3; row++) {
              const cell = reelElements[col][row];
              cell.classList.remove('spinning');
              const img = cell.querySelector('img');
              img.src = getRandomSymbol();
            }
            resolve();
          }, 2000 + (col * 200)); // Staggered stop by column
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
          setTimeout(() => spin(), 1000);
        }
      }, 500);
    }

    function checkWins() {
      const rows = [];
      
      // Build rows array
      for (let row = 0; row < 3; row++) {
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
  <style>${css}</style>
</head>
<body>
  <!-- Full-screen responsive background -->
  <div class="game-background"></div>
  
  <!-- Main game container -->
  <div class="game-container">
    <!-- Top section with title and balance -->
    <div class="top-section">
      <div class="pirates-title"></div>
      <div class="balance-info">
        <button class="buy-coins-btn" id="buyCoinsBtn"></button>
        <div class="balance-display" id="balance">${gameBalance.toLocaleString()}</div>
      </div>
    </div>
    
    <!-- Slot machine with frame -->
    <div class="slot-machine">
      <!-- 5x3 Grid of slot symbols -->
      <div class="slot-grid" id="slot-grid"></div>
    </div>
    
    <!-- Bottom control panel -->
    <div class="control-panel">
      <button class="menu-btn" id="menuBtn"></button>
      <div class="total-bet-display">85,150</div>
      <button class="spin-btn" id="spinBtn"></button>
      <button class="auto-spin-btn" id="autoSpinBtn"></button>
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

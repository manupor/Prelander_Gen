import { BrandConfig } from '../../lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const headline = brand.copy?.headline || "PIRATE'S TREASURES"
  const cta = brand.copy?.cta || 'SPIN'
  const ctaUrl = (brand as any).ctaUrl || 'https://example.com'
  const popupTitle = (brand as any).popupTitle || 'TREASURE FOUND!'
  const popupMessage = (brand as any).popupMessage || "You've discovered a legendary prize!"
  const popupPrize = (brand as any).popupPrize || '$5,000 + 100 FREE SPINS'
  const gameBalance = (brand as any).gameBalance || 150000

  // Pirates Slot symbol assets (Asset 2, 5-19)
  const SYMBOL_ASSETS = [
    '/Pirates Slot/Asset 2.svg',
    '/Pirates Slot/Asset 5.svg', 
    '/Pirates Slot/Asset 6.svg',
    '/Pirates Slot/Asset 7.svg',
    '/Pirates Slot/Asset 8.svg',
    '/Pirates Slot/Asset 9.svg',
    '/Pirates Slot/Asset 10.svg',
    '/Pirates Slot/Asset 11.svg',
    '/Pirates Slot/Asset 12.svg',
    '/Pirates Slot/Asset 13.svg',
    '/Pirates Slot/Asset 14.svg',
    '/Pirates Slot/Asset 15.svg',
    '/Pirates Slot/Asset 16.svg',
    '/Pirates Slot/Asset 17.svg',
    '/Pirates Slot/Asset 18.svg',
    '/Pirates Slot/Asset 19.svg'
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

    .game-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 95%;
      max-width: 1200px;
      z-index: 10;
    }

    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 20px;
    }

    .pirates-title {
      background-image: url('/Pirates Slot/pirates treasure.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 400px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      font-size: 0;
    }

    .balance-section {
      background-image: url('/Pirates Slot/balance.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 200px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 18px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    .slot-machine {
      position: relative;
      background-image: url('/Pirates Slot/frame.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .reels-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      padding: 60px 120px;
      width: 100%;
      height: 100%;
      align-items: center;
    }

    .reel {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slot-cell {
      width: 90px;
      height: 90px;
      background: rgba(139, 69, 19, 0.3);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 215, 0, 0.3);
      position: relative;
      overflow: hidden;
    }

    .slot-cell img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      transition: all 0.3s ease;
    }

    .slot-cell:hover {
      transform: scale(1.1);
      border-color: #FFD700;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
      background: rgba(255, 215, 0, 0.2);
    }

    .slot-cell:hover img {
      transform: scale(1.1);
      filter: brightness(1.2) drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
    }

    .slot-cell.spinning {
      animation: spin-effect 0.5s ease-in-out infinite;
    }

    .slot-cell.winning {
      animation: win-glow 1s ease-in-out infinite;
      border-color: #4CAF50;
      box-shadow: 0 0 30px #4CAF50;
    }

    @keyframes spin-effect {
      0% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
      100% { transform: rotateY(360deg); }
    }

    @keyframes win-glow {
      0%, 100% { 
        box-shadow: 0 0 20px #4CAF50;
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 40px #4CAF50, 0 0 60px #4CAF50;
        transform: scale(1.1);
      }
    }

    .control-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      margin-top: 20px;
    }

    .menu-btn {
      background-image: url('/Pirates Slot/menu.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 120px;
      height: 60px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .menu-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }

    .total-bet {
      background-image: url('/Pirates Slot/total bet.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 150px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-weight: bold;
      font-size: 16px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    }

    .spin-btn {
      background-image: url('/Pirates Slot/spin.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 150px;
      height: 80px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .spin-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
    }

    .spin-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      filter: grayscale(1);
    }

    .auto-spin-btn {
      background-image: url('/Pirates Slot/auto spin.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 120px;
      height: 60px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .auto-spin-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }

    .auto-spin-btn.active {
      filter: hue-rotate(120deg) brightness(1.3);
    }

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

    @media (max-width: 768px) {
      .game-container {
        width: 98%;
        padding: 0 10px;
      }
      
      .slot-cell {
        width: 60px;
        height: 60px;
      }
      
      .slot-cell img {
        width: 45px;
        height: 45px;
      }
      
      .control-panel {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
      }
      
      .pirates-title {
        width: 300px;
        height: 60px;
      }
      
      .reels-container {
        padding: 40px 60px;
      }
    }
  `

  const jsCode = `
    // Pirates Slot symbol assets
    const SYMBOL_ASSETS = [
      '/Pirates Slot/Asset 2.svg',
      '/Pirates Slot/Asset 5.svg', 
      '/Pirates Slot/Asset 6.svg',
      '/Pirates Slot/Asset 7.svg',
      '/Pirates Slot/Asset 8.svg',
      '/Pirates Slot/Asset 9.svg',
      '/Pirates Slot/Asset 10.svg',
      '/Pirates Slot/Asset 11.svg',
      '/Pirates Slot/Asset 12.svg',
      '/Pirates Slot/Asset 13.svg',
      '/Pirates Slot/Asset 14.svg',
      '/Pirates Slot/Asset 15.svg',
      '/Pirates Slot/Asset 16.svg',
      '/Pirates Slot/Asset 17.svg',
      '/Pirates Slot/Asset 18.svg',
      '/Pirates Slot/Asset 19.svg'
    ];

    let balance = ${gameBalance};
    let bet = 85150;
    let isSpinning = false;
    let autoSpin = false;
    let spinCount = 0;
    let reelElements = [];

    function initGame() {
      const reelsContainer = document.getElementById('reels');
      
      for (let col = 0; col < 5; col++) {
        const reel = document.createElement('div');
        reel.className = 'reel';
        
        const reelCells = [];
        for (let row = 0; row < 3; row++) {
          const cell = document.createElement('div');
          cell.className = 'slot-cell';
          cell.dataset.col = col;
          cell.dataset.row = row;
          
          const img = document.createElement('img');
          img.src = getRandomSymbol();
          img.alt = 'Symbol';
          cell.appendChild(img);
          
          reel.appendChild(cell);
          reelCells.push(cell);
        }
        
        reelElements.push(reelCells);
        reelsContainer.appendChild(reel);
      }
      
      updateDisplay();
    }

    function getRandomSymbol() {
      return SYMBOL_ASSETS[Math.floor(Math.random() * SYMBOL_ASSETS.length)];
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
      
      // Animate each reel with delay
      const spinPromises = reelElements.map((reel, reelIndex) => {
        return new Promise(resolve => {
          // Add spinning effect
          reel.forEach(cell => cell.classList.add('spinning'));
          
          setTimeout(() => {
            // Update symbols and remove spinning effect
            reel.forEach(cell => {
              cell.classList.remove('spinning');
              const img = cell.querySelector('img');
              img.src = getRandomSymbol();
            });
            resolve();
          }, 2000 + (reelIndex * 200)); // Staggered stop
        });
      });
      
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
      coin.src = '/Pirates Slot/Asset 19.svg'; // Use coin asset
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
  <div class="game-background"></div>
  
  <div class="game-container">
    <div class="top-section">
      <div class="pirates-title">${headline}</div>
      <div class="balance-section" id="balance">${gameBalance.toLocaleString()}</div>
    </div>
    
    <div class="slot-machine">
      <div class="reels-container" id="reels"></div>
    </div>
    
    <div class="control-panel">
      <button class="menu-btn" id="menuBtn"></button>
      <div class="total-bet">85,150</div>
      <button class="spin-btn" id="spinBtn"></button>
      <button class="auto-spin-btn" id="autoSpinBtn"></button>
    </div>
  </div>
  
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

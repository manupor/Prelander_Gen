// Pirate's Treasures Slot Game - Complete JavaScript
const ICONS = ['💣','📜','🧭','💀','⚓','🏴‍☠️','🔭','🪝','🛢️','👑','💎','🗝️','⚔️','🏆','🪙'];
let balance = 150000;
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
      cell.innerHTML = getRandomIcon();
      reel.appendChild(cell);
      reelCells.push(cell);
    }
    reelElements.push(reelCells);
    reelsContainer.appendChild(reel);
  }
  updateDisplay();
}

function getRandomIcon() {
  return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function updateDisplay() {
  document.getElementById('balance').textContent = balance.toLocaleString();
  document.getElementById('coinBalance').textContent = balance.toLocaleString();
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
  document.querySelectorAll('.slot-cell.winning').forEach(cell => cell.classList.remove('winning'));
  
  const spinPromises = reelElements.map((reel, colIndex) => {
    return new Promise(resolve => {
      reel.forEach(cell => cell.classList.add('spinning'));
      setTimeout(() => {
        reel.forEach(cell => {
          cell.classList.remove('spinning');
          cell.innerHTML = getRandomIcon();
        });
        resolve();
      }, 2000 + colIndex * 200);
    });
  });
  
  await Promise.all(spinPromises);
  setTimeout(() => {
    checkWins();
    isSpinning = false;
    spinBtn.disabled = false;
    if (autoSpin) {
      spinCount++;
      setTimeout(() => spin(), 1000);
    }
  }, 500);
}

function checkWins() {
  const grid = [];
  for (let row = 0; row < 3; row++) {
    const rowData = [];
    for (let col = 0; col < 5; col++) {
      const cell = reelElements[col][row];
      rowData.push({ icon: cell.innerHTML, cell: cell });
    }
    grid.push(rowData);
  }
  
  let hasWin = false;
  grid.forEach((row) => {
    let consecutive = 1;
    let currentIcon = row[0].icon;
    let matchingCells = [row[0].cell];
    
    for (let i = 1; i < row.length; i++) {
      if (row[i].icon === currentIcon) {
        consecutive++;
        matchingCells.push(row[i].cell);
      } else {
        if (consecutive >= 3) {
          hasWin = true;
          matchingCells.forEach(cell => cell.classList.add('winning'));
          const winAmount = bet * consecutive;
          balance += winAmount;
          matchingCells.forEach((cell, idx) => {
            setTimeout(() => createFloatingCoin(cell), idx * 100);
          });
        }
        consecutive = 1;
        currentIcon = row[i].icon;
        matchingCells = [row[i].cell];
      }
    }
    
    if (consecutive >= 3) {
      hasWin = true;
      matchingCells.forEach(cell => cell.classList.add('winning'));
      const winAmount = bet * consecutive;
      balance += winAmount;
      matchingCells.forEach((cell, idx) => {
        setTimeout(() => createFloatingCoin(cell), idx * 100);
      });
    }
  });
  
  updateDisplay();
  spinCount++;
  if (spinCount >= 3 && hasWin) {
    setTimeout(() => {
      document.getElementById('winModal').classList.add('show');
    }, 1500);
  }
}

function createFloatingCoin(cell) {
  const coin = document.createElement('div');
  coin.className = 'floating-coin';
  coin.textContent = '🪙';
  const rect = cell.getBoundingClientRect();
  coin.style.left = rect.left + rect.width / 2 + 'px';
  coin.style.top = rect.top + rect.height / 2 + 'px';
  document.body.appendChild(coin);
  setTimeout(() => coin.remove(), 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('spinBtn').addEventListener('click', spin);
  
  document.getElementById('autoSpinBtn').addEventListener('click', () => {
    autoSpin = !autoSpin;
    const btn = document.getElementById('autoSpinBtn');
    btn.textContent = autoSpin ? 'STOP' : 'AUTO SPIN';
    if (autoSpin && !isSpinning) spin();
  });
  
  document.getElementById('claimBtn').addEventListener('click', () => {
    document.getElementById('winModal').classList.remove('show');
    const ctaUrl = document.querySelector('[data-cta-url]').dataset.ctaUrl;
    window.location.href = ctaUrl;
  });
  
  document.getElementById('menuBtn').addEventListener('click', () => {
    alert('Menu: Settings and Pay Table would go here');
  });
  
  window.addEventListener('message', function(event) {
    if (event.data === 'showPopup') {
      document.getElementById('winModal').classList.add('show');
    }
  });
  
  initGame();
});

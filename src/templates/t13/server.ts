import { BrandConfig } from '../../lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const headline = brand.copy?.headline || "CASTLE SLOT"
  const cta = brand.copy?.cta || 'CLAIM PRIZE'
  const ctaUrl = (brand as BrandConfig & { ctaUrl?: string }).ctaUrl || 'https://example.com'
  const popupTitle = (brand as BrandConfig & { popupTitle?: string }).popupTitle || 'TREASURE FOUND!'
  const popupMessage = (brand as BrandConfig & { popupMessage?: string }).popupMessage || "You've discovered a legendary prize!"
  const popupPrize = (brand as BrandConfig & { popupPrize?: string }).popupPrize || '$5,000 + 100 FREE SPINS'
  const gameBalance = (brand as BrandConfig & { gameBalance?: number }).gameBalance || 150000
  
  // User's custom logo URL (if provided)
  const customLogo = (brand as BrandConfig & { customLogo?: string }).customLogo || null

  const css = `
    html, body {
      padding: 0;
      margin: 0;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      font-family: 'Arial Black', Arial, sans-serif;
    }

    /* Game container */
    #gameContainer {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /* Overlay for custom elements */
    .game-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    }

    /* Custom title overlay */
    .custom-title {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #FFD700;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      pointer-events: none;
      z-index: 15;
      text-align: center;
    }

    /* Custom logo overlay */
    .custom-logo {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 80px;
      height: 80px;
      object-fit: contain;
      pointer-events: none;
      z-index: 15;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    /* Balance display overlay */
    .balance-overlay {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(0,0,0,0.7);
      color: #FFD700;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      pointer-events: none;
      z-index: 15;
      border: 2px solid #FFD700;
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
      pointer-events: all;
    }

    .claim-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(76,175,80,0.6);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .custom-title {
        font-size: 20px;
        top: 15px;
      }
      
      .custom-logo {
        width: 60px;
        height: 60px;
        top: 15px;
        right: 15px;
      }
      
      .balance-overlay {
        font-size: 14px;
        padding: 8px 12px;
        top: 15px;
        left: 15px;
      }
      
      .game-area {
        width: 95%;
        height: 70%;
      }
      
      .slot-machine {
        padding: 20px;
      }
      
      .slot-reels {
        padding: 15px;
        gap: 8px;
      }
      
      .slot-reel {
        width: 45px;
        height: 45px;
        font-size: 18px;
      }
      
      .spin-button {
        padding: 12px 30px;
        font-size: 16px;
      }
      
      .win-content {
        padding: 30px 20px;
        margin: 20px;
      }
      
      .win-title {
        font-size: 24px;
      }
      
      .win-message {
        font-size: 16px;
      }
      
      .win-prize {
        font-size: 22px;
      }
      
      .claim-btn {
        padding: 14px 30px;
        font-size: 18px;
      }
    }
  `

  const jsCode = `
    let balance = ${gameBalance};
    let gameWon = false;
    
    // Game configuration to pass to iframe
    const gameConfig = {
      balance: ${gameBalance},
      logo: ${customLogo ? `"${customLogo}"` : 'null'},
      cta: "${ctaUrl}"
    };

    // Update balance display
    function updateBalance() {
      const balanceElement = document.getElementById('balance');
      if (balanceElement) {
        balanceElement.textContent = balance.toLocaleString();
      }
    }

    // Show win modal
    function showWinModal() {
      const modal = document.getElementById('winModal');
      if (modal) {
        modal.style.display = 'flex';
      }
    }

    // Send configuration to iframe game
    function configureGame() {
      const iframe = document.getElementById('castleSlotFrame');
      if (iframe && iframe.contentWindow) {
        try {
          // Pass configuration to game
          iframe.contentWindow.gameConfig = gameConfig;
          
          // Also try to set via postMessage
          iframe.contentWindow.postMessage({
            type: 'gameConfig',
            config: gameConfig
          }, '*');
          
          console.log('Game configuration sent:', gameConfig);
        } catch (error) {
          console.log('Could not send config to iframe (cross-origin):', error);
        }
      }
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Update initial balance
      updateBalance();
      
      // Listen for messages from the game iframe
      window.addEventListener('message', function(event) {
        console.log('Received message from game:', event.data);
        
        if (event.data && event.data.type === 'showWinPopup') {
          if (!gameWon) {
            gameWon = true;
            showWinModal();
          }
        }
      });
      
      // Claim button event
      const claimBtn = document.getElementById('claimBtn');
      if (claimBtn) {
        claimBtn.addEventListener('click', function() {
          const ctaUrl = this.dataset.ctaUrl;
          window.open(ctaUrl, '_blank');
        });
      }
      
      // Close modal when clicking outside
      const winModal = document.getElementById('winModal');
      if (winModal) {
        winModal.addEventListener('click', function(e) {
          if (e.target === this) {
            this.style.display = 'none';
          }
        });
      }

      // Handle iframe load event
      const iframe = document.getElementById('castleSlotFrame');
      if (iframe) {
        iframe.addEventListener('load', function() {
          console.log('Castle Slot game loaded successfully');
          
          // Wait a bit for the game to initialize, then send config
          setTimeout(() => {
            configureGame();
          }, 1000);
          
          // Try again after 3 seconds in case the first attempt failed
          setTimeout(() => {
            configureGame();
          }, 3000);
        });
        
        iframe.addEventListener('error', function() {
          console.error('Failed to load Castle Slot game');
        });
      }
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
  <!-- Main game container -->
  <div id="gameContainer">
    <!-- Castle Slot game iframe with proper configuration -->
    <iframe 
      id="castleSlotFrame" 
      src="/CastleSlot/index-basic.html" 
      allowfullscreen
      allow="autoplay; fullscreen; gamepad; gyroscope; accelerometer"
      style="width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; z-index: 1;"
    ></iframe>
    
    <!-- Overlay for custom elements -->
    <div class="game-overlay">
      <!-- Custom title overlay -->
      <div class="custom-title">${headline}</div>
      
      <!-- Custom logo overlay (if provided) -->
      ${customLogo ? `<img src="${customLogo}" alt="Logo" class="custom-logo">` : ''}
      
      <!-- Balance display overlay -->
      <div class="balance-overlay">
        💰 <span id="balance">${gameBalance.toLocaleString()}</span>
      </div>
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

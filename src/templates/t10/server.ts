import { BrandConfig } from '@/lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const brandName = brand.brandName || 'Castle Slot'
  const headline = brand.copy?.headline || 'YOUR TITLE HERE'
  const cta = brand.copy?.cta || 'PLAY NOW'
  const ctaUrl = brand.ctaUrl || '#'
  const logoUrl = brand.logoUrl || ''
  const primaryColor = brand.colors?.primary || '#4a90e2'
  const secondaryColor = brand.colors?.secondary || '#7b68ee'
  const accentColor = brand.colors?.accent || '#ffd700'
  const popupTitle = (brand as any).popupTitle || 'WINNER!'
  const popupMessage = (brand as any).popupMessage || 'Congratulations! You\'ve won!'
  const popupPrize = (brand as any).popupPrize || '$1,000 + 50 FREE SPINS'
  const gameBalance = (brand as any).gameBalance || 1000
  const gameCredit = (brand as any).gameCredit || 1000
  const gameTotalBet = (brand as any).gameTotalBet || 20
  const totalWin = (brand as any).totalWin || 0

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #000;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
    }
    
    body::before {
      content: '';
    }
    
    .wrapper {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    /* Stone frame container - Optimized for Complete Game View */
    .game-frame {
      position: relative;
      width: 98%;
      max-width: 1600px;
      height: 96vh;
      background: linear-gradient(145deg, #4a4a4a 0%, #5a5a5a 50%, #4a4a4a 100%);
      border-radius: 15px;
      padding: 8px 15px;
      box-shadow: 
        inset 0 0 30px rgba(0, 0, 0, 0.5),
        0 10px 40px rgba(0, 0, 0, 0.8),
        0 0 0 6px #3a3a3a,
        0 0 0 10px #2a2a2a;
      display: flex;
      flex-direction: column;
    }
    
    /* Stone texture overlay */
    .game-frame::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px);
      border-radius: 20px;
      pointer-events: none;
      opacity: 0.3;
    }
    
    /* Logo header section - Medieval stone banner */
    .logo-header {
      position: relative;
      width: 100%;
      height: 160px;
      background: 
        repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.05) 50px, rgba(0,0,0,0.05) 51px),
        repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.03) 30px, rgba(0,0,0,0.03) 31px),
        linear-gradient(180deg, #757575 0%, #686868 30%, #5a5a5a 50%, #4d4d4d 70%, #404040 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 40px;
      margin-bottom: 0;
      border-radius: 8px 8px 0 0;
      box-shadow: 
        inset 0 3px 15px rgba(255, 255, 255, 0.15),
        inset 0 -3px 15px rgba(0, 0, 0, 0.6),
        inset 4px 0 8px rgba(0, 0, 0, 0.3),
        inset -4px 0 8px rgba(0, 0, 0, 0.3),
        0 4px 15px rgba(0, 0, 0, 0.5);
      z-index: 100;
      border: 4px solid #2a2a2a;
      border-bottom: 2px solid #1a1a1a;
      border-top-color: #555;
      border-left-color: #444;
    }
    
    /* Stone banner decorative corners - carved stone blocks */
    .logo-header::before,
    .logo-header::after {
      content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      background: 
        repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px),
        linear-gradient(135deg, #808080 0%, #606060 50%, #505050 100%);
      border: 3px solid #2a2a2a;
      box-shadow: 
        inset 0 2px 5px rgba(255, 255, 255, 0.2),
        inset 0 -2px 5px rgba(0, 0, 0, 0.6),
        0 4px 8px rgba(0, 0, 0, 0.6);
    }
    
    .logo-header::before {
      top: -15px;
      left: -15px;
      border-radius: 6px 0 6px 0;
      transform: rotate(-2deg);
    }
    
    .logo-header::after {
      top: -15px;
      right: -15px;
      border-radius: 0 6px 0 6px;
      transform: rotate(2deg);
    }
    
    .logo-header img {
      max-height: 130px;
      max-width: 500px;
      width: auto;
      height: auto;
      object-fit: contain;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8));
      position: relative;
      z-index: 2;
    }
    
    .game-title {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    .game-title::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 1px solid rgba(255, 215, 0, 0.3);
      border-radius: 0;
      pointer-events: none;
    }
    
    .nail {
      position: absolute;
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, #3a2817 0%, #1a1207 100%);
      border-radius: 50%;
      border: 2px solid #6b4423;
      box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        0 2px 4px rgba(0, 0, 0, 0.5);
      z-index: 2;
    }
    
    .nail-tl { top: 12px; left: 12px; }
    .nail-tr { top: 12px; right: 12px; }
    .nail-bl { bottom: 12px; left: 12px; }
    .nail-br { bottom: 12px; right: 12px; }
    
    .game-title-logo {
      height: 40px;
      width: auto;
      object-fit: contain;
      cursor: pointer;
      transition: transform 0.3s ease;
      position: relative;
      z-index: 2;
    }
    
    .game-container {
      flex: 1;
      width: 100%;
      position: relative;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #000;
      border-radius: 0 0 12px 12px;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
      min-height: 500px;
      margin-top: 0;
      border-top: 2px solid #1a1a1a;
    }
    
    .game-iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate(-50%, -50%) scale(1.0);
      transform-origin: center center;
    }
    
    @media (min-width: 1400px) {
      .game-iframe {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
    
    @media (min-width: 1800px) {
      .game-iframe {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
    
    @media (max-width: 1200px) {
      .game-iframe {
        transform: translate(-50%, -50%) scale(0.95);
      }
    }
    
    @media (max-width: 768px) {
      .game-iframe {
        transform: translate(-50%, -50%) scale(0.9);
      }
    }
    
    /* Game logo overlays - DISABLED to prevent interference with game */
    .game-logo-overlay {
      display: none !important;
    }
    
    .game-logo-overlay-2 {
      display: none !important;
    }
    
    
    /* Win Modal Styles */
    .win-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(10px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease-in;
    }
    
    .win-modal-overlay.active {
      display: flex;
    }
    
    .win-modal-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 3px solid ${accentColor};
      border-radius: 20px;
      padding: 40px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 
        0 0 50px rgba(255, 215, 0, 0.5),
        inset 0 0 30px rgba(255, 215, 0, 0.1);
      animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      position: relative;
    }
    
    .win-icon {
      font-size: 80px;
      margin-bottom: 20px;
      animation: bounce 1s infinite;
    }
    
    .win-title {
      font-size: 3rem;
      font-weight: bold;
      color: ${accentColor};
      text-shadow: 
        0 0 10px ${accentColor},
        0 0 20px ${accentColor},
        0 0 30px ${accentColor};
      margin-bottom: 20px;
      animation: glow 1.5s ease-in-out infinite;
    }
    
    .win-message {
      font-size: 1.3rem;
      color: #ffffff;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    
    .prize-amount {
      font-size: 2.5rem;
      font-weight: bold;
      color: ${accentColor};
      text-shadow: 0 0 20px ${accentColor};
      margin: 20px 0;
      display: block;
    }
    
    .claim-bonus-btn {
      background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
      color: white;
      border: none;
      padding: 18px 40px;
      font-size: 1.3rem;
      font-weight: bold;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .claim-bonus-btn:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    }
    
    .editor-close-btn {
      margin-top: 15px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from {
        transform: scale(0.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes glow {
      0%, 100% { text-shadow: 0 0 10px ${accentColor}, 0 0 20px ${accentColor}; }
      50% { text-shadow: 0 0 20px ${accentColor}, 0 0 40px ${accentColor}, 0 0 60px ${accentColor}; }
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .game-title h1 {
        font-size: 1.5rem;
      }
      
      .game-title-logo {
        height: 30px;
      }
      
      .win-title {
        font-size: 2rem;
      }
      
      .win-message {
        font-size: 1.1rem;
      }
      
      .prize-amount {
        font-size: 1.8rem;
      }
      
      .claim-bonus-btn {
        font-size: 1.1rem;
        padding: 16px 32px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Stone Frame Container -->
    <div class="game-frame">
      <!-- Casino Brand Logo - Positioned to not interfere with game -->
      ${logoUrl ? `
      <div style="position: relative; z-index: 100; text-align: center; padding: 0.5rem; background: linear-gradient(90deg, rgba(180, 83, 9, 0.9), rgba(146, 64, 14, 0.9)); margin-bottom: 0.5rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.75rem; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(12px); border-radius: 1rem; padding: 0.5rem 1rem; border: 1px solid rgba(255,215,0,0.4); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25); transition: all 0.3s ease; cursor: pointer;" onclick="window.open('${ctaUrl}', '_blank')">
          <div style="background: rgba(255,255,255,0.95); border-radius: 0.5rem; padding: 0.5rem; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
            <img src="${logoUrl}" alt="${brandName} Casino Logo" style="height: 2rem; width: auto; max-width: 10rem; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) brightness(1.1);">
          </div>
          <div style="display: flex; align-items: center; padding: 0.25rem 0.5rem; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.3); border-radius: 9999px; backdrop-filter: blur(4px);">
            <span style="color: #FFD700; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;">🎰 PARTNER</span>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="game-container">
        <iframe 
          src="/CastleSlot/index.html${logoUrl ? '?customLogo=' + encodeURIComponent(logoUrl) : ''}"
          title="Castle Slot Game"
          class="game-iframe"
          frameborder="0"
          allowfullscreen
          id="castleGameFrame"
        ></iframe>
      </div>
    </div>
  </div>


  <!-- Win Modal -->
  <div id="winModal" class="win-modal-overlay">
    <div class="win-modal-content">
      <div class="win-icon">🎉</div>
      <h2 class="win-title">${popupTitle}</h2>
      <p class="win-message">${popupMessage}</p>
      <div>
        <span class="prize-amount">${popupPrize}</span>
      </div>
      <button class="claim-bonus-btn" onclick="window.open('${ctaUrl}', '_blank')">
        🎁 ${cta}
      </button>
      <button class="editor-close-btn" onclick="closePopupPreview()" style="display:none">
        ✕ Close Preview
      </button>
    </div>
  </div>

  <script>
    let clickCount = 0;
    let hasShownModal = false;
    let lastFocusTime = 0;
    let isFirstFocus = true;

    // Pass custom logo to iframe
    window.customGameLogo = '${logoUrl}';
    
    // Block external navigation from iframe
    window.addEventListener('load', function() {
      const iframe = document.querySelector('.game-iframe');
      if (iframe) {
        // Prevent iframe from navigating to external URLs
        iframe.addEventListener('load', function() {
          try {
            // Try to access iframe content (will only work if same-origin)
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Pass logo to iframe
            if (iframe.contentWindow && '${logoUrl}') {
              iframe.contentWindow.customGameLogo = '${logoUrl}';
            }
            
            // Override window.open in iframe
            if (iframe.contentWindow) {
              iframe.contentWindow.open = function() {
                console.log('External navigation blocked');
                return null;
              };
            }
            
            // Block all anchor clicks that go to external URLs
            iframeDoc.addEventListener('click', function(e) {
              const target = e.target.closest('a');
              if (target && target.href && (target.href.includes('envato') || target.href.includes('http'))) {
                e.preventDefault();
                e.stopPropagation();
                console.log('External link blocked:', target.href);
                return false;
              }
            }, true);
          } catch (err) {
            console.log('Cannot access iframe content (cross-origin)');
          }
        });
      }
    });

    // Function to close popup preview
    function closePopupPreview() {
      document.getElementById('winModal').style.display = 'none';
    }

    // Show modal function
    function showWinModal() {
      if (!hasShownModal) {
        const modal = document.getElementById('winModal');
        modal.classList.add('active');
        hasShownModal = true;
        
        // Show close button only in editor preview
        if (window.location.pathname.includes('/editor/')) {
          document.querySelector('.editor-close-btn').style.display = 'block';
        }
      }
    }

    // Track clicks on the iframe
    document.addEventListener('click', function(e) {
      clickCount++;
      if (clickCount >= 3) {
        showWinModal();
      }
    });

    // Track focus events (when user returns to tab)
    window.addEventListener('focus', function() {
      const now = Date.now();
      
      // Skip the first focus event (initial page load)
      if (isFirstFocus) {
        isFirstFocus = false;
        lastFocusTime = now;
        return;
      }
      
      // If more than 2 seconds have passed since last focus, show modal
      if (now - lastFocusTime > 2000) {
        showWinModal();
      }
      
      lastFocusTime = now;
    });

    // Track blur events
    window.addEventListener('blur', function() {
      lastFocusTime = Date.now();
    });

    // Listen for messages from iframe
    window.addEventListener('message', function(event) {
      if (event.data === 'gameClick') {
        clickCount++;
        if (clickCount >= 3) {
          showWinModal();
        }
      }
    });
  </script>
</body>
</html>`

  return {
    html,
    css: ''
  }
}

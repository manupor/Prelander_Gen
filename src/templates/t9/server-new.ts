import { BrandConfig } from '@/lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const brandName = brand.brandName || 'Fisherman Slot'
  const headline = brand.copy?.headline || 'YOUR TITLE HERE'
  const cta = brand.copy?.cta || 'PLAY NOW'
  const ctaUrl = brand.ctaUrl || '#'
  const logoUrl = brand.logoUrl || ''
  const primaryColor = brand.colors?.primary || '#4a90e2'
  const secondaryColor = brand.colors?.secondary || '#7b68ee'
  const accentColor = brand.colors?.accent || '#ffd700'

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
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      overflow: hidden;
    }
    
    .wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 15px;
      gap: 15px;
    }
    
    .game-title {
      text-align: center;
      padding: 15px 20px;
      background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor});
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
    }
    
    .game-title h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 900;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }
    
    .game-container {
      flex: 1;
      background: #000;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      border: 3px solid ${accentColor};
      position: relative;
    }
    
    .game-iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
    
    .brand-logo {
      position: fixed;
      top: 30px;
      left: 30px;
      max-height: 60px;
      max-width: 200px;
      z-index: 1000;
      cursor: pointer;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
    }
    
    .floating-cta {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, ${primaryColor}, ${accentColor});
      border: 3px solid #FFD700;
      border-radius: 50px;
      padding: 18px 36px;
      color: white;
      font-weight: 900;
      font-size: 1.2rem;
      cursor: pointer;
      text-transform: uppercase;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      text-decoration: none;
      display: inline-block;
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
      animation: fadeIn 0.3s ease-out;
    }
    
    .win-modal-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%);
      border: 4px solid ${accentColor};
      border-radius: 30px;
      padding: 50px 40px;
      text-align: center;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.3);
      animation: modalBounce 0.5s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .win-modal-content::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
      animation: rotate 10s linear infinite;
    }
    
    .win-icon {
      font-size: 5rem;
      margin-bottom: 20px;
      animation: bounce 1s infinite;
      position: relative;
      z-index: 1;
    }
    
    .win-title {
      font-size: 3rem;
      font-weight: 900;
      color: ${accentColor};
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 0 0 15px 0;
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5);
      animation: glow 2s ease-in-out infinite;
      position: relative;
      z-index: 1;
    }
    
    .win-message {
      font-size: 1.3rem;
      color: white;
      margin-bottom: 30px;
      position: relative;
      z-index: 1;
    }
    
    .win-prize {
      background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor});
      border-radius: 15px;
      padding: 25px;
      margin: 30px 0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      position: relative;
      z-index: 1;
    }
    
    .prize-label {
      display: block;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    
    .prize-amount {
      display: block;
      font-size: 2.2rem;
      font-weight: 900;
      color: ${accentColor};
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .claim-bonus-btn {
      width: 100%;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      border: 3px solid #ffd700;
      border-radius: 50px;
      padding: 20px 40px;
      font-size: 1.4rem;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 15px;
      box-shadow: 0 10px 30px rgba(34, 197, 94, 0.5);
      transition: all 0.3s ease;
      letter-spacing: 2px;
      position: relative;
      z-index: 1;
      animation: buttonPulse 2s ease-in-out infinite;
    }
    
    .claim-bonus-btn:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 40px rgba(34, 197, 94, 0.7);
      background: linear-gradient(135deg, #16a34a, #15803d);
    }
    
    .close-modal-btn {
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      border: none;
      padding: 10px;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: underline;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    }
    
    .close-modal-btn:hover {
      color: white;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalBounce {
      0% {
        transform: scale(0.3) translateY(-100px);
        opacity: 0;
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5);
      }
      50% {
        text-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8);
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes buttonPulse {
      0%, 100% {
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.5);
      }
      50% {
        box-shadow: 0 10px 40px rgba(34, 197, 94, 0.8), 0 0 50px rgba(255, 215, 0, 0.3);
      }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .game-title h1 {
        font-size: 1.3rem;
      }
      
      .wrapper {
        padding: 10px;
        gap: 10px;
      }
      
      .brand-logo {
        top: 15px;
        left: 15px;
        max-height: 40px;
        max-width: 150px;
      }
      
      .floating-cta {
        bottom: 15px;
        right: 15px;
        padding: 12px 24px;
        font-size: 0.9rem;
      }
      
      .win-modal-content {
        padding: 30px 20px;
      }
      
      .win-icon {
        font-size: 3.5rem;
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
    <div class="game-title">
      <h1>${headline}</h1>
    </div>

    <div class="game-container">
      <iframe 
        src="/FisherMan Slot/index.html"
        title="Fisherman Slot Game"
        class="game-iframe"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>

  ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" class="brand-logo" onclick="window.open('${ctaUrl}', '_blank')">` : ''}
  
  ${ctaUrl !== '#' ? `<a href="${ctaUrl}" target="_blank" class="floating-cta">${cta}</a>` : ''}

  <!-- Win Modal -->
  <div id="winModal" class="win-modal-overlay">
    <div class="win-modal-content">
      <div class="win-icon">🎉</div>
      <h2 class="win-title">WINNER!</h2>
      <p class="win-message">Congratulations! You've won!</p>
      <div class="win-prize">
        <span class="prize-label">YOUR BONUS:</span>
        <span class="prize-amount">$1,000 + 50 FREE SPINS</span>
      </div>
      <button class="claim-bonus-btn" onclick="window.open('${ctaUrl}', '_blank')">
        🎁 CLAIM BONUS NOW!
      </button>
      <button class="close-modal-btn" onclick="closeModal()">
        Continue Playing
      </button>
    </div>
  </div>

  <script>
    let clickCount = 0;
    let hasShownModal = false;
    let lastFocusTime = 0;
    let isFirstFocus = true;

    function closeModal() {
      document.getElementById('winModal').style.display = 'none';
    }

    function detectIframeInteraction() {
      const iframe = document.querySelector('.game-iframe');
      
      if (iframe) {
        let wasFocused = false;
        
        setInterval(function() {
          const isFocused = document.activeElement === iframe;
          
          if (isFocused && !wasFocused && !hasShownModal) {
            const now = Date.now();
            
            if (isFirstFocus) {
              isFirstFocus = false;
              console.log('First focus (initial load) - not counting');
            } else if (now - lastFocusTime > 500) {
              clickCount++;
              console.log('Click detected! Count:', clickCount);
              
              if (clickCount >= 2) {
                document.getElementById('winModal').style.display = 'flex';
                hasShownModal = true;
              }
            }
            
            lastFocusTime = now;
            wasFocused = true;
            
            setTimeout(function() {
              if (document.activeElement === iframe) {
                iframe.blur();
                wasFocused = false;
              }
            }, 200);
          } else if (!isFocused) {
            wasFocused = false;
          }
        }, 100);
      }
    }

    window.addEventListener('load', function() {
      detectIframeInteraction();
    });

    // Fallback: Show modal after 30 seconds
    setTimeout(function() {
      if (!hasShownModal) {
        document.getElementById('winModal').style.display = 'flex';
        hasShownModal = true;
      }
    }, 30000);
  </script>
</body>
</html>`

  const css = ''

  return { html, css }
}

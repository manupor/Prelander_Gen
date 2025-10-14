import { BrandConfig, TemplateRenderResult } from '@/lib/types'

export function renderTemplate(brand: BrandConfig): TemplateRenderResult {
  const brandName = brand.brandName || 'Your Brand'
  const headline = brand.copy?.headline || 'FLY TO WIN!'
  const logoUrl = brand.logoUrl || ''
  const ctaUrl = brand.ctaUrl || '#'
  const cta = brand.copy?.cta || 'CLAIM BONUS'
  const winAmount = brand.copy?.subheadline || '$100'
  
  const colors = {
    primary: brand.colors?.primary || '#FFD700',
    secondary: brand.colors?.secondary || '#1E40AF',
    accent: brand.colors?.accent || '#DC2626'
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - ${headline}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(135deg, ${colors.secondary} 0%, #0F172A 50%, ${colors.accent} 100%);
      overflow-x: hidden;
      position: relative;
    }

    .bg-stars {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), 
                  radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      animation: pulse 4s ease-in-out infinite;
    }

    .logo-container {
      text-align: center;
      padding: 20px;
      background: linear-gradient(90deg, rgba(30, 64, 175, 0.8), rgba(15, 23, 42, 0.8));
      position: relative;
      z-index: 10;
    }

    .logo-wrapper {
      display: inline-block;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
      backdrop-filter: blur(12px);
      border-radius: 1.5rem;
      padding: 1rem;
      border: 2px solid ${colors.primary}40;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .logo-inner {
      background: rgba(255,255,255,0.95);
      border-radius: 1rem;
      padding: 0.75rem;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo-img {
      height: 48px;
      width: auto;
      max-width: 200px;
      display: block;
    }

    .headline {
      text-align: center;
      padding: 20px;
      position: relative;
      z-index: 10;
    }

    .headline h1 {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${colors.primary};
      text-shadow: 0 0 20px ${colors.primary}80, 0 4px 8px rgba(0,0,0,0.5);
      margin: 0;
      letter-spacing: 2px;
    }

    .main-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      gap: 20px;
      position: relative;
      z-index: 10;
      flex-wrap: wrap;
      min-height: 500px;
    }

    .game-area {
      flex: 1 1 500px;
      max-width: 600px;
      height: 400px;
      background: linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(15, 23, 42, 0.5));
      border-radius: 20px;
      border: 3px solid ${colors.primary};
      box-shadow: 0 0 30px ${colors.primary}50, inset 0 0 50px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }

    .sky-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%);
      opacity: 0.6;
    }

    .clouds {
      position: absolute;
      top: 20%;
      left: -10%;
      width: 120%;
      height: 60%;
      background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%);
      animation: moveCloud 20s linear infinite;
    }

    .airplane {
      position: absolute;
      bottom: 10%;
      left: 5%;
      font-size: 4rem;
      transform: rotate(-20deg);
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      animation: flyPlane 13s linear forwards, bounce 0.5s ease-in-out infinite;
    }

    .multiplier {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      font-weight: 900;
      color: ${colors.primary};
      text-shadow: 0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}80, 0 4px 8px rgba(0,0,0,0.8);
      animation: pulse 1s ease-in-out infinite;
    }

    .trajectory {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .video-area {
      flex: 0 0 300px;
      height: 400px;
      position: relative;
    }

    .video-wrapper {
      position: relative;
      height: 100%;
      border-radius: 20px;
      overflow: hidden;
      border: 4px solid ${colors.primary};
      box-shadow: 0 0 30px ${colors.primary}50;
    }

    .video-corner {
      position: absolute;
      width: 20px;
      height: 20px;
      z-index: 2;
    }

    .corner-tl { top: 0; left: 0; border-top: 4px solid ${colors.accent}; border-left: 4px solid ${colors.accent}; }
    .corner-tr { top: 0; right: 0; border-top: 4px solid ${colors.accent}; border-right: 4px solid ${colors.accent}; }
    .corner-bl { bottom: 0; left: 0; border-bottom: 4px solid ${colors.accent}; border-left: 4px solid ${colors.accent}; }
    .corner-br { bottom: 0; right: 0; border-bottom: 4px solid ${colors.accent}; border-right: 4px solid ${colors.accent}; }

    .video-element {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-label {
      position: absolute;
      top: 10px;
      left: 10px;
      background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
      color: #000;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 900;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      z-index: 2;
    }

    .win-modal {
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

    .win-modal.show {
      display: flex;
    }

    .modal-content {
      background: linear-gradient(135deg, ${colors.secondary}, ${colors.accent});
      border: 8px solid ${colors.primary};
      border-radius: 30px;
      padding: 60px 40px;
      text-align: center;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 0 60px ${colors.primary}, inset 0 0 30px rgba(0,0,0,0.3);
      position: relative;
      animation: scaleIn 0.5s ease-out;
    }

    .modal-emoji {
      font-size: 6rem;
      margin-bottom: 20px;
      animation: bounce 1s ease-in-out infinite;
    }

    .modal-title {
      font-size: 4rem;
      font-weight: 900;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 4px;
      margin: 0 0 20px 0;
      text-shadow: 0 0 20px ${colors.primary}, 0 4px 8px rgba(0,0,0,0.8);
      animation: glow 1.5s ease-in-out infinite;
    }

    .prize-box {
      background: rgba(0,0,0,0.5);
      border: 4px solid ${colors.primary};
      border-radius: 20px;
      padding: 30px;
      margin: 30px 0;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }

    .prize-label {
      font-size: 1.2rem;
      color: rgba(255,255,255,0.8);
      margin-bottom: 15px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .prize-amount {
      font-size: 4rem;
      font-weight: 900;
      color: ${colors.primary};
      text-shadow: 0 0 30px ${colors.primary};
      animation: pulse 1s ease-in-out infinite;
    }

    .prize-multiplier {
      font-size: 2rem;
      color: white;
      margin-top: 10px;
      font-weight: bold;
    }

    .claim-button {
      width: 100%;
      background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
      color: #000;
      border: none;
      border-radius: 15px;
      padding: 25px 50px;
      font-size: 2rem;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 8px 16px rgba(0,0,0,0.3), 0 0 30px ${colors.primary}50;
      letter-spacing: 3px;
      transition: all 0.3s ease;
      animation: pulse 2s ease-in-out infinite;
      text-decoration: none;
      display: block;
    }

    .claim-button:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 24px rgba(0,0,0,0.4), 0 0 50px ${colors.primary};
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0) rotate(-20deg); }
      50% { transform: translateY(-10px) rotate(-20deg); }
    }

    @keyframes flyPlane {
      0% { bottom: 10%; left: 5%; }
      100% { bottom: 82%; left: 85%; }
    }

    @keyframes moveCloud {
      0% { transform: translateX(0); }
      100% { transform: translateX(10%); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes glow {
      0%, 100% { text-shadow: 0 0 20px ${colors.primary}, 0 4px 8px rgba(0,0,0,0.8); }
      50% { text-shadow: 0 0 40px ${colors.primary}, 0 0 60px ${colors.primary}, 0 4px 8px rgba(0,0,0,0.8); }
    }

    @media (max-width: 768px) {
      .headline h1 { font-size: 2rem; }
      .game-area { height: 300px; }
      .video-area { flex: 1 1 100%; height: 300px; }
      .airplane { font-size: 3rem; }
      .multiplier { font-size: 3rem; }
      .modal-title { font-size: 2.5rem; }
      .prize-amount { font-size: 3rem; }
    }
  </style>
</head>
<body>
  <div class="bg-stars"></div>

  ${logoUrl ? `
  <div class="logo-container">
    <div class="logo-wrapper">
      <div class="logo-inner">
        <img src="${logoUrl}" alt="${brandName} Casino Logo" class="logo-img">
      </div>
    </div>
  </div>
  ` : ''}

  <div class="headline">
    <h1>${headline}</h1>
  </div>

  <div class="main-content">
    <div class="game-area">
      <div class="sky-gradient"></div>
      <div class="clouds"></div>
      <div class="airplane" id="airplane">✈️</div>
      <div class="multiplier" id="multiplier">1.00x</div>
      <svg class="trajectory">
        <path d="M 0 360 Q 300 200, 600 40" stroke="${colors.primary}" stroke-width="3" fill="none" stroke-dasharray="10 5" opacity="0.5"/>
      </svg>
    </div>

    <div class="video-area">
      <div class="video-wrapper">
        <div class="video-corner corner-tl"></div>
        <div class="video-corner corner-tr"></div>
        <div class="video-corner corner-bl"></div>
        <div class="video-corner corner-br"></div>
        <video id="video" class="video-element" autoplay muted playsinline preload="auto">
          <source src="/images/casino.mp4" type="video/mp4">
        </video>
        <div class="video-label">🎰 LIVE WINNER</div>
      </div>
    </div>
  </div>

  <div class="win-modal" id="winModal">
    <div class="modal-content">
      <div class="modal-emoji">🎉</div>
      <h2 class="modal-title">YOU WON!</h2>
      <div class="prize-box">
        <div class="prize-label">Your Prize:</div>
        <div class="prize-amount">${winAmount}</div>
        <div class="prize-multiplier" id="finalMultiplier">10.00x Multiplier!</div>
      </div>
      <a href="${ctaUrl}" target="_blank" class="claim-button">🎁 ${cta}</a>
    </div>
  </div>

  <script>
    (function() {
      const video = document.getElementById('video');
      const multiplierEl = document.getElementById('multiplier');
      const winModal = document.getElementById('winModal');
      const finalMultiplierEl = document.getElementById('finalMultiplier');

      // Start game
      setTimeout(() => {
        // Play video
        video.play().catch(err => console.error('Video play failed:', err));

        // Animate multiplier
        const duration = 13000;
        const startTime = Date.now();
        const startMultiplier = 1.00;
        const endMultiplier = 10.00;

        function animate() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOutQuad = progress * (2 - progress);
          
          const currentMultiplier = startMultiplier + (endMultiplier - startMultiplier) * easeOutQuad;
          multiplierEl.textContent = currentMultiplier.toFixed(2) + 'x';

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Show win modal
            setTimeout(() => {
              finalMultiplierEl.textContent = currentMultiplier.toFixed(2) + 'x Multiplier!';
              winModal.classList.add('show');
            }, 500);
          }
        }

        animate();
      }, 1000);
    })();
  </script>
</body>
</html>`

  return {
    html,
    css: '' // CSS is inline in the HTML
  }
}

import { BrandConfig } from '@/lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const brandName = brand.brandName || 'Pirates Treasure'
  const headline = brand.copy?.headline || 'SPIN THE WHEEL & WIN BIG!'
  const subheadline = brand.copy?.subheadline || 'Last winner 17 minutes ago'
  const cta = brand.copy?.cta || 'PLAY NOW'
  const ctaUrl = brand.ctaUrl || '#'
  const logoUrl = brand.logoUrl || ''
  const primaryColor = brand.colors?.primary || '#FFD700'
  const secondaryColor = brand.colors?.secondary || '#8B4513'
  const accentColor = brand.colors?.accent || '#FF6B35'
  
  // Popup configuration
  const popupTitle = (brand as any).popupTitle || 'CONGRATULATIONS!'
  const popupMessage = (brand as any).popupMessage || 'You just won "80 FREE SPINS" you can risk again to win "200 SPINS"'
  const popupPrize = (brand as any).popupPrize || '200 FREE SPINS'

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - ${headline}</title>
</head>
<body>
  <div class="container">
    <!-- Hero Section -->
    <div class="hero-section">
      ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" class="logo">` : ''}
      <h1 class="main-title">${headline}</h1>
      <p class="subtitle">${subheadline}</p>
    </div>

    <!-- Wheel Section -->
    <div class="wheel-container">
      <div class="wheel-wrapper">
        <canvas id="wheelCanvas" width="400" height="400"></canvas>
        <button id="spinButton" class="spin-button">
          <span class="spin-text">SPIN</span>
        </button>
      </div>
      <p class="wheel-instruction">Click the wheel to spin and win prizes!</p>
    </div>

    <!-- Benefits Section -->
    <div class="benefits-section">
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 1.svg" alt="Prizes" class="benefit-icon">
        <h3>Get Prizes!</h3>
        <p>Win amazing rewards</p>
      </div>
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 2.svg" alt="Spin" class="benefit-icon">
        <h3>Spin The Wheel</h3>
        <p>More spins, more wins</p>
      </div>
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 3.svg" alt="Games" class="benefit-icon">
        <h3>Your Favorite Games</h3>
        <p>Play what you love</p>
      </div>
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 4.svg" alt="Secure" class="benefit-icon">
        <h3>Safe & Secure</h3>
        <p>Trusted payments</p>
      </div>
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 5.svg" alt="Casino" class="benefit-icon">
        <h3>Trusted Casino</h3>
        <p>Licensed & regulated</p>
      </div>
      <div class="benefit-card">
        <img src="/Pirates Slot/ICON 6.svg" alt="Bonuses" class="benefit-icon">
        <h3>Extra Bonuses</h3>
        <p>Free chances daily</p>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <button class="cta-button" onclick="window.open('${ctaUrl}', '_blank')">
        ${cta}
      </button>
    </div>
  </div>

  <!-- Win Modal -->
  <div id="winModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <img src="/Pirates Slot/pirates treasure.svg" alt="Treasure" class="modal-treasure">
        <h2 class="modal-title">${popupTitle}</h2>
      </div>
      <div class="modal-body">
        <p class="modal-message">${popupMessage}</p>
        <div class="prize-display">
          <div class="prize-badge">
            <span class="prize-amount">${popupPrize}</span>
          </div>
        </div>
        <div class="tips-section">
          <h3>Before getting your prize, here are some useful tips to win big!</h3>
          <ul class="tips-list">
            <li>✓ Take advantage of free chances and money bonuses to win real money</li>
            <li>✓ High payout rates mean high chances of winning</li>
            <li>✓ Play progressive Jackpots for your chance to make millions</li>
            <li>✓ Use the casino's offer money to win big</li>
            <li>✓ Cash out your winnings & enjoy it today!</li>
          </ul>
        </div>
        <p class="unlock-message">You've unlocked the grand prize!</p>
        <p class="lucky-message">You are one of the lucky few who managed to win <strong>${popupPrize}</strong> *for the first deposit*</p>
      </div>
      <div class="modal-footer">
        <button class="claim-button" onclick="window.open('${ctaUrl}', '_blank')">
          🎁 CLAIM YOUR PRIZE!
        </button>
        <button class="close-preview-btn" onclick="closeModal()" style="display:none">
          ✕ Close Preview
        </button>
      </div>
    </div>
  </div>

  <script>
    // Wheel configuration
    const prizes = [
      { text: '50 SPINS', color: '#FFD700', value: 50 },
      { text: '100 SPINS', color: '#FF6B35', value: 100 },
      { text: '25 SPINS', color: '#4ECDC4', value: 25 },
      { text: '200 SPINS', color: '#FF1744', value: 200 },
      { text: '75 SPINS', color: '#9C27B0', value: 75 },
      { text: '150 SPINS', color: '#00BCD4', value: 150 },
      { text: '10 SPINS', color: '#FFC107', value: 10 },
      { text: '500 SPINS', color: '#4CAF50', value: 500 }
    ];

    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    
    let currentRotation = 0;
    let isSpinning = false;
    let hasSpun = false;

    // Draw wheel
    function drawWheel() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 180;
      const sliceAngle = (2 * Math.PI) / prizes.length;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(currentRotation);

      prizes.forEach((prize, index) => {
        const startAngle = index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(prize.text, radius * 0.7, 5);
        ctx.restore();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      // Draw pointer
      ctx.beginPath();
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX - 15, 50);
      ctx.lineTo(centerX + 15, 50);
      ctx.closePath();
      ctx.fillStyle = '#FF1744';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Spin wheel
    function spinWheel() {
      if (isSpinning) return;
      
      isSpinning = true;
      hasSpun = true;
      spinButton.disabled = true;
      spinButton.style.opacity = '0.6';

      const spinDuration = 4000;
      const spins = 5 + Math.random() * 3;
      const targetRotation = currentRotation + (spins * 2 * Math.PI);
      const startTime = Date.now();
      const startRotation = currentRotation;

      function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentRotation = startRotation + (targetRotation - startRotation) * easeOut;

        drawWheel();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isSpinning = false;
          spinButton.disabled = false;
          spinButton.style.opacity = '1';
          
          // Show modal after spin
          setTimeout(() => {
            document.getElementById('winModal').style.display = 'flex';
          }, 500);
        }
      }

      animate();
    }

    // Initialize
    drawWheel();
    spinButton.addEventListener('click', spinWheel);
    canvas.addEventListener('click', spinWheel);

    // Modal functions
    function closeModal() {
      document.getElementById('winModal').style.display = 'none';
      window.parent.postMessage('closePopup', '*');
    }

    // Listen for preview message from editor
    window.addEventListener('message', function(event) {
      if (event.data === 'showPopup') {
        const modal = document.getElementById('winModal');
        const closeBtn = document.querySelector('.close-preview-btn');
        if (modal) modal.style.display = 'flex';
        if (closeBtn) closeBtn.style.display = 'block';
      }
    });

    // Auto-show modal after 10 seconds if not spun
    setTimeout(() => {
      if (!hasSpun) {
        document.getElementById('winModal').style.display = 'flex';
      }
    }, 10000);
  </script>
</body>
</html>
`;

  const css = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, rgba(255,215,0,0.1) 0%, transparent 100%);
  border-radius: 20px;
  margin-bottom: 40px;
}

.logo {
  max-width: 200px;
  height: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-shadow: 0 4px 20px rgba(255,215,0,0.3);
  animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.subtitle {
  font-size: 1.2rem;
  color: ${accentColor};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Wheel Section */
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0;
  padding: 40px 20px;
  background: rgba(255,255,255,0.05);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.wheel-wrapper {
  position: relative;
  margin-bottom: 30px;
}

#wheelCanvas {
  display: block;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5));
  cursor: pointer;
  transition: transform 0.3s ease;
}

#wheelCanvas:hover {
  transform: scale(1.05);
}

.spin-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
  border: 5px solid #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  box-shadow: 0 4px 20px rgba(255,215,0,0.5);
  transition: all 0.3s ease;
  z-index: 10;
}

.spin-button:hover:not(:disabled) {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 30px rgba(255,215,0,0.7);
}

.spin-button:active:not(:disabled) {
  transform: translate(-50%, -50%) scale(0.95);
}

.spin-button:disabled {
  cursor: not-allowed;
}

.wheel-instruction {
  font-size: 1.1rem;
  color: ${primaryColor};
  font-weight: 600;
  text-align: center;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Benefits Section */
.benefits-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin: 60px 0;
}

.benefit-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
}

.benefit-card:hover {
  transform: translateY(-10px);
  border-color: ${primaryColor};
  box-shadow: 0 10px 40px rgba(255,215,0,0.3);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.benefit-card h3 {
  font-size: 1.3rem;
  color: ${primaryColor};
  margin-bottom: 10px;
  font-weight: 700;
}

.benefit-card p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.8);
}

/* CTA Section */
.cta-section {
  text-align: center;
  margin: 60px 0;
}

.cta-button {
  background: linear-gradient(135deg, ${accentColor} 0%, #FF1744 100%);
  color: #fff;
  border: none;
  padding: 20px 60px;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(255,107,53,0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.cta-button:hover::before {
  width: 300px;
  height: 300px;
}

.cta-button:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 50px rgba(255,107,53,0.7);
}

.cta-button:active {
  transform: scale(0.95);
}

/* Modal */
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  border: 3px solid ${primaryColor};
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  text-align: center;
  padding: 30px 30px 20px;
  border-bottom: 2px solid rgba(255,215,0,0.3);
}

.modal-treasure {
  width: 120px;
  height: auto;
  margin-bottom: 20px;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.modal-title {
  font-size: 2.5rem;
  color: ${primaryColor};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 4px 10px rgba(255,215,0,0.5);
}

.modal-body {
  padding: 30px;
}

.modal-message {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
  color: rgba(255,255,255,0.9);
}

.prize-display {
  text-align: center;
  margin: 30px 0;
}

.prize-badge {
  display: inline-block;
  background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255,215,0,0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.prize-amount {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.tips-section {
  background: rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
}

.tips-section h3 {
  font-size: 1.1rem;
  color: ${primaryColor};
  margin-bottom: 15px;
  text-align: center;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  padding: 8px 0;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
}

.unlock-message {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${accentColor};
  margin: 20px 0 10px;
}

.lucky-message {
  text-align: center;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 20px;
}

.lucky-message strong {
  color: ${primaryColor};
  font-weight: 900;
}

.modal-footer {
  padding: 20px 30px 30px;
  text-align: center;
}

.claim-button {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: #fff;
  border: none;
  padding: 18px 50px;
  font-size: 1.3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(76,175,80,0.5);
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 15px;
}

.claim-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(76,175,80,0.7);
}

.claim-button:active {
  transform: translateY(0);
}

.close-preview-btn {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-preview-btn:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  #wheelCanvas {
    width: 300px;
    height: 300px;
  }

  .spin-button {
    width: 80px;
    height: 80px;
    font-size: 1rem;
  }

  .benefits-section {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .benefit-icon {
    width: 60px;
    height: 60px;
  }

  .cta-button {
    padding: 15px 40px;
    font-size: 1.2rem;
  }

  .modal-title {
    font-size: 2rem;
  }

  .prize-amount {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  #wheelCanvas {
    width: 250px;
    height: 250px;
  }

  .spin-button {
    width: 70px;
    height: 70px;
    font-size: 0.9rem;
  }

  .benefits-section {
    grid-template-columns: 1fr;
  }
}
`;

  return { html, css };
}

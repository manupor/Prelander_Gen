import { BrandConfig, TemplateRenderResult } from '@/lib/types'

export function renderTemplate(brand: BrandConfig): TemplateRenderResult {
  const brandName = brand.brandName || 'Your Brand'
  const headline = brand.copy?.headline || 'SCRATCH & WIN'
  const logoUrl = brand.logoUrl || ''
  const ctaUrl = brand.ctaUrl || '#'
  const cta = brand.copy?.cta || 'CLAIM YOUR PRIZE!'
  
  const colors = {
    primary: brand.colors?.primary || '#FFD700',
    secondary: brand.colors?.secondary || '#8B5A2B',
    accent: brand.colors?.accent || '#8B0000'
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - Scratch & Win</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: Arial, sans-serif;
      background: 
        repeating-linear-gradient(90deg, ${colors.secondary} 0px, #654321 2px, ${colors.secondary} 4px, #654321 6px),
        radial-gradient(circle at 50% 50%, ${colors.accent} 0%, #4B0000 100%);
      background-size: 6px 100%, 100%;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    
    .header {
      width: 100%;
      padding: 20px 30px;
      background: 
        linear-gradient(90deg, rgba(139, 90, 43, 0.95), rgba(101, 67, 33, 0.95)),
        repeating-linear-gradient(90deg, #8B5A2B 0px, #654321 2px, #8B5A2B 4px, #654321 6px);
      background-size: 100%, 6px 100%;
      box-shadow: inset 0 4px 8px rgba(255, 255, 255, 0.1), inset 0 -4px 8px rgba(0, 0, 0, 0.3);
      border-bottom: 6px solid #4a3219;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    
    .logo { max-height: 50px; max-width: 150px; }
    
    .title {
      font-size: 3rem;
      font-weight: 900;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 5px;
      text-shadow: 0 2px 0 #654321, 0 4px 0 #4a3219, 0 6px 10px rgba(0, 0, 0, 0.8);
      margin: 0;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      gap: 30px;
      min-height: calc(100vh - 100px);
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      max-width: 900px;
      width: 100%;
      margin: 0 auto;
    }
    
    .box {
      aspect-ratio: 1;
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
    
    .prize {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, ${colors.accent} 0%, #4B0000 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .prize-icon { font-size: 3rem; }
    
    .prize-text {
      font-size: 1.5rem;
      font-weight: 900;
      color: ${colors.primary};
      text-align: center;
    }
    
    .canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
    }
    
    .instruction {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${colors.primary};
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    
    .modal-content {
      background: 
        repeating-linear-gradient(90deg, #8B5A2B 0px, #654321 2px, #8B5A2B 4px, #654321 6px),
        #5a3a1a;
      background-size: 6px 100%, 100%;
      border: 8px solid #3d2914;
      border-radius: 15px;
      padding: 50px 40px;
      text-align: center;
      max-width: 600px;
      width: 90%;
      box-shadow: inset 0 0 0 3px #8B5A2B, 0 20px 60px rgba(0, 0, 0, 0.9);
    }
    
    .modal-icon { font-size: 5rem; margin-bottom: 20px; }
    
    .modal-title {
      font-size: 3.5rem;
      font-weight: 900;
      color: ${colors.primary};
      text-transform: uppercase;
      letter-spacing: 4px;
      margin: 0 0 15px 0;
      text-shadow: 0 2px 0 #654321, 0 4px 0 #4a3219;
    }
    
    .modal-message { font-size: 1.3rem; color: white; margin-bottom: 30px; }
    
    .prize-box {
      background: #2d1810;
      border: 4px solid #654321;
      border-radius: 10px;
      padding: 25px;
      margin: 30px 0;
    }
    
    .prize-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
      margin-top: 15px;
    }
    
    .mini-prize {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 10px;
      background: rgba(255, 215, 0, 0.1);
      border-radius: 8px;
      color: ${colors.primary};
      font-weight: 700;
    }
    
    .btn {
      width: 100%;
      background: ${colors.primary};
      color: #2d1810;
      border: 4px solid #8B5A2B;
      border-radius: 10px;
      padding: 20px 40px;
      font-size: 1.5rem;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      letter-spacing: 3px;
    }
    
    /* Comprehensive Responsive Design */
    @media (max-width: 1024px) {
      .container { padding: 1.5rem; }
      .title { font-size: 2.5rem; }
    }
    
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      .title { font-size: 2rem; }
      .grid { gap: 15px; }
      .prize-icon { font-size: 2rem; }
      .prize-text { font-size: 1.2rem; }
    }
    
    @media (max-width: 600px) {
      .container { padding: 0.75rem; }
      .title { font-size: 1.8rem; }
      .grid { gap: 12px; }
      .prize-icon { font-size: 1.8rem; }
      .prize-text { font-size: 1.1rem; }
    }
    
    @media (max-width: 480px) {
      .container { padding: 0.5rem; }
      .title { font-size: 1.5rem; line-height: 1.2; }
      .grid { gap: 10px; }
      .prize-icon { font-size: 1.5rem; }
      .prize-text { font-size: 1rem; }
    }
    
    @media (max-width: 360px) {
      .title { font-size: 1.3rem; }
      .grid { gap: 8px; }
      .prize-icon { font-size: 1.3rem; }
      .prize-text { font-size: 0.9rem; }
    }
  </style>
</head>
<body>
  <!-- Casino Brand Logo - Perfect for iGaming Affiliates -->
  ${logoUrl ? `
  <div style="text-align: center; padding: 20px; background: linear-gradient(90deg, rgba(139, 90, 43, 0.8), rgba(101, 67, 33, 0.8));">
    <div style="display: inline-block; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(12px); border-radius: 1.5rem; padding: 1rem; border: 2px solid rgba(255,215,0,0.4); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); transition: all 0.3s ease; cursor: pointer;" onclick="window.open('${ctaUrl}', '_blank')">
      <div style="background: rgba(255,255,255,0.95); border-radius: 1rem; padding: 0.75rem; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
        <img src="${logoUrl}" alt="${brandName} Casino Logo" style="height: 4rem; width: auto; max-width: 15rem; object-fit: contain; margin: 0 auto; display: block; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.1);">
      </div>
    </div>
    <div style="margin-top: 0.75rem;">
      <div style="display: inline-flex; align-items: center; padding: 0.25rem 1rem; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.3); border-radius: 9999px; backdrop-filter: blur(4px);">
        <span style="color: #FFD700; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;">🎰 OFFICIAL PARTNER</span>
      </div>
    </div>
  </div>
  ` : ''}
  
  <div class="header">
    <h1 class="title">${headline}</h1>
  </div>

  <div class="container">
    <div class="grid" id="grid"></div>
    <div class="instruction">
      <span style="font-size: 2rem;">🪙</span>
      Scratch to reveal your prizes!
    </div>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content">
      <div class="modal-icon">🎉</div>
      <h2 class="modal-title">WINNER!</h2>
      <p class="modal-message">You matched 3 symbols!</p>
      <div class="prize-box">
        <span style="color: rgba(255,255,255,0.8); font-size: 1rem; letter-spacing: 2px; text-transform: uppercase;">Your Prize:</span>
        <div class="prize-grid" id="prizeGrid"></div>
      </div>
      <button class="btn" onclick="window.open('${ctaUrl}', '_blank')">🎁 ${cta}</button>
    </div>
  </div>

  <script>
    const prizes = ['$500', '$1000', '$5000', '100 FREE SPINS', '200 FREE SPINS', '$10000'];
    const icons = ['💎', '🎰', '🏆', '⭐', '💰', '🎁'];
    const boxes = [];
    let isScratching = false;
    let winningPrize = '';
    let hasWon = false;

    function init() {
      const grid = document.getElementById('grid');
      
      // Seleccionar un premio ganador
      const winnerPrize = prizes[Math.floor(Math.random() * prizes.length)];
      const winnerIcon = icons[Math.floor(Math.random() * icons.length)];
      winningPrize = winnerPrize;
      
      // Crear cajas con al menos 3 del premio ganador
      const tempBoxes = [];
      
      // Agregar 3 cajas ganadoras
      for (let i = 0; i < 3; i++) {
        tempBoxes.push({
          id: i,
          scratched: 0,
          prize: winnerPrize,
          icon: winnerIcon
        });
      }
      
      // Agregar 6 cajas con otros premios
      for (let i = 3; i < 9; i++) {
        tempBoxes.push({
          id: i,
          scratched: 0,
          prize: prizes[Math.floor(Math.random() * prizes.length)],
          icon: icons[Math.floor(Math.random() * icons.length)]
        });
      }
      
      // Mezclar las cajas
      for (let i = tempBoxes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempBoxes[i], tempBoxes[j]] = [tempBoxes[j], tempBoxes[i]];
        tempBoxes[i].id = i;
        tempBoxes[j].id = j;
      }
      
      console.log('🎰 PREMIOS GENERADOS:');
      console.log('Premio ganador:', winnerPrize, winnerIcon);
      console.log('Todas las cajas:', tempBoxes.map(b => ({ id: b.id, prize: b.prize, icon: b.icon })));
      
      // Crear elementos del DOM
      for (let i = 0; i < 9; i++) {
        const box = tempBoxes[i];
        boxes.push(box);

        const boxEl = document.createElement('div');
        boxEl.className = 'box';
        boxEl.innerHTML = \`
          <div class="prize">
            <div class="prize-icon">\${box.icon}</div>
            <div class="prize-text">\${box.prize}</div>
          </div>
          <canvas class="canvas" data-index="\${i}"></canvas>
        \`;
        grid.appendChild(boxEl);
      }

      setTimeout(() => {
        document.querySelectorAll('.canvas').forEach((canvas, index) => {
          initCanvas(canvas, index);
        });
      }, 100);
    }

    function initCanvas(canvas, index) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.5, '#FFA500');
      gradient.addColorStop(1, '#FFD700');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.addEventListener('mousedown', () => isScratching = true);
      canvas.addEventListener('mouseup', () => isScratching = false);
      canvas.addEventListener('mouseleave', () => isScratching = false);
      canvas.addEventListener('mousemove', (e) => {
        if (isScratching) handleScratch(e, canvas, index);
      });
      canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isScratching = true; });
      canvas.addEventListener('touchend', () => isScratching = false);
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleScratch(e.touches[0], canvas, index);
      });
    }

    function handleScratch(e, canvas, index) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || e.pageX;
      const clientY = e.clientY || e.pageY;
      
      // Calcular coordenadas relativas al canvas
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const scratchedPercent = (transparent / (pixels.length / 4)) * 100;
      boxes[index].scratched = scratchedPercent;

      checkWinCondition();
    }

    function checkWinCondition() {
      if (hasWon) return; // Ya ganó
      
      // Filtrar cajas que están rascadas más del 50%
      const scratchedBoxes = boxes.filter(box => box.scratched > 50);
      
      console.log('Cajas rascadas (>50%):', scratchedBoxes.length);
      console.log('Detalles:', scratchedBoxes.map(b => ({ id: b.id, prize: b.prize, scratched: b.scratched.toFixed(1) })));
      
      // Cuando el jugador raspe 3 cajas, gana automáticamente
      if (scratchedBoxes.length >= 3) {
        // Contar ocurrencias de cada premio
        const prizeCount = {};
        scratchedBoxes.forEach(box => {
          prizeCount[box.prize] = (prizeCount[box.prize] || 0) + 1;
        });
        
        console.log('Conteo de premios:', prizeCount);
        
        // Encontrar el premio que más se repite (sabemos que hay al menos 3 iguales)
        let winnerPrize = '';
        let maxCount = 0;
        for (const [prize, count] of Object.entries(prizeCount)) {
          if (count > maxCount) {
            maxCount = count;
            winnerPrize = prize;
          }
        }
        
        console.log('¡GANADOR! Premio:', winnerPrize);
        hasWon = true;
        winningPrize = winnerPrize;
        setTimeout(() => {
          console.log('Mostrando modal...');
          showModal();
        }, 300);
      }
    }

    function showModal() {
      const modal = document.getElementById('modal');
      const prizeGrid = document.getElementById('prizeGrid');
      const winningBoxes = boxes.filter(b => b.prize === winningPrize && b.scratched > 50).slice(0, 3);
      
      prizeGrid.innerHTML = \`
        <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px;">
          \${winningBoxes.map(box => \`<div style="font-size: 3rem;">\${box.icon}</div>\`).join('')}
        </div>
        <div style="font-size: 2.5rem; font-weight: 900; color: #FFD700; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8); margin-top: 10px;">
          \${winningPrize}
        </div>
      \`;
      modal.style.display = 'flex';
    }

    window.addEventListener('load', init);
  </script>
</body>
</html>`

  return { html, css: '' }
}

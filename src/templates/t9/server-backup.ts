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
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    
    .game-title {
      width: 100%;
      max-width: 1200px;
      text-align: center;
      padding: 20px;
      background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor});
      border-radius: 15px;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .game-title h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 900;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }
    
    .game-container {
      width: 100%;
      max-width: 1200px;
      height: 80vh;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      border: 3px solid ${accentColor};
    }
    
    .game-iframe {
      width: 100%;
      height: 100%;
      border: none;
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
  </style>
</head>
<body>
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

  ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" class="brand-logo" onclick="window.open('${ctaUrl}', '_blank')">` : ''}
  
  ${ctaUrl !== '#' ? `<a href="${ctaUrl}" target="_blank" class="floating-cta">${cta}</a>` : ''}
</body>
</html>`

  const css = ''

  return { html, css }
}

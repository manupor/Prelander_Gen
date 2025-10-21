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
      font-family: Arial, sans-serif;
      background: 
        repeating-linear-gradient(90deg, 
          #8B5A2B 0px, 
          #654321 2px, 
          #8B5A2B 4px, 
          #654321 6px
        ),
        #4a3219;
      background-size: 6px 100%, 100%;
      min-height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: relative;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        repeating-linear-gradient(0deg,
          transparent 0px,
          rgba(0, 0, 0, 0.03) 1px,
          transparent 2px,
          transparent 4px
        );
      pointer-events: none;
    }
    
    .wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 960px; /* Fixed width to match game */
      max-width: 100%;
      padding: 0;
      margin: 0 auto; /* Center the wrapper */
      gap: 0;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .game-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 40px 32px; /* Much more padding for bigger banner */
      background: 
        linear-gradient(90deg, rgba(139, 90, 43, 0.95), rgba(101, 67, 33, 0.95)),
        repeating-linear-gradient(90deg, 
          #8B5A2B 0px, 
          #654321 2px, 
          #8B5A2B 4px, 
          #654321 6px
        );
      background-size: 100%, 6px 100%;
      box-shadow: 
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        inset 0 -2px 4px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.4); /* Added external shadow */
      border-bottom: 6px solid #4a3219; /* Thicker border */
      border-radius: 0;
      flex-shrink: 0;
      min-height: 140px; /* Much bigger height */
      position: relative;
      z-index: 1000;
    }
    
    .game-title::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 1px solid rgba(255, 215, 0, 0.3);
      border-radius: 8px;
      pointer-events: none;
    }
    
    .game-title::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        repeating-linear-gradient(0deg,
          transparent 0px,
          rgba(0, 0, 0, 0.03) 1px,
          transparent 2px,
          transparent 4px
        );
      pointer-events: none;
      border-radius: 8px;
    }
    
    .game-title-logo {
      max-height: 60px; /* Slightly smaller to fit new layout */
      max-width: 200px; 
      cursor: pointer;
      filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7)); /* Stronger shadow */
      flex-shrink: 0;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 2;
      transition: transform 0.3s ease; /* Smooth hover effect */
    }
    
    .game-title-logo:hover {
      transform: scale(1.05); /* Slight grow on hover */
    }
    
    /* Decorative metal nails/rivets */
    .game-title .nail {
      position: absolute;
      width: 14px;
      height: 14px;
      background: radial-gradient(circle at 30% 30%, #888, #333);
      border-radius: 50%;
      box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.5),
        0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .game-title .nail-tl { top: 12px; left: 12px; }
    .game-title .nail-tr { top: 12px; right: 12px; }
    .game-title .nail-bl { bottom: 12px; left: 12px; }
    .game-title .nail-br { bottom: 12px; right: 12px; }
    
    .game-title h1 {
      margin: 0;
      font-size: 3.5rem; /* Much bigger title */
      font-weight: 900;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 6px; /* More spacing */
      text-shadow: 
        0 3px 0 #654321,
        0 6px 0 #4a3219,
        0 9px 0 #3d2914,
        0 12px 20px rgba(0, 0, 0, 0.9), /* Stronger shadow */
        0 0 40px rgba(255, 215, 0, 0.8), /* Brighter glow */
        0 0 80px rgba(255, 215, 0, 0.5); /* Extended glow */
      text-align: center;
      position: relative;
      z-index: 1;
      font-family: 'Arial Black', sans-serif;
      line-height: 1;
      animation: titleGlow 3s ease-in-out infinite alternate; /* Add animation */
    }
    
    .game-subtitle {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #FFA500;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 
        0 1px 0 #654321,
        0 2px 0 #4a3219,
        0 4px 8px rgba(0, 0, 0, 0.7),
        0 0 20px rgba(255, 165, 0, 0.6);
      text-align: center;
      position: relative;
      z-index: 1;
      font-family: 'Arial', sans-serif;
      line-height: 1.2;
      opacity: 0.95;
    }
    
    .game-container {
      flex: 1;
      width: 100%;
      background: #000; /* Pure black background */
      border-radius: 0;
      overflow: hidden;
      box-shadow: none;
      border: none;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
      margin-bottom: 0;
      padding: 0; /* No padding - frame is part of iframe */
    }
    
    .game-frame {
      position: relative;
      width: 960px; /* Fixed game width */
      height: 540px; /* Fixed game height (16:9 ratio) */
      max-width: 100%;
      max-height: 100%;
      background: 
        repeating-linear-gradient(90deg, 
          #8B5A2B 0px, 
          #654321 2px, 
          #8B5A2B 4px, 
          #654321 6px
        ),
        #4a3219;
      background-size: 6px 100%, 100%;
      border-radius: 15px;
      padding: 15px;
      box-shadow: 
        inset 0 0 0 3px #654321,
        inset 0 0 0 6px #8B5A2B,
        inset 0 0 0 8px #654321,
        0 10px 30px rgba(0, 0, 0, 0.8),
        0 0 0 2px #2d1810;
      overflow: hidden;
      transform-origin: center;
      transition: transform 0.3s ease-out; /* Smooth scaling transition */
    }
    
    .game-frame::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 2px solid rgba(139, 90, 43, 0.6);
      border-radius: 8px;
      pointer-events: none;
      z-index: 1;
    }
    
    .game-frame::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        repeating-linear-gradient(0deg,
          transparent 0px,
          rgba(0, 0, 0, 0.03) 1px,
          transparent 2px,
          transparent 4px
        );
      pointer-events: none;
      border-radius: 15px;
      z-index: 1;
    }
    
    /* Decorative wooden frame corners */
    .frame-corner {
      position: absolute;
      width: 25px;
      height: 25px;
      background: radial-gradient(circle at 30% 30%, #8B5A2B, #4a3219);
      border: 2px solid #2d1810;
      z-index: 2;
    }
    
    .frame-corner::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #2d1810;
      border-radius: 50%;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2);
    }
    
    .corner-tl { 
      top: 5px; 
      left: 5px; 
      border-radius: 50% 15% 50% 50%;
    }
    .corner-tr { 
      top: 5px; 
      right: 5px; 
      border-radius: 15% 50% 50% 50%;
    }
    .corner-bl { 
      bottom: 5px; 
      left: 5px; 
      border-radius: 50% 50% 50% 15%;
    }
    .corner-br { 
      bottom: 5px; 
      right: 5px; 
      border-radius: 50% 50% 15% 50%;
    }
    
    .footer {
      width: 100%;
      padding: 12px 20px;
      background: 
        linear-gradient(90deg, rgba(139, 90, 43, 0.95), rgba(101, 67, 33, 0.95)),
        repeating-linear-gradient(90deg, 
          #8B5A2B 0px, 
          #654321 2px, 
          #8B5A2B 4px, 
          #654321 6px
        );
      background-size: 100%, 6px 100%;
      box-shadow: 
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        inset 0 -2px 4px rgba(0, 0, 0, 0.3);
      border-top: 4px solid #4a3219;
      flex-shrink: 0;
      position: relative;
      z-index: 1000;
      text-align: center;
    }
    
    .footer::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      right: 6px;
      bottom: 6px;
      border: 1px solid rgba(255, 215, 0, 0.3);
      border-radius: 6px;
      pointer-events: none;
    }
    
    .footer-content {
      position: relative;
      z-index: 1;
    }
    
    .footer-content p {
      margin: 0;
      font-size: 0.75rem;
      color: rgba(255, 215, 0, 0.9);
      line-height: 1.4;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .footer-content a {
      color: #FFD700;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
    }
    
    .footer-content a:hover {
      color: #FFF;
      text-decoration: underline;
    }
    
    .footer .nail {
      position: absolute;
      width: 10px;
      height: 10px;
      background: radial-gradient(circle at 30% 30%, #888, #333);
      border-radius: 50%;
      box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.5),
        0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .footer .nail-tl { top: 8px; left: 8px; }
    .footer .nail-tr { top: 8px; right: 8px; }
    .footer .nail-bl { bottom: 8px; left: 8px; }
    .footer .nail-br { bottom: 8px; right: 8px; }
    
    .game-iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      position: relative;
      z-index: 0;
      background: transparent;
      border-radius: 8px;
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
      background: 
        repeating-linear-gradient(90deg, 
          #8B5A2B 0px, 
          #654321 2px, 
          #8B5A2B 4px, 
          #654321 6px
        ),
        #5a3a1a;
      background-size: 6px 100%, 100%;
      border: 8px solid #3d2914;
      border-radius: 15px;
      padding: 30px 40px;
      text-align: center;
      max-width: 800px; /* Wider for horizontal layout */
      width: 90%;
      box-shadow: 
        inset 0 0 0 3px #8B5A2B,
        inset 0 0 0 5px #654321,
        0 20px 60px rgba(0, 0, 0, 0.9),
        0 0 0 2px #2d1810;
      animation: modalBounce 0.5s ease-out;
      position: relative;
      overflow: visible;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 30px;
    }
    
    .win-modal-content::before {
      content: '';
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border: 2px solid rgba(139, 90, 43, 0.6);
      border-radius: 8px;
      pointer-events: none;
      z-index: 0;
    }
    
    .win-modal-content .nail {
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle at 35% 35%, #999, #222);
      border-radius: 50%;
      border: 2px solid #1a1a1a;
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px rgba(0, 0, 0, 0.6),
        0 3px 6px rgba(0, 0, 0, 0.7);
      z-index: 10;
    }
    
    .win-modal-content .nail::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 4px;
      background: #444;
      border-radius: 50%;
    }
    
    .win-modal-content .nail-tl { top: 12px; left: 12px; }
    .win-modal-content .nail-tr { top: 12px; right: 12px; }
    .win-modal-content .nail-bl { bottom: 12px; left: 12px; }
    .win-modal-content .nail-br { bottom: 12px; right: 12px; }
    
    .win-left-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .win-right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .win-icon {
      font-size: 4rem;
      margin-bottom: 15px;
      animation: bounce 1s infinite;
      position: relative;
      z-index: 1;
    }
    
    .win-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 0 0 10px 0;
      text-shadow: 
        0 2px 0 #654321,
        0 4px 0 #4a3219,
        0 6px 10px rgba(0, 0, 0, 0.8),
        0 0 30px rgba(255, 215, 0, 0.6);
      font-family: 'Arial Black', sans-serif;
      position: relative;
      z-index: 1;
    }
    
    .win-message {
      font-size: 1.1rem;
      color: white;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }
    
    .win-prize {
      background: #2d1810;
      border: 4px solid #654321;
      border-radius: 10px;
      padding: 25px;
      margin: 30px 0;
      box-shadow: 
        inset 0 0 0 2px #8B5A2B,
        0 8px 20px rgba(0, 0, 0, 0.7);
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
      background: #d4af37;
      color: #2d1810;
      border: 4px solid #8B5A2B;
      border-radius: 10px;
      padding: 20px 40px;
      font-size: 1.5rem;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      margin-bottom: 15px;
      box-shadow: 
        inset 0 0 0 2px #ffd700,
        0 8px 20px rgba(0, 0, 0, 0.6);
      transition: all 0.3s ease;
      letter-spacing: 3px;
      position: relative;
      z-index: 1;
      font-family: 'Arial Black', sans-serif;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    }
    
    .claim-bonus-btn:hover {
      transform: translateY(-3px);
      background: #ffd700;
      box-shadow: 
        inset 0 0 0 2px #d4af37,
        0 12px 25px rgba(0, 0, 0, 0.7);
    }
    
    .editor-close-btn {
      width: 100%;
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      padding: 10px 20px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    }
    
    .editor-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-color: rgba(255, 255, 255, 0.4);
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
    
    @keyframes titleGlow {
      0% {
        text-shadow: 
          0 2px 0 #654321,
          0 4px 0 #4a3219,
          0 6px 0 #3d2914,
          0 8px 16px rgba(0, 0, 0, 0.8),
          0 0 30px rgba(255, 215, 0, 0.7),
          0 0 50px rgba(255, 215, 0, 0.4);
      }
      100% {
        text-shadow: 
          0 2px 0 #654321,
          0 4px 0 #4a3219,
          0 6px 0 #3d2914,
          0 8px 16px rgba(0, 0, 0, 0.8),
          0 0 40px rgba(255, 215, 0, 0.9),
          0 0 70px rgba(255, 215, 0, 0.6),
          0 0 100px rgba(255, 215, 0, 0.3);
      }
    }
    
    /* Optimized mobile-first responsive scaling */
    @media (max-width: 1200px) {
      .game-frame {
        transform: scale(0.95);
      }
    }
    
    @media (max-width: 1024px) {
      .game-frame {
        transform: scale(0.9);
      }
    }
    
    @media (max-width: 900px) {
      .game-frame {
        transform: scale(0.85);
      }
    }
    
    @media (max-width: 768px) {
      .wrapper {
        width: 100%;
        margin: 0;
      }
      
      .game-container {
        padding: 10px; /* Reduce padding for more space */
      }
      
      .game-frame {
        transform: scale(0.8); /* Larger scale for mobile */
        padding: 10px;
        border-radius: 12px;
      }
      
      .frame-corner {
        width: 18px;
        height: 18px;
      }
      
      .frame-corner::after {
        width: 5px;
        height: 5px;
      }
      
      .game-title {
        flex-direction: column;
        gap: 6px;
        padding: 24px 20px; /* Keep substantial padding */
        min-height: 100px; /* Keep good height */
      }
      
      .game-title h1 {
        font-size: 2.2rem; /* Smaller on tablets */
        letter-spacing: 4px;
      }
      
      .game-subtitle {
        font-size: 0.9rem;
        letter-spacing: 1px;
      }
      
      .game-title-logo {
        max-height: 45px;
        max-width: 150px;
        top: 15px;
        right: 15px;
      }
      }
      
      .game-title .nail {
        width: 10px;
        height: 10px;
      }
      
      .game-title .nail-tl { top: 8px; left: 8px; }
      .game-title .nail-tr { top: 8px; right: 8px; }
      .game-title .nail-bl { bottom: 8px; left: 8px; }
      .game-title .nail-br { bottom: 8px; right: 8px; }
      
      .floating-cta {
        bottom: 15px;
        right: 15px;
        padding: 12px 24px;
        font-size: 0.9rem;
      }
      
      .win-modal-content {
        padding: 20px;
        flex-direction: column;
        gap: 20px;
        max-width: 90%;
      }
      
      .win-left-section,
      .win-right-section {
        flex: none;
      }
      
      .win-icon {
        font-size: 3rem;
      }
      
      .win-title {
        font-size: 1.8rem;
      }
      
      .win-message {
        font-size: 1rem;
      }
      
      .prize-amount {
        font-size: 1.6rem;
      }
      
      .claim-bonus-btn {
        font-size: 1rem;
        padding: 14px 28px;
      }
    }
    
    @media (max-width: 768px) {
      .footer {
        padding: 6px 12px; /* Reduce footer padding */
      }
      
      .footer-content p {
        font-size: 0.65rem; /* Smaller footer text */
        line-height: 1.2;
      }
      
      .footer .nail {
        width: 8px;
        height: 8px;
      }
      
      .footer .nail-tl { top: 6px; left: 6px; }
      .footer .nail-tr { top: 6px; right: 6px; }
      .footer .nail-bl { bottom: 6px; left: 6px; }
      .footer .nail-br { bottom: 6px; right: 6px; }
    }
    
    @media (max-width: 600px) {
      .game-container {
        padding: 8px; /* Even less padding */
      }
      
      .game-frame {
        transform: scale(0.75); /* Larger for small screens */
      }
    }
    
    @media (max-width: 480px) {
      .game-container {
        padding: 5px; /* Minimal padding */
      }
      
      .game-frame {
        transform: scale(0.7); /* Much larger than before */
        padding: 8px;
        border-radius: 8px;
      }
      
      .frame-corner {
        width: 15px;
        height: 15px;
      }
      
      .frame-corner::after {
        width: 4px;
        height: 4px;
      }
      
      /* Balanced header for small screens - still prominent */
      .game-title {
        padding: 20px 16px; /* Keep reasonable padding */
        min-height: 80px; /* Keep decent height */
        gap: 4px;
      }
      
      .game-title h1 {
        font-size: 1.8rem; /* Larger than before */
        letter-spacing: 2px;
      }
      
      .game-subtitle {
        font-size: 0.7rem;
        letter-spacing: 1px;
      }
      
      .game-title-logo {
        max-height: 35px; /* Smaller logo on mobile */
        max-width: 120px;
        top: 10px;
        right: 10px;
      }
      
      .footer {
        padding: 4px 8px;
      }
      
      .footer-content p {
        font-size: 0.6rem;
        line-height: 1.1;
      }
    }
    
    @media (max-width: 360px) {
      .game-container {
        padding: 3px; /* Almost no padding */
      }
      
      .game-frame {
        transform: scale(0.65); /* Still reasonable size */
      }
    }
      
      .game-title {
        padding: 8px 12px;
        min-height: 45px;
        gap: 8px;
      }
      
      .game-title h1 {
        font-size: 1rem;
        letter-spacing: 1px;
      }
      
      .game-title-logo {
        max-height: 32px;
        max-width: 120px;
      }
      
      .game-title .nail {
        width: 8px;
        height: 8px;
      }
      
      .footer {
        padding: 8px 12px;
      }
      
      .footer-content p {
        font-size: 0.65rem;
        line-height: 1.3;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="game-title">
      <div class="nail nail-tl"></div>
      <div class="nail nail-tr"></div>
      <div class="nail nail-bl"></div>
      <div class="nail nail-br"></div>
      ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" class="game-title-logo" onclick="window.open('${ctaUrl}', '_blank')">` : ''}
      <h1>${headline}</h1>
      <p class="game-subtitle">⚓ Embark on the Ultimate Treasure Hunt ⚓</p>
    </div>

    <div class="game-container">
      <div class="game-frame">
        <div class="frame-corner corner-tl"></div>
        <div class="frame-corner corner-tr"></div>
        <div class="frame-corner corner-bl"></div>
        <div class="frame-corner corner-br"></div>
        
        <iframe 
          src="/FisherMan Slot/index.html"
          title="Fisherman Slot Game"
          class="game-iframe"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    
    <div class="footer">
      <div class="nail nail-tl"></div>
      <div class="nail nail-tr"></div>
      <div class="nail nail-bl"></div>
      <div class="nail nail-br"></div>
      <div class="footer-content">
        <p>18+ | Play Responsibly | <a href="#" onclick="alert('Terms and Conditions'); return false;">Terms & Conditions</a> | <a href="#" onclick="alert('Privacy Policy'); return false;">Privacy Policy</a></p>
      </div>
    </div>
  </div>

  <!-- Win Modal -->
  <div id="winModal" class="win-modal-overlay">
    <div class="win-modal-content">
      <div class="nail nail-tl"></div>
      <div class="nail nail-tr"></div>
      <div class="nail nail-bl"></div>
      <div class="nail nail-br"></div>
      
      <div class="win-left-section">
        <div class="win-icon">🎉</div>
        <h2 class="win-title">${popupTitle}</h2>
        <p class="win-message">${popupMessage}</p>
      </div>
      
      <div class="win-right-section">
        <div class="win-prize">
          <span class="prize-label">YOUR BONUS:</span>
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
  </div>

  <script>
    let clickCount = 0;
    let hasShownModal = false;
    let lastFocusTime = 0;
    let isFirstFocus = true;

    // Function to close popup preview
    function closePopupPreview() {
      document.getElementById('winModal').style.display = 'none';
      window.parent.postMessage('closePopup', '*');
    }

    // Listen for preview message from editor
    window.addEventListener('message', function(event) {
      if (event.data === 'showPopup') {
        const modal = document.getElementById('winModal');
        const closeBtn = document.querySelector('.editor-close-btn');
        if (modal) modal.style.display = 'flex';
        if (closeBtn) closeBtn.style.display = 'block';
      }
    });

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
              
              // Show modal ONLY after exactly 3 clicks
              if (clickCount === 3) {
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
      
      // Note: Game balance customization
      // The FisherMan Slot game is compiled and uses its own internal balance system.
      // The balance value (${gameBalance}) is stored but the game uses its default value (1000).
      // To fully customize the balance, the game source code would need to be modified.
      console.log('Game balance setting: ${gameBalance}');
    });
  </script>
</body>
</html>`

  const css = ''

  return { html, css }
}

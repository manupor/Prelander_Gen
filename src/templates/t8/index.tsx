import React from 'react'
import { BrandConfig } from '@/lib/types'

// Declare jQuery types for window
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface Template8Props {
  brand: BrandConfig
}

export function Template8({ brand }: Template8Props) {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('en');

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Enhanced wheel spinning with jQuery effects
    const wheelElement = document.getElementById('wheelSpinner');
    if (wheelElement && window.$) {
      // Add jQuery animations
      window.$(wheelElement).addClass('spinning');
      
      // Add sound effect simulation
      const spinSound = () => {
        // Simulate spinning sound with multiple short beeps
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            // Visual feedback during spin
            if (i % 4 === 0) {
              window.$(wheelElement).css('box-shadow', '0 0 60px rgba(255, 215, 0, 1)');
            } else {
              window.$(wheelElement).css('box-shadow', '0 0 40px rgba(255, 215, 0, 0.8)');
            }
          }, i * 150);
        }
      };
      
      spinSound();
    }
    
    // Simulate wheel spinning for 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setShowModal(true);
      
      // Reset wheel effects
      if (wheelElement && window.$) {
        window.$(wheelElement).removeClass('spinning');
        window.$(wheelElement).css('box-shadow', '0 0 40px rgba(255, 215, 0, 0.9)');
      }
    }, 3000);
  };

  const handleClaimBonus = () => {
    if (brand.ctaUrl) {
      window.open(brand.ctaUrl, '_blank');
    }
  };

  return (
    <div className="wrapper">
      {/* Background shadows */}
      <div className="shadow">
        <img src="/images/3A1fbkAi2R3K.png" alt="" />
      </div>
      <div className="shadow__mob">
        <img src="/images/YN28yOKqxYSR.png" alt="" />
      </div>

      <div className="container">
        {/* Logo */}
        <a href="#" className="logo" id="logo" onClick={handleClaimBonus}>
          {brand.logoUrl && (
            <img src={brand.logoUrl} alt={brand.brandName} />
          )}
        </a>

        {/* Main content */}
        <div className="content">
          <div className="game-area">
            {/* Wheel wrapper */}
            <div className="wheel__wrapper">
              <div className="wheel__arrow"></div>
              <div className={`wheel__spinner_animated wheel__spinner ${isSpinning ? 'spinning' : ''}`} id="spinner">
                {/* 8 segmentos como en la referencia */}
                <div className="wheel__segment" style={{transform: 'rotate(0deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">125 FS</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(45deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">$750<br/>+200 FS</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(90deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">50 FS</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(135deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">x2<br/>DEPO</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(180deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">DEPOSIT<br/>x2</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(225deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">100 FS</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(270deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">50 FS</span>
                  </div>
                </div>
                <div className="wheel__segment" style={{transform: 'rotate(315deg)'}}>
                  <div className="segment-content">
                    <span className="prize-text">RESPIN</span>
                  </div>
                </div>
              </div>
              
              <button 
                className={`wheel__button ${isSpinning ? 'spinning' : ''}`}
                onClick={handleSpin}
                disabled={isSpinning}
              >
                <span className="en">SPIN</span>
                <span className="ru">ВРАЩЕНИЕ</span>
                <span className="de">DREHEN</span>
                <span className="fi">Pyörittää</span>
                <span className="pl">OBRACAĆ</span>
                <span className="pt">RODAR</span>
                <span className="es">GIRAR</span>
                <span className="ro">A ÎNVÂRTI</span>
                <span className="hu">Centrifugálás</span>
                <span className="fr">TOURNOYER</span>
                <span className="ph">Paikutin</span>
                <span className="vn">QUAY</span>
                <span className="th">การหมุน</span>
                <span className="cz">ROZTOČIT</span>
                <span className="jp">スピン</span>
                <span className="no">SNURRE<br/>RUNDT</span>
                <span className="gr">ΓΝΕΘΩ</span>
                <span className="lt">Suktis</span>
                <span className="lv">Griezties</span>
                <span className="se">SNURRA</span>
                <span className="ee">Keerutama</span>
                <span className="sk">Točiť sa</span>
                <span className="ua">Крутити</span>
                <span className="it">CANCELLARE</span>
              </button>
            </div>
            
            {/* Zeus character - positioned to the right */}
            <div className="zevs">
              <img src="/images/bqCJ7eX0fyrN.png" alt="" />
            </div>
            <div className="zevs__mob">
              <img src="/images/BqWkOvNnkqbM.png" alt="" />
            </div>
          </div>

          {/* Title section with multi-language support */}
          <div className="title">
            <div className="en">
              SPIN the lucky wheel<br/>
              to get the <span className="orange">bonuses</span>
            </div>
            <div className="it">
              Fai girare la ruota fortunata<br/>
              per ottenere il <span className="orange">bonus</span>
            </div>
            <div className="ru">
              Поверните счастливое колесо,<br/>
              чтобы получить <span className="orange">бонусы</span>
            </div>
            <div className="de">
              Drehen Sie das Glücksrad,<br/>
              um <span className="orange">die Boni</span> zu erhalten
            </div>
            <div className="fi">
              Pyöriä onnekas pyörä<br/>
              saadaksesi <span className="orange">bonuksia</span>
            </div>
            <div className="pl">
              Obróć szczęśliwe koło,<br/>
              aby uzyskać <span className="orange">bonusy</span>
            </div>
            <div className="pt">
              Gire a roda da sorte<br/>
              para obter os <span className="orange">bônus</span>
            </div>
            <div className="es">
              Gira la rueda de la suerte<br/>
              para obtener las <span className="orange">bonificaciones</span>
            </div>
            <div className="ro">
              Rotiți roata norocoasă<br/>
              pentru a obține <span className="orange">bonusurile</span>
            </div>
            <div className="hu">
              Forgassa el a szerencsés kereket,<br/>
              hogy megkapja a <span className="orange">bónuszokat</span>
            </div>
            <div className="fr">
              Faites tourner la roue<br/>
              chanceuse pour obtenir les <span className="orange">bonus</span>
            </div>
            <div className="ph">
              Paikutin ang masuwerteng gulong<br/>
              upang makuha ang mga <span className="orange">bonus</span>
            </div>
            <div className="vn">
              Quay bánh xe may mắn<br/>
              để nhận được tiền <span className="orange">thưởng</span>
            </div>
            <div className="th">
              หมุนวงล้อโชคเพื่อรับ<span className="orange">โบนัส</span>
            </div>
            <div className="cz">
              Roztočit šťastné kolo,<br/>
              abyste získali<span className="orange"> bonusy</span>
            </div>
            <div className="no">
              Spinn det heldige hjulet<br/>
              for å få <span className="orange"> bonusene</span>
            </div>
            <div className="jp">
              ラッキーホイールをスピンしてボー<span className="orange">ナスを取得します</span>
            </div>
            <div className="gr">
              Περιστρέψτε τον τυχερό τροχό<br/>
              για να πάρετε τα <span className="orange">μπόνους</span>
            </div>
            <div className="lt">
              Nukreipkite laimingą ratą,<br/>
              kad gautumėte <span className="orange">premijas</span>
            </div>
            <div className="lv">
              Griezt laimīgo riteni,<br/>
              lai iegūtu <span className="orange">prēmijas</span>
            </div>
            <div className="se">
              SNURRA lyckohjulet<br/>
              för att få <span className="orange">bonusarna</span>
            </div>
            <div className="ee">
              <span className="orange">Boonuste</span> saamiseks<br/>
              keerutage õnnelik ratas
            </div>
            <div className="sk">
              Roztočte šťastné koleso,<br/>
              aby ste dostali <span className="orange">bonusy</span>
            </div>
            <div className="ua">
              Крутити щасливе колесо,<br/>
              щоб отримати <span className="orange">бонуси</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer__text">
            <p>© 2024 All rights reserved</p>
          </div>
        </footer>
      </div>

      {/* Win Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="congratulations-title">Congratulations!</h2>
                <h3 className="win-title">YOU WON</h3>
              </div>
              
              <div className="modal-body">
                <div className="prize-amount">
                  <span className="currency-symbol">$</span>
                  <span className="amount">1500</span>
                </div>
                <div className="bonus-text">
                  <span className="bonus-highlight">+200 FS</span>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="claim-button"
                  onClick={handleClaimBonus}
                >
                  {brand.copy.cta || 'Get the bonus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Original CSS */}
      <link rel="stylesheet" href="/css/gates-olympus-original.css" />
      
      {/* Enhanced Styles */}
      <style jsx>{`
        /* Override and enhance original styles */
        .wrapper {
          overflow: hidden;
          max-width: 1920px;
          background: url("/images/b3FTrNirCLhC.jpg") top center;
          background-size: 200em auto;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
        }
        
        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1; margin-top: -5rem;
          pointer-events: none;
        }
        
        .shadow img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .shadow__mob {
          display: none;
        }
        
        .container {
          max-width: 124rem;
          margin: 0 auto;
          position: relative;
          padding: 1.4rem 2rem 15rem;
          z-index: 2;
        }
        
        .logo {
          display: block;
          max-width: 29.1rem;
          margin: 0 auto 3rem;
          position: relative;
          z-index: 5;
          transition: all .3s ease-in-out;
          filter: drop-shadow(0 0 0rem white);
        }
        
        .logo img {
          width: 100%;
          height: auto;
        }
        
        .content {
          position: relative;
          z-index: 3;
        }
        
        .game-area {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 60rem;
          width: 100%;
        }
        
        .zevs {
          position: absolute;
          top: 50%;
          right: -10rem;
          transform: translateY(-50%);
          z-index: 5;
          animation: float 6s ease-in-out infinite;
        }
        
        .zevs img {
          width: auto;
          height: 45rem;
          filter: drop-shadow(0 2rem 4rem rgba(0, 0, 0, 0.6));
          max-width: none;
        }
        
        .zevs__mob {
          display: none;
        }
        
        .wheel__wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }
        
        .wheel__arrow {
          position: absolute;
          top: -2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 2rem solid transparent;
          border-right: 2rem solid transparent;
          border-bottom: 4rem solid #FFD700;
          z-index: 15;
          filter: drop-shadow(0 0.4rem 0.8rem rgba(0, 0, 0, 0.3));
        }
        
        .wheel__spinner {
          width: 45rem;
          height: 60rem;
          border-radius: 50%;
          position: relative;
          background: conic-gradient(
            from 0deg,
            #FFD700 0deg 44deg,
            #8B4513 44deg 45deg,
            #FFA500 45deg 89deg,
            #8B4513 89deg 90deg,
            #FFD700 90deg 134deg,
            #8B4513 134deg 135deg,
            #FFA500 135deg 179deg,
            #8B4513 179deg 180deg,
            #FFD700 180deg 224deg,
            #8B4513 224deg 225deg,
            #FFA500 225deg 269deg,
            #8B4513 269deg 270deg,
            #FFD700 270deg 314deg,
            #8B4513 314deg 315deg,
            #FFA500 315deg 359deg,
            #8B4513 359deg 360deg
          );
          border: 1.5rem solid #B8860B;
          box-shadow: 
            0 0 5rem rgba(255, 215, 0, 1),
            inset 0 0 3rem rgba(0, 0, 0, 0.4),
            0 0 10rem rgba(255, 215, 0, 0.6),
            0 0 15rem rgba(255, 165, 0, 0.3);
          transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .wheel__spinner::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6rem;
          height: 6rem;
          background: radial-gradient(circle, #FFD700, #B8860B);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 2rem rgba(255, 215, 0, 0.8);
          z-index: 10;
        }
        
        .wheel__spinner.spinning {
          transform: rotate(2160deg);
        }
        
        .wheel__segment {
          position: absolute;
          width: 50%;
          height: 50%;
          transform-origin: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .segment-content {
          position: absolute;
          top: 30%;
          left: 60%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 5;
        }
        
        .prize-text {
          color: #000;
          font-weight: 900;
          font-size: 1.3rem;
          text-shadow: 
            0.2rem 0.2rem 0.4rem rgba(255, 255, 255, 1),
            -0.1rem -0.1rem 0.2rem rgba(0, 0, 0, 0.5);
          line-height: 1.1;
          text-transform: uppercase;
          display: block;
          white-space: nowrap;
        }
        
        .wheel__button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #1e3c72, #2a5298, #4a90e2);
          border: 0.6rem solid #FFD700;
          border-radius: 50%;
          width: 12rem;
          height: 12rem;
          font-size: 2.4rem;
          font-weight: 900;
          color: #FFF;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          box-shadow: 
            0 1rem 3rem rgba(255, 215, 0, 0.8),
            inset 0 0.3rem 1rem rgba(255, 255, 255, 0.3),
            0 0 2rem rgba(74, 144, 226, 0.6);
          transition: all 0.3s ease;
          text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.6);
          z-index: 20;
        }
        
        .wheel__button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 
            0 1.5rem 4rem rgba(255, 215, 0, 1),
            inset 0 0.2rem 1.5rem rgba(255, 255, 255, 0.5),
            0 0 3rem rgba(74, 144, 226, 0.8);
        }
        
        .wheel__button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .wheel__button.spinning {
          animation: pulse 0.5s infinite alternate;
        }
        
        .title {
          text-align: center;
          max-width: 60rem;
          margin: 5rem auto 0;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8);
          line-height: 1.2;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .orange {
          color: #ff6b35;
        }
        
        .footer {
          margin-top: 5rem;
          padding: 2rem 0;
          text-align: center;
        }
        
        .footer__text {
          color: #ffffff;
          font-size: 1.2rem;
        }
        
        /* Language display system */
        html.en .en { display: inline; }
        html .en { display: none; }
        html.ru .ru { display: inline; }
        html .ru { display: none; }
        html.de .de { display: inline; }
        html .de { display: none; }
        html.fi .fi { display: inline; }
        html .fi { display: none; }
        html.pl .pl { display: inline; }
        html .pl { display: none; }
        html.pt .pt { display: inline; }
        html .pt { display: none; }
        html.es .es { display: inline; }
        html .es { display: none; }
        html.ro .ro { display: inline; }
        html .ro { display: none; }
        html.hu .hu { display: inline; }
        html .hu { display: none; }
        html.fr .fr { display: inline; }
        html .fr { display: none; }
        html.ph .ph { display: inline; }
        html .ph { display: none; }
        html.vn .vn { display: inline; }
        html .vn { display: none; }
        html.th .th { display: inline; }
        html .th { display: none; }
        html.cz .cz { display: inline; }
        html .cz { display: none; }
        html.jp .jp { display: inline; }
        html .jp { display: none; }
        html.no .no { display: inline; }
        html .no { display: none; }
        html.gr .gr { display: inline; }
        html .gr { display: none; }
        html.lt .lt { display: inline; }
        html .lt { display: none; }
        html.lv .lv { display: inline; }
        html .lv { display: none; }
        html.se .se { display: inline; }
        html .se { display: none; }
        html.ee .ee { display: inline; }
        html .ee { display: none; }
        html.sk .sk { display: inline; }
        html .sk { display: none; }
        html.ua .ua { display: inline; }
        html .ua { display: none; }
        html.it .it { display: inline; }
        html .it { display: none; }
        
        /* Default to English */
        .en { display: inline; }
        
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-2rem); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .shadow {
            display: none;
          }
          
          .shadow__mob {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1; margin-top: -5rem;
            pointer-events: none;
          }
          
          .shadow__mob img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .wrapper {
            background-size: 120em auto;
          }
          
          .container {
            padding: 1rem 1rem 10rem;
          }
          
          .logo {
            max-width: 20rem;
            margin: 0 auto 2rem;
          }
          
          .game-area {
            flex-direction: column;
            gap: 2rem;
            min-height: auto;
            position: relative;
          }
          
          .zevs {
            display: none;
          }
          
          .zevs__mob {
            display: block;
            position: relative; z-index: 10;
            animation: float 6s ease-in-out infinite;
          }
          
          .zevs__mob img {
        
        /* Modal Styles */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .popup__container {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 2rem;
          padding: 3rem;
          max-width: 50rem;
          text-align: center;
          border: 0.5rem solid #FFD700;
          box-shadow: 0 2rem 6rem rgba(255, 215, 0, 0.6);
        }
        
        .popup__title {
          font-size: 3rem;
          font-weight: 900;
          color: #FFD700;
          margin-bottom: 2rem;
          text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.8);
        }
        
        .popup__text {
          margin: 2rem 0;
        }
        
        .bonus-popup {
          font-size: 4rem;
          font-weight: 900;
          color: #FFD700;
          text-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8);
        }
        
        .color {
          color: #ff6b35;
          font-size: 2.5rem;
          font-weight: 900;
        }
        
        .popup__btn {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: 0.4rem solid #FFD700;
          border-radius: 1.5rem;
          padding: 2rem 4rem;
          font-size: 2rem;
          font-weight: 900;
          color: #FFF;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 1rem 3rem rgba(255, 107, 53, 0.6);
          transition: all 0.3s ease;
        }
        
        .popup__btn:hover {
          transform: translateY(-0.3rem) scale(1.05);
          box-shadow: 0 1.5rem 4rem rgba(255, 107, 53, 0.8);
        }
            width: auto;
            height: 20rem;
            filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.5));
          }
          
          .wheel__wrapper {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; margin-top: -5rem;
          }
          
          .wheel__spinner {
            width: 30rem;
            height: 30rem;
            border: 1.2rem solid #B8860B;
          }
          
          .wheel__spinner::before {
            width: 4rem;
            height: 4rem;
          }
          
          .prize-text {
            font-size: 1.2rem;
          }
          
          .wheel__button {
            padding: 1.5rem 4rem;
            font-size: 1.8rem;
            margin-top: 3rem;
          }
          
          .title {
            font-size: 2.5rem;
            margin: 3rem auto 0;
            max-width: 90%;
          }
        }
        
        @media (max-width: 480px) {
          .wheel__spinner {
            width: 22rem;
            height: 22rem;
          }
          
          .wheel__spinner::before {
            width: 3rem;
            height: 3rem;
          }
          
          .wheel__text {
            font-size: 1rem;
            padding: 1rem;
          }
          
          .wheel__bonus-1 {
            font-size: 1.2rem;
          }
          
          .wheel__bonus-2 {
            font-size: 1rem;
          }
          
          .wheel__button {
            padding: 1.2rem 3rem;
            font-size: 1.6rem;
          }
          
          .title {
            font-size: 2rem;
          }
          
          .zevs__mob img {
        
        /* Modal Styles */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .popup__container {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 2rem;
          padding: 3rem;
          max-width: 50rem;
          text-align: center;
          border: 0.5rem solid #FFD700;
          box-shadow: 0 2rem 6rem rgba(255, 215, 0, 0.6);
        }
        
        .popup__title {
          font-size: 3rem;
          font-weight: 900;
          color: #FFD700;
          margin-bottom: 2rem;
          text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.8);
        }
        
        .popup__text {
          margin: 2rem 0;
        }
        
        .bonus-popup {
          font-size: 4rem;
          font-weight: 900;
          color: #FFD700;
          text-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8);
        }
        
        .color {
          color: #ff6b35;
          font-size: 2.5rem;
          font-weight: 900;
        }
        
        .popup__btn {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: 0.4rem solid #FFD700;
          border-radius: 1.5rem;
          padding: 2rem 4rem;
          font-size: 2rem;
          font-weight: 900;
          color: #FFF;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 1rem 3rem rgba(255, 107, 53, 0.6);
          transition: all 0.3s ease;
        }
        
        .popup__btn:hover {
          transform: translateY(-0.3rem) scale(1.05);
          box-shadow: 0 1.5rem 4rem rgba(255, 107, 53, 0.8);
        }
            height: 15rem;
          }
        }

        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1; margin-top: -5rem;
          pointer-events: none;
        }

        .shadow img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mobile-shadow {
          display: none;
        }

        .container {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }

        .logo img {
          height: 80px;
          width: auto;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo img:hover {
          transform: scale(1.05);
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .wheel {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 50px 0;
        }

        .zevs {
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .zevs img {
          height: 300px;
          width: auto;
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6));
        }

        .zevs__mob {
          display: none;
        }

        .wheel__wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wheel__arrow {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 40px solid #FFD700;
          z-index: 15;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .wheel__spinner {
          width: 400px;
          height: 400px;
          border-radius: 50%;
          position: relative;
          background: conic-gradient(
            from 0deg,
            #8B4513 0deg 90deg,
            #DAA520 90deg 180deg,
            #FFD700 180deg 270deg,
            #CD853F 270deg 360deg
          );
          border: 12px solid #FFD700;
          box-shadow: 
            0 0 40px rgba(255, 215, 0, 0.9),
            inset 0 0 20px rgba(0, 0, 0, 0.3),
            0 0 80px rgba(255, 215, 0, 0.4);
          transition: transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .wheel__spinner::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #FFD700, #B8860B);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          z-index: 10;
        }

        .wheel__spinner.spinning {
          transform: rotate(1800deg);
        }

        .wheel__text {
          position: absolute;
          width: 50%;
          height: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          text-align: center;
          font-size: 14px;
          transform-origin: 100% 100%;
          padding: 20px;
        }

        .wheel__text-1 {
          top: 0;
          left: 0;
        }

        .wheel__text-2 {
          top: 0;
          right: 0;
        }

        .wheel__text-3 {
          bottom: 0;
          right: 0;
        }

        .wheel__text-4 {
          bottom: 0;
          left: 0;
        }

        .wheel__bonus {
          margin: 5px 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }

        .wheel__bonus-1 {
          font-size: 16px;
          font-weight: 900;
          margin-bottom: 5px;
        }

        .wheel__bonus-2 {
          font-size: 14px;
          font-weight: 600;
        }

        .wheel__button {
          margin-top: 40px;
          background: linear-gradient(45deg, #8B4513, #DAA520, #FFD700);
          border: 4px solid #FFD700;
          border-radius: 15px;
          padding: 20px 60px;
          font-size: 22px;
          font-weight: 900;
          color: #000;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 3px;
          box-shadow: 
            0 10px 30px rgba(255, 215, 0, 0.7),
            inset 0 3px 10px rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        }

        .wheel__button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 12px 30px rgba(255, 215, 0, 0.8),
            inset 0 2px 12px rgba(255, 255, 255, 0.5);
        }

        .wheel__button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .wheel__button.spinning {
          animation: pulse 0.5s infinite alternate;
        }

        .wheel__bottom {
          margin-top: 20px;
        }

        .title {
          text-align: center;
          max-width: 600px;
          margin: 30px auto 0;
        }

        .title-text {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
          line-height: 1.2;
          animation: shimmer 3s ease-in-out infinite;
          margin-bottom: 20px;
        }

        .footer {
          margin-top: auto;
          padding: 20px 0;
          text-align: center;
        }

        .footer__text {
          color: #ffffff;
          font-size: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: linear-gradient(135deg, #ffd700, #ff6b35);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          max-width: 400px;
          margin: 20px;
          animation: slideIn 0.3s ease;
        }

        .modal-header {
          margin-bottom: 30px;
        }

        .congratulations-title {
          font-size: 2rem;
          font-weight: 900;
          color: #0a0a2e;
          margin-bottom: 10px;
        }

        .win-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a0a2e;
          margin: 0;
        }

        .modal-body {
          margin-bottom: 30px;
        }

        .prize-amount {
          font-size: 3rem;
          font-weight: 900;
          color: #0a0a2e;
          margin-bottom: 15px;
        }

        .currency-symbol {
          font-size: 2rem;
        }

        .bonus-highlight {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a0a2e;
        }

        .claim-button {
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
          border: none;
          border-radius: 50px;
          padding: 15px 40px;
          font-size: 18px;
          font-weight: 900;
          color: white;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 8px 25px rgba(68, 160, 141, 0.4);
          transition: all 0.3s ease;
          width: 100%;
        }

        .claim-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(68, 160, 141, 0.6);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .desktop-shadow {
            display: none;
          }

          .mobile-shadow {
            display: block;
          }

          .zevs {
            display: none;
          }

          .zevs__mob {
            display: block;
            position: absolute;
            top: -140px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
          }

          .zevs__mob img {
        
        /* Modal Styles */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .popup__container {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 2rem;
          padding: 3rem;
          max-width: 50rem;
          text-align: center;
          border: 0.5rem solid #FFD700;
          box-shadow: 0 2rem 6rem rgba(255, 215, 0, 0.6);
        }
        
        .popup__title {
          font-size: 3rem;
          font-weight: 900;
          color: #FFD700;
          margin-bottom: 2rem;
          text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.8);
        }
        
        .popup__text {
          margin: 2rem 0;
        }
        
        .bonus-popup {
          font-size: 4rem;
          font-weight: 900;
          color: #FFD700;
          text-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8);
        }
        
        .color {
          color: #ff6b35;
          font-size: 2.5rem;
          font-weight: 900;
        }
        
        .popup__btn {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: 0.4rem solid #FFD700;
          border-radius: 1.5rem;
          padding: 2rem 4rem;
          font-size: 2rem;
          font-weight: 900;
          color: #FFF;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 1rem 3rem rgba(255, 107, 53, 0.6);
          transition: all 0.3s ease;
        }
        
        .popup__btn:hover {
          transform: translateY(-0.3rem) scale(1.05);
          box-shadow: 0 1.5rem 4rem rgba(255, 107, 53, 0.8);
        }
            height: 200px;
            width: auto;
            animation: float 6s ease-in-out infinite;
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
          }

          .wheel__spinner {
            width: 320px;
            height: 320px;
          }

          .wheel__spinner::before {
            width: 30px;
            height: 30px;
          }

          .title-text {
            font-size: 2.5rem;
          }

          .logo img {
            height: 70px;
          }

          .wheel__button {
            padding: 15px 40px;
            font-size: 18px;
          }

          .modal-container {
            margin: 10px;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .wheel__spinner {
            width: 200px;
            height: 200px;
          }

          .wheel__spinner::before {
            width: 25px;
            height: 25px;
          }

          .title-text {
            font-size: 1.5rem;
          }

          .wheel__button {
            padding: 10px 25px;
            font-size: 14px;
          }

          .zevs__mob img {
        
        /* Modal Styles */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .popup__container {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 2rem;
          padding: 3rem;
          max-width: 50rem;
          text-align: center;
          border: 0.5rem solid #FFD700;
          box-shadow: 0 2rem 6rem rgba(255, 215, 0, 0.6);
        }
        
        .popup__title {
          font-size: 3rem;
          font-weight: 900;
          color: #FFD700;
          margin-bottom: 2rem;
          text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.8);
        }
        
        .popup__text {
          margin: 2rem 0;
        }
        
        .bonus-popup {
          font-size: 4rem;
          font-weight: 900;
          color: #FFD700;
          text-shadow: 0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8);
        }
        
        .color {
          color: #ff6b35;
          font-size: 2.5rem;
          font-weight: 900;
        }
        
        .popup__btn {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: 0.4rem solid #FFD700;
          border-radius: 1.5rem;
          padding: 2rem 4rem;
          font-size: 2rem;
          font-weight: 900;
          color: #FFF;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 1rem 3rem rgba(255, 107, 53, 0.6);
          transition: all 0.3s ease;
        }
        
        .popup__btn:hover {
          transform: translateY(-0.3rem) scale(1.05);
          box-shadow: 0 1.5rem 4rem rgba(255, 107, 53, 0.8);
        }
            height: 120px;
          }

          .wheel__bonus-1 {
            font-size: 10px;
          }

          .wheel__bonus-2 {
            font-size: 8px;
          }
        }
      `}</style>
    </div>
  )
}

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.brandName} - Gates of Olympus</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-primary: ${brand.colors.primary};
            --brand-secondary: ${brand.colors.secondary};
            --brand-accent: ${brand.colors.accent};
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Montserrat', sans-serif; 
            background: linear-gradient(135deg, #0a0a2e 0%, #16213e 50%, #0f3460 100%);
            color: white; 
            min-height: 100vh; 
            overflow-x: hidden; 
        }
        
        .container { 
            min-height: 100vh; 
            display: flex; 
            flex-direction: column; 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px; 
            position: relative;
            z-index: 2;
        }
        
        .header { 
            display: flex;
            justify-content: center;
            padding: 20px 0;
        }
        
        .logo img {
            height: 60px;
            width: auto;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .logo img:hover {
            transform: scale(1.05);
        }
        
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .zeus-character {
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
        }
        
        .zeus img {
            height: 200px;
            width: auto;
        }
        
        .wheel-section {
            margin: 100px 0 50px 0;
        }
        
        .wheel-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .wheel-arrow {
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 30px solid #ffd700;
            position: absolute;
            top: -15px;
            z-index: 5;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        .wheel-spinner {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            position: relative;
            background: conic-gradient(
                from 0deg,
                var(--brand-primary) 0deg 90deg,
                var(--brand-secondary) 90deg 180deg,
                var(--brand-accent) 180deg 270deg,
                #4ecdc4 270deg 360deg
            );
            border: 8px solid #ffd700;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            transition: transform 3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .wheel-spinner.spinning {
            transform: rotate(1440deg);
        }
        
        .wheel-button {
            margin-top: 30px;
            background: linear-gradient(45deg, var(--brand-primary), var(--brand-accent));
            border: none;
            border-radius: 50px;
            padding: 15px 40px;
            font-size: 18px;
            font-weight: 900;
            color: white;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
            transition: all 0.3s ease;
        }
        
        .wheel-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(255, 107, 53, 0.6);
        }
        
        .wheel-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .title-section {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .main-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: var(--brand-accent);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: #ffffff;
            margin-bottom: 30px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        }
        
        .footer {
            margin-top: auto;
            padding: 20px 0;
            text-align: center;
            color: #ffffff;
            font-size: 12px;
        }
        
        .footer-links {
            margin-top: 10px;
        }
        
        .footer-links a {
            color: #ffffff;
            text-decoration: none;
            margin: 0 5px;
        }
        
        .cta-button {
            background: linear-gradient(45deg, var(--brand-primary), var(--brand-accent));
            border: none;
            border-radius: 50px;
            padding: 20px 50px;
            font-size: 20px;
            font-weight: 900;
            color: white;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
            transition: all 0.3s ease;
            margin-top: 30px;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(255, 107, 53, 0.6);
        }
        
        /* Modal Styles */
        .modal {
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
        }
        
        .modal.show {
            display: flex;
        }
        
        .modal-content {
            background: linear-gradient(135deg, var(--brand-accent), var(--brand-primary));
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            max-width: 400px;
            margin: 20px;
        }
        
        .modal h2 {
            font-size: 2rem;
            font-weight: 900;
            color: #0a0a2e;
            margin-bottom: 20px;
        }
        
        .modal .prize-amount {
            font-size: 3rem;
            font-weight: 900;
            color: #0a0a2e;
            margin-bottom: 20px;
        }
        
        .claim-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            border: none;
            border-radius: 50px;
            padding: 15px 40px;
            font-size: 18px;
            font-weight: 900;
            color: white;
            cursor: pointer;
            text-transform: uppercase;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        .claim-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(68, 160, 141, 0.6);
        }
        
        @media (max-width: 768px) {
            .wheel-spinner { width: 250px; height: 250px; }
            .main-title { font-size: 2rem; }
            .subtitle { font-size: 1rem; }
        }
        
        @media (max-width: 480px) {
            .wheel-spinner { width: 200px; height: 200px; }
            .main-title { font-size: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            ${brand.logoUrl ? `
            <div class="logo">
                <img src="${brand.logoUrl}" alt="${brand.brandName}" onclick="window.open('${brand.ctaUrl}', '_blank')" />
            </div>
            ` : ''}
        </header>
        
        <div class="content">
            <div class="zeus-character">
                <img src="/images/gates-olympus-zeus.png" alt="Zeus" />
            </div>
            
            <div class="wheel-section">
                <div class="wheel-wrapper">
                    <div class="wheel-arrow"></div>
                    <div class="wheel-spinner" id="wheelSpinner">
                        <!-- Wheel segments will be styled with CSS -->
                    </div>
                    <button class="wheel-button" id="spinButton">SPIN</button>
                </div>
            </div>
            
            <div class="title-section">
                <h1 class="main-title">${brand.copy.headline || 'SPIN the lucky wheel to get the bonuses'}</h1>
                <p class="subtitle">${brand.copy.subheadline || 'Win amazing prizes and free spins!'}</p>
                <button class="cta-button" onclick="window.open('${brand.ctaUrl}', '_blank')">
                    ${brand.copy.cta || 'PLAY NOW'}
                </button>
            </div>
        </div>
        
        <footer class="footer">
            <p>© 2024 All rights reserved</p>
            <div class="footer-links">
                <a href="#" target="_blank">Privacy Policy</a> |
                <a href="#" target="_blank">Terms & Conditions</a>
            </div>
        </footer>
    </div>

    <!-- Win Modal -->
    <div id="winModal" class="modal">
        <div class="modal-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <h3>YOU WON</h3>
            <div class="prize-amount">$1,500</div>
            <p><span style="color: #0a0a2e; font-weight: bold;">+200 FS</span></p>
            <button class="claim-btn" onclick="window.open('${brand.ctaUrl}', '_blank')">
                ${brand.copy.cta || 'Get the bonus'}
            </button>
        </div>
    </div>

    <script>
        let isSpinning = false;
        
        document.getElementById('spinButton').addEventListener('click', function() {
            if (isSpinning) return;
            
            isSpinning = true;
            const spinner = document.getElementById('wheelSpinner');
            const button = this;
            
            button.textContent = 'SPINNING...';
            button.disabled = true;
            spinner.classList.add('spinning');
            
            setTimeout(() => {
                isSpinning = false;
                button.textContent = 'SPIN';
                button.disabled = false;
                spinner.classList.remove('spinning');
                
                // Show win modal
                document.getElementById('winModal').classList.add('show');
            }, 3000);
        });
        
        // Close modal when clicking outside
        document.getElementById('winModal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    </script>
</body>
</html>`;

  return { html, css: '' };
}

/**
 * Castle Slot Game Component
 * React component for easy integration of the editable Castle Slot game
 */

import React, { useEffect, useRef, useState } from 'react';

interface CastleSlotGameProps {
  balance?: number;
  logoUrl?: string;
  ctaUrl?: string;
  onWin?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface WinPopupProps {
  isVisible: boolean;
  onClose: () => void;
  ctaUrl: string;
  title?: string;
  message?: string;
  prize?: string;
  ctaText?: string;
}

const WinPopup: React.FC<WinPopupProps> = ({
  isVisible,
  onClose,
  ctaUrl,
  title = "🎉 Congratulations!",
  message = "You've just unlocked your casino bonus!",
  prize = "$5,000 + 100 FREE SPINS",
  ctaText = "Claim Bonus"
}) => {
  if (!isVisible) return null;

  const handleClaimClick = () => {
    window.open(ctaUrl, '_blank');
    onClose();
  };

  return (
    <div 
      className="castle-slot-popup"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '5px solid #8D6E63',
          animation: 'bounceIn 0.6s ease-out'
        }}
      >
        <h2 style={{ 
          color: '#8D6E63', 
          fontSize: '32px', 
          marginBottom: '15px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {title}
        </h2>
        
        <p style={{ 
          color: '#5D4037', 
          fontSize: '18px', 
          marginBottom: '20px',
          lineHeight: '1.4'
        }}>
          {message}
        </p>
        
        <div style={{ 
          color: '#2E7D32', 
          fontSize: '28px', 
          fontWeight: 'bold',
          marginBottom: '30px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {prize}
        </div>
        
        <button
          onClick={handleClaimClick}
          style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            color: 'white',
            border: 'none',
            padding: '18px 40px',
            borderRadius: '30px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 6px 25px rgba(76,175,80,0.4)',
            transition: 'all 0.3s ease',
            marginRight: '15px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(76,175,80,0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(76,175,80,0.4)';
          }}
        >
          {ctaText}
        </button>
        
        <button
          onClick={onClose}
          style={{
            background: '#ccc',
            color: '#666',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#bbb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#ccc';
          }}
        >
          Close
        </button>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.5); }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export const CastleSlotGame: React.FC<CastleSlotGameProps> = ({
  balance = 1000,
  logoUrl,
  ctaUrl = 'https://casino-landing.com',
  onWin,
  className = '',
  style = {}
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    // Listen for messages from the game iframe
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message from Castle Slot game:', event.data);
      
      if (event.data && event.data.type === 'showWinPopup') {
        setShowWinPopup(true);
        onWin?.();
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onWin]);

  useEffect(() => {
    // Send configuration to iframe when it loads
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setGameReady(true);
      
      const gameConfig = {
        balance,
        logo: logoUrl,
        cta: ctaUrl
      };

      // Send configuration to game
      setTimeout(() => {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'gameConfig',
              config: gameConfig
            }, '*');
            
            console.log('Game configuration sent:', gameConfig);
          }
        } catch (error) {
          console.log('Could not send config to iframe:', error);
        }
      }, 1000);
    };

    iframe.addEventListener('load', handleLoad);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [balance, logoUrl, ctaUrl]);

  const gameUrl = `/CastleSlot/index.html?balance=${balance}&logo=${encodeURIComponent(logoUrl || '')}&cta=${encodeURIComponent(ctaUrl)}`;

  return (
    <>
      <div 
        className={`castle-slot-container ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          overflow: 'hidden',
          ...style
        }}
      >
        <iframe
          ref={iframeRef}
          src={gameUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          allow="autoplay; fullscreen; gamepad; gyroscope; accelerometer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
          title="Castle Slot Game"
        />
        
        {/* Loading indicator */}
        {!gameReady && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '18px'
          }}>
            Loading Castle Slot Game...
          </div>
        )}
      </div>
      
      <WinPopup
        isVisible={showWinPopup}
        onClose={() => setShowWinPopup(false)}
        ctaUrl={ctaUrl}
      />
    </>
  );
};

export default CastleSlotGame;

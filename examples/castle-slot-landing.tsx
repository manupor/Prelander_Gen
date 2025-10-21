/**
 * Castle Slot Landing Page Example
 * Complete example showing how to integrate the editable Castle Slot game
 */

'use client';

import React, { useState, useEffect } from 'react';
import CastleSlotGame from '../components/CastleSlotGame';

interface LandingPageProps {
  // These can come from URL params, database, or props
  balance?: number;
  logoUrl?: string;
  ctaUrl?: string;
  siteName?: string;
}

const CastleSlotLanding: React.FC<LandingPageProps> = ({
  balance: initialBalance,
  logoUrl: initialLogoUrl,
  ctaUrl: initialCtaUrl,
  siteName = "Castle Casino"
}) => {
  const [balance, setBalance] = useState(1000);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [ctaUrl, setCtaUrl] = useState('https://casino-landing.com');
  const [showCustomPopup, setShowCustomPopup] = useState(false);

  useEffect(() => {
    // Parse URL parameters for affiliate customization
    const urlParams = new URLSearchParams(window.location.search);
    
    const urlBalance = urlParams.get('balance');
    const urlLogo = urlParams.get('logo');
    const urlCta = urlParams.get('cta');
    
    // Set values from URL params, props, or defaults
    setBalance(
      urlBalance ? parseInt(urlBalance) : 
      initialBalance || 1000
    );
    
    setLogoUrl(
      urlLogo || 
      initialLogoUrl || 
      ''
    );
    
    setCtaUrl(
      urlCta || 
      initialCtaUrl || 
      'https://casino-landing.com'
    );
  }, [initialBalance, initialLogoUrl, initialCtaUrl]);

  const handleGameWin = () => {
    console.log('Player won! Triggering conversion tracking...');
    
    // Here you can add analytics tracking
    // gtag('event', 'game_win', { event_category: 'engagement' });
    
    // Or trigger other conversion events
    // fbq('track', 'Lead');
  };

  const handleClaimBonus = () => {
    // Track conversion before redirect
    console.log('Player clicked claim bonus!');
    
    // Analytics tracking
    // gtag('event', 'conversion', { event_category: 'cta_click' });
    
    // Redirect to affiliate link
    window.open(ctaUrl, '_blank');
  };

  return (
    <div className="castle-slot-landing">
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '20px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontSize: '28px', 
              margin: 0,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {siteName}
            </h1>
            
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt="Logo" 
                style={{
                  height: '50px',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            )}
          </div>
          
          <p style={{ 
            fontSize: '18px', 
            margin: '10px 0 0 0',
            opacity: 0.9
          }}>
            🏰 Play Castle Slot & Win Big! 🎰
          </p>
        </div>
      </header>

      {/* Game Section */}
      <main style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Game Instructions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '30px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '15px',
              color: '#FFD700'
            }}>
              🎯 How to Play
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
              Spin the reels and match symbols to win! Your starting balance is{' '}
              <strong style={{ color: '#FFD700' }}>
                💰 {balance.toLocaleString()} coins
              </strong>
              <br />
              <em>Tip: Great rewards await on your second spin! 🎁</em>
            </p>
          </div>

          {/* Castle Slot Game */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <CastleSlotGame
              balance={balance}
              logoUrl={logoUrl}
              ctaUrl={ctaUrl}
              onWin={handleGameWin}
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* Features Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            {[
              { icon: '🎰', title: 'Real Casino Experience', desc: 'Authentic slot machine gameplay' },
              { icon: '💰', title: 'Big Rewards', desc: 'Win amazing prizes and bonuses' },
              { icon: '📱', title: 'Mobile Optimized', desc: 'Play anywhere, anytime' },
              { icon: '🔒', title: 'Safe & Secure', desc: 'Your data is protected' }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'center',
                color: 'white',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '18px', 
                  marginBottom: '10px',
                  color: '#FFD700'
                }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            marginTop: '40px',
            color: '#1a1a2e'
          }}>
            <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>
              Ready for Real Money Games?
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '25px' }}>
              Join thousands of players winning real cash prizes!
            </p>
            <button
              onClick={handleClaimBonus}
              style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white',
                border: 'none',
                padding: '20px 40px',
                borderRadius: '30px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 6px 25px rgba(76,175,80,0.4)',
                transition: 'all 0.3s ease'
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
              🎁 Claim Your Bonus Now!
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1a1a2e',
        color: 'white',
        textAlign: 'center',
        padding: '30px 20px'
      }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © 2024 {siteName}. Play responsibly. 18+
        </p>
      </footer>

      {/* Custom Popup (if needed) */}
      {showCustomPopup && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '20px'
          }}>
            <h2>🎉 Congratulations!</h2>
            <p>You've unlocked exclusive bonuses!</p>
            <button
              onClick={() => {
                handleClaimBonus();
                setShowCustomPopup(false);
              }}
              style={{
                background: '#FFD700',
                color: '#000',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Claim Now
            </button>
            <button
              onClick={() => setShowCustomPopup(false)}
              style={{
                background: '#ccc',
                color: '#666',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastleSlotLanding;

// Example usage in a Next.js page:
/*
// pages/castle-slot.tsx or app/castle-slot/page.tsx

export default function CastleSlotPage() {
  return (
    <CastleSlotLanding
      balance={1500}
      logoUrl="https://your-cdn.com/logo.png"
      ctaUrl="https://your-casino.com/signup"
      siteName="Your Casino Brand"
    />
  );
}

// For affiliate links, users can visit:
// https://yoursite.com/castle-slot?balance=2000&logo=https://affiliate.com/logo.png&cta=https://casino123.com
*/

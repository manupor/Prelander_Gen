'use client'

import { BrandConfig } from '@/lib/types'
import { useState, useEffect, useRef } from 'react'

interface T12Props {
  brand: BrandConfig
}

export function Template12({ brand }: T12Props) {
  const [showWinModal, setShowWinModal] = useState(false)
  const [multiplier, setMultiplier] = useState(1.00)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
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

  // Auto-start game and video
  useEffect(() => {
    const startGame = async () => {
      setIsPlaying(true)
      
      // Start video
      if (videoRef.current) {
        try {
          await videoRef.current.play()
          console.log('✅ Video playing')
        } catch (error) {
          console.error('❌ Video autoplay failed:', error)
        }
      }

      // Animate multiplier from 1.00x to 10.00x over 13 seconds
      const duration = 13000 // 13 seconds
      const startTime = Date.now()
      const startMultiplier = 1.00
      const endMultiplier = 10.00

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth acceleration
        const easeOutQuad = (t: number) => t * (2 - t)
        const easedProgress = easeOutQuad(progress)
        
        const currentMultiplier = startMultiplier + (endMultiplier - startMultiplier) * easedProgress
        setMultiplier(currentMultiplier)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          // Game finished - show win modal
          setTimeout(() => {
            setShowWinModal(true)
          }, 500)
        }
      }

      animate()
    }

    // Start after 1 second
    const timer = setTimeout(startGame, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClaimBonus = () => {
    window.open(ctaUrl, '_blank')
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.secondary} 0%, #0F172A 50%, ${colors.accent} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background stars */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />

      {/* Casino Brand Logo */}
      {logoUrl && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(90deg, rgba(30, 64, 175, 0.8), rgba(15, 23, 42, 0.8))',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1.5rem',
            padding: '1rem',
            border: `2px solid ${colors.primary}40`,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '1rem',
              padding: '0.75rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={logoUrl} 
                alt={`${brandName} Casino Logo`}
                style={{
                  height: '48px',
                  width: 'auto',
                  maxWidth: '200px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Headline */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: colors.primary,
          textShadow: `0 0 20px ${colors.primary}80, 0 4px 8px rgba(0,0,0,0.5)`,
          margin: 0,
          letterSpacing: '2px'
        }}>
          {headline}
        </h1>
      </div>

      {/* Main content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '20px',
        position: 'relative',
        zIndex: 10,
        flexWrap: 'wrap'
      }}>
        {/* Game Area - Airplane Animation */}
        <div style={{
          flex: '1 1 500px',
          maxWidth: '600px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(15, 23, 42, 0.5))',
          borderRadius: '20px',
          border: `3px solid ${colors.primary}`,
          boxShadow: `0 0 30px ${colors.primary}50, inset 0 0 50px rgba(0,0,0,0.3)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Sky gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)',
            opacity: 0.6
          }} />

          {/* Clouds */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '120%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
            animation: 'moveCloud 20s linear infinite'
          }} />

          {/* Neon Airplane */}
          <div style={{
            position: 'absolute',
            bottom: `${10 + (multiplier - 1) * 8}%`,
            left: `${5 + (multiplier - 1) * 8}%`,
            transform: 'rotate(-20deg)',
            transition: 'all 0.1s linear',
            animation: 'bounce 0.5s ease-in-out infinite'
          }}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={{
              filter: `drop-shadow(0 0 10px ${colors.primary}) drop-shadow(0 0 20px ${colors.primary}80)`
            }}>
              {/* Airplane body */}
              <path
                d="M 20 50 L 80 30 L 85 35 L 75 50 L 85 65 L 80 70 L 20 50 Z"
                fill={colors.primary}
                stroke={colors.primary}
                strokeWidth="2"
              />
              {/* Wings */}
              <path
                d="M 40 50 L 30 35 L 35 33 L 50 48 Z"
                fill={colors.accent}
                stroke={colors.accent}
                strokeWidth="2"
              />
              <path
                d="M 40 50 L 30 65 L 35 67 L 50 52 Z"
                fill={colors.accent}
                stroke={colors.accent}
                strokeWidth="2"
              />
              {/* Tail */}
              <path
                d="M 20 50 L 15 45 L 18 48 L 20 50 L 18 52 L 15 55 Z"
                fill={colors.secondary}
                stroke={colors.secondary}
                strokeWidth="1"
              />
              {/* Glow effect */}
              <circle cx="50" cy="50" r="35" fill="none" stroke={colors.primary} strokeWidth="1" opacity="0.3">
                <animate attributeName="r" from="35" to="45" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Multiplier Display */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '5rem',
            fontWeight: 900,
            color: colors.primary,
            textShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}80, 0 4px 8px rgba(0,0,0,0.8)`,
            animation: 'pulse 1s ease-in-out infinite'
          }}>
            {multiplier.toFixed(2)}x
          </div>

          {/* Trajectory line */}
          <svg style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <path
              d={`M 0 ${400 - 40} Q ${300} ${400 - 200}, ${600} ${400 - 360}`}
              stroke={colors.primary}
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 5"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Video Area */}
        <div style={{
          flex: '0 0 300px',
          height: '400px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `4px solid ${colors.primary}`,
            boxShadow: `0 0 30px ${colors.primary}50`
          }}>
            {/* Decorative corners */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: `4px solid ${colors.accent}`, borderLeft: `4px solid ${colors.accent}`, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: `4px solid ${colors.accent}`, borderRight: `4px solid ${colors.accent}`, zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: `4px solid ${colors.accent}`, borderLeft: `4px solid ${colors.accent}`, zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: `4px solid ${colors.accent}`, borderRight: `4px solid ${colors.accent}`, zIndex: 2 }} />

            {/* Video */}
              <video
                ref={videoRef}
                autoPlay
                loop={false}
                playsInline
                preload="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="/images/casino.mp4" type="video/mp4" />
              </video>

            {/* Overlay label */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: '#000',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 900,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              zIndex: 2
            }}>
              🎰 LIVE WINNER
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
            border: `8px solid ${colors.primary}`,
            borderRadius: '30px',
            padding: '60px 40px',
            textAlign: 'center',
            maxWidth: '600px',
            width: '90%',
            boxShadow: `0 0 60px ${colors.primary}, inset 0 0 30px rgba(0,0,0,0.3)`,
            position: 'relative',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            {/* Confetti effect */}
            <div style={{ fontSize: '6rem', marginBottom: '20px', animation: 'bounce 1s ease-in-out infinite' }}>
              🎉
            </div>
            
            <h2 style={{
              fontSize: '4rem',
              fontWeight: 900,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              margin: '0 0 20px 0',
              textShadow: `0 0 20px ${colors.primary}, 0 4px 8px rgba(0,0,0,0.8)`,
              animation: 'glow 1.5s ease-in-out infinite'
            }}>
              YOU WON!
            </h2>

            <div style={{
              background: 'rgba(0,0,0,0.5)',
              border: `4px solid ${colors.primary}`,
              borderRadius: '20px',
              padding: '30px',
              margin: '30px 0',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '15px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Your Prize:
              </div>
              <div style={{
                fontSize: '4rem',
                fontWeight: 900,
                color: colors.primary,
                textShadow: `0 0 30px ${colors.primary}`,
                animation: 'pulse 1s ease-in-out infinite'
              }}>
                {winAmount}
              </div>
              <div style={{
                fontSize: '2rem',
                color: 'white',
                marginTop: '10px',
                fontWeight: 'bold'
              }}>
                {multiplier.toFixed(2)}x Multiplier!
              </div>
            </div>

            <button
              onClick={handleClaimBonus}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                color: '#000',
                border: 'none',
                borderRadius: '15px',
                padding: '25px 50px',
                fontSize: '2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: `0 8px 16px rgba(0,0,0,0.3), 0 0 30px ${colors.primary}50`,
                letterSpacing: '3px',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s ease-in-out infinite'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.4), 0 0 50px ${colors.primary}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.3), 0 0 30px ${colors.primary}50`
              }}
            >
              🎁 {cta}
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(-20deg); }
          50% { transform: translateY(-10px) rotate(-20deg); }
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
      `}</style>
    </div>
  )
}

export { renderTemplate } from './server.js'

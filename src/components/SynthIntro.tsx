'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SynthIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState(0) // 0: grid, 1: logo appear, 2: fade out

  useEffect(() => {
    // Grid animation phase
    const gridTimer = setTimeout(() => setPhase(1), 800)
    
    // Logo appear phase
    const logoTimer = setTimeout(() => setPhase(2), 2500)
    
    // Fade out and hide
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = 'auto' // Re-enable scrolling
    }, 3500)

    // Disable scrolling during intro
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(gridTimer)
      clearTimeout(logoTimer)
      clearTimeout(hideTimer)
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ${
        phase === 2 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Retro Grid Floor */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, #1a001a 50%, #000033 100%)',
            transform: 'rotateX(60deg) translateY(50%)',
            transformOrigin: 'center bottom'
          }}
        >
          {/* Horizontal grid lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[2px]"
              style={{
                top: `${i * 5}%`,
                background: `linear-gradient(90deg, transparent, #FF00FF ${50 - i}%, #00FFFF ${50 + i}%, transparent)`,
                boxShadow: '0 0 10px #FF00FF, 0 0 20px #00FFFF',
                opacity: 0.3 + (i * 0.03),
                animation: `pulseGrid ${2 + i * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}

          {/* Vertical grid lines */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                left: `${i * 3.33}%`,
                background: `linear-gradient(180deg, transparent, #00FFFF 50%, transparent)`,
                boxShadow: '0 0 10px #00FFFF',
                opacity: 0.2 + (Math.abs(15 - i) * 0.02),
                animation: `pulseGrid ${2 + (i % 5) * 0.2}s ease-in-out infinite`,
                animationDelay: `${(i % 5) * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Sun/Moon backdrop */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{
          top: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, #FF00FF 0%, #FF0088 30%, transparent 70%)',
          boxShadow: `
            0 0 100px #FF00FF,
            0 0 200px #FF0088,
            0 0 300px #FF00FF,
            inset 0 0 50px rgba(255, 0, 255, 0.5)
          `,
          animation: 'sunPulse 4s ease-in-out infinite',
          borderRadius: '50%'
        }}
      />

      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, transparent 2px, transparent 4px)',
          animation: 'scanlines 8s linear infinite'
        }}
      />

      {/* Logo Container */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
        }`}
      >
        <div className="relative">
          {/* Glow effect behind logo */}
          <div 
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #FF00FF 0%, #00FFFF 50%, transparent 70%)',
              transform: 'scale(2)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
          
          {/* Main Logo */}
          <div className="relative z-10">
            <Image
              src="/images/nano-kit-logo.png"
              alt="Nano Kit"
              width={500}
              height={167}
              className="object-contain"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255, 0, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 255, 255, 0.6))',
              }}
              priority
            />
          </div>

          {/* Subtitle */}
          <div 
            className="text-center mt-8 font-mono text-cyan-400 tracking-[0.5em] text-sm"
            style={{
              textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF',
              animation: 'flicker 0.15s infinite alternate'
            }}
          >
            LANDING PAGE BUILDER
          </div>

          {/* Loading bar */}
          <div className="mt-6 w-64 h-1 bg-black/50 border border-cyan-400/30 overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"
              style={{
                animation: 'loadingBar 2s ease-out forwards',
                boxShadow: '0 0 10px #00FFFF'
              }}
            />
          </div>
        </div>
      </div>

      {/* Particle effects */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#FF00FF' : '#00FFFF',
            boxShadow: `0 0 ${5 + Math.random() * 10}px ${i % 2 === 0 ? '#FF00FF' : '#00FFFF'}`,
            animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.5 + 0.3
          }}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulseGrid {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes sunPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes flicker {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

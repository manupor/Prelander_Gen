'use client'

import Link from 'next/link'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  }

  const logoElement = (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Synth 90's Logo Icon */}
      <div className="relative">
        <svg
          className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'}`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Retro Grid Background */}
          <defs>
            <linearGradient id="nanoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF00FF" />
              <stop offset="50%" stopColor="#00FFFF" />
              <stop offset="100%" stopColor="#FF00FF" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main N Shape with 90's style */}
          <path
            d="M 20 20 L 20 80 L 30 80 L 30 40 L 60 80 L 70 80 L 70 20 L 60 20 L 60 60 L 30 20 Z"
            fill="url(#nanoGradient)"
            filter="url(#glow)"
            className="animate-pulse"
          />
          
          {/* Synth Grid Lines */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="#00FFFF" strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#FF00FF" strokeWidth="0.5" opacity="0.4" />
          
          {/* Corner Accents */}
          <circle cx="15" cy="15" r="2" fill="#00FFFF" className="animate-ping" opacity="0.6" />
          <circle cx="85" cy="15" r="2" fill="#FF00FF" className="animate-ping" opacity="0.6" style={{ animationDelay: '0.5s' }} />
          <circle cx="15" cy="85" r="2" fill="#FF00FF" className="animate-ping" opacity="0.6" style={{ animationDelay: '1s' }} />
          <circle cx="85" cy="85" r="2" fill="#00FFFF" className="animate-ping" opacity="0.6" style={{ animationDelay: '1.5s' }} />
        </svg>
      </div>

      {/* Text Logo with Synth Style */}
      <div className="flex flex-col leading-none">
        <span 
          className={`${sizeClasses[size]} font-bold tracking-wider`}
          style={{
            fontFamily: '"Courier New", monospace',
            textShadow: `
              0 0 10px #FF00FF,
              0 0 20px #FF00FF,
              0 0 30px #00FFFF,
              2px 2px 0px #00FFFF
            `,
            background: 'linear-gradient(90deg, #FF00FF 0%, #00FFFF 50%, #FF00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'synthGradient 3s linear infinite'
          }}
        >
          NANO
        </span>
        <span 
          className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'} font-mono tracking-[0.3em] mt-[-2px]`}
          style={{
            color: '#00FFFF',
            textShadow: '0 0 10px #00FFFF, 0 0 5px #00FFFF',
            letterSpacing: '0.5em'
          }}
        >
          KIT
        </span>
      </div>

      {/* Animated Scan Line */}
      <style jsx>{`
        @keyframes synthGradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="cursor-pointer hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}

'use client'

import Link from 'next/link'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 150, height: 113 },
    lg: { width: 200, height: 150 },
    header: { width: 120, height: 90 }
  }

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={dimensions[size].width} 
        height={dimensions[size].height} 
        viewBox="0 0 200 150" 
        className="object-contain"
      >
        {/* Background Circle */}
        <circle cx="100" cy="75" r="60" fill="url(#gradient1)" />
        
        {/* NANO Text */}
        <text 
          x="100" 
          y="65" 
          textAnchor="middle" 
          className="fill-white font-black text-2xl" 
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          NANO
        </text>
        
        {/* KIT Text */}
        <text 
          x="100" 
          y="90" 
          textAnchor="middle" 
          className="fill-white font-black text-lg" 
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          KIT
        </text>
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B94AFF" />
            <stop offset="50%" stopColor="#4FC3FF" />
            <stop offset="100%" stopColor="#FF76FF" />
          </linearGradient>
        </defs>
      </svg>
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

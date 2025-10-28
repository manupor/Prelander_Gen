'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const [imageError, setImageError] = useState(false)
  
  // Logo real es 572x160 (ratio ~3.6:1)
  // Tamaños optimizados para visibilidad consistente
  const dimensions = {
    sm: { width: 143, height: 40 },      // Small - Footer/Secondary
    md: { width: 172, height: 48 },      // Medium - General use
    lg: { width: 215, height: 60 },      // Large - Hero/Emphasis
    header: { width: 143, height: 40 }   // Header - Navbar (same as sm for consistency)
  }
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    header: 'text-2xl'
  }

  const logoElement = (
    <div className={`flex items-center ${className} hover:scale-105 transition-transform duration-300`}>
      {imageError ? (
        <span className={`${textSizes[size]} font-black bg-gradient-to-r from-[#4FC3FF] via-[#B94AFF] to-[#FF76FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(79,195,255,0.8)]`}
          style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
          ✨ NANO KIT
        </span>
      ) : (
        <Image
          src="/images/logo.png"
          alt="Nano Kit"
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(79, 195, 255, 0.6)) brightness(1.2)',
            maxWidth: '100%',
            height: 'auto'
          }}
          priority
          unoptimized
          onError={(e) => {
            console.error('Logo failed to load:', e);
            setImageError(true);
          }}
        />
      )}
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

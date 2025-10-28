'use client'

import Link from 'next/link'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    header: 'text-2xl'
  }

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <span 
        className={`${textSizes[size]} font-black bg-gradient-to-r from-[#4FC3FF] via-[#B94AFF] to-[#FF76FF] bg-clip-text text-transparent`}
        style={{ 
          fontFamily: 'Space Grotesk, system-ui, sans-serif',
          filter: 'drop-shadow(0 0 20px rgba(79, 195, 255, 0.8))'
        }}>
        ✨ NANO KIT
      </span>
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

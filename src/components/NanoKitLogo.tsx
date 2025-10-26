'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  // Logo real es 4000x3000 (ratio 4:3)
  // Tamaños optimizados para visibilidad consistente
  const dimensions = {
    sm: { width: 160, height: 120 },      // Small - Footer/Secondary
    md: { width: 200, height: 150 },      // Medium - General use
    lg: { width: 280, height: 210 },      // Large - Hero/Emphasis
    header: { width: 160, height: 120 }   // Header - Navbar (same as sm for consistency)
  }

  const logoElement = (
    <div className={`flex items-center ${className} hover:scale-105 transition-transform duration-300`}>
      <Image
        src="/images/nano-kit-logo.png"
        alt="Nano Kit"
        width={dimensions[size].width}
        height={dimensions[size].height}
        className="object-contain"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.5))',
        }}
        priority
      />
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

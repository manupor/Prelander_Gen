'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  // Dimensiones del logo nano-kit-logo.png (4:3 ratio)
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 150, height: 113 },
    lg: { width: 200, height: 150 },
    header: { width: 120, height: 90 }
  }

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/nano-kit-logo.png"
        alt="Nano Kit"
        width={dimensions[size].width}
        height={dimensions[size].height}
        className="object-contain"
        priority
        unoptimized
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

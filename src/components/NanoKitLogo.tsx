'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const dimensions = {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 300, height: 100 }
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

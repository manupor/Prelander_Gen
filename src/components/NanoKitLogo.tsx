'use client'

import Link from 'next/link'
import Image from 'next/image'
import { NANO_KIT_LOGO_BASE64 } from '@/lib/logo-base64'

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
      <img
        src={NANO_KIT_LOGO_BASE64}
        alt="Nano Kit Logo"
        width={dimensions[size].width}
        height={dimensions[size].height}
        className="object-contain"
        style={{
          maxWidth: dimensions[size].width + 'px',
          maxHeight: dimensions[size].height + 'px',
          width: 'auto',
          height: 'auto'
        }}
        onLoad={() => {
          console.log('✅ Logo PNG loaded successfully from base64');
        }}
        onError={() => {
          console.error('❌ Base64 logo failed - this should never happen');
        }}
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

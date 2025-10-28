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
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Dimensiones del logo nano-kit-logo.png (4:3 ratio)
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 150, height: 113 },
    lg: { width: 200, height: 150 },
    header: { width: 120, height: 90 }
  }

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <>
          <Image
            src="/images/nano-kit-logo.png"
            alt="Nano Kit"
            width={dimensions[size].width}
            height={dimensions[size].height}
            className="object-contain"
            priority
            unoptimized
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.error('Logo PNG failed to load, trying alternative');
              setImageError(true);
            }}
            style={{
              display: imageLoaded ? 'block' : 'none'
            }}
          />
          {!imageLoaded && (
            <div className="animate-pulse bg-gray-300 rounded" 
                 style={{ width: dimensions[size].width, height: dimensions[size].height }}>
            </div>
          )}
        </>
      ) : (
        // Fallback: usar img tag directo
        <img
          src="/images/nano-kit-logo.png"
          alt="Nano Kit"
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          onError={() => {
            console.error('Both Image and img failed to load logo');
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

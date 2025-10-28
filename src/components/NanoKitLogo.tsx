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
  
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 150, height: 113 },
    lg: { width: 200, height: 150 },
    header: { width: 120, height: 90 }
  }

  // Múltiples rutas de fallback para el logo
  const logoSources = [
    '/nano-kit-logo.png',
    '/images/nano-kit-logo.png',
    '/images/NANO-WHITE.png'
  ]

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <Image
          src={logoSources[0]}
          alt="Nano Kit"
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          priority
          unoptimized
          onError={() => {
            console.log('Logo failed to load, trying fallback...');
            setImageError(true);
          }}
        />
      ) : (
        // Fallback: usar img tag con múltiples sources
        <img
          src={logoSources[0]}
          alt="Nano Kit"
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            const currentSrc = img.src;
            const currentIndex = logoSources.findIndex(src => currentSrc.includes(src));
            
            if (currentIndex < logoSources.length - 1) {
              const nextSrc = logoSources[currentIndex + 1];
              console.log(`Trying fallback: ${nextSrc}`);
              img.src = nextSrc;
            } else {
              console.error('All logo sources failed');
              // Último fallback: texto
              img.style.display = 'none';
              img.parentElement!.innerHTML = `
                <div class="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                     style="width: ${dimensions[size].width}px; height: ${dimensions[size].height}px;">
                  <span class="text-white font-black text-lg">NANO KIT</span>
                </div>
              `;
            }
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

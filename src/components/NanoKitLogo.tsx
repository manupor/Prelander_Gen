'use client'

import Link from 'next/link'
import Image from 'next/image'

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
        src="/logo.png"
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
        onError={(e) => {
          console.log('❌ Logo failed to load from /logo.png');
          // Fallback: try original path
          const img = e.target as HTMLImageElement;
          if (img.src.includes('/logo.png')) {
            img.src = '/images/nano-kit-logo.png';
          } else {
            // Ultimate fallback: replace with styled div
            img.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white font-bold text-sm';
            fallback.style.width = dimensions[size].width + 'px';
            fallback.style.height = dimensions[size].height + 'px';
            fallback.textContent = 'NANO KIT';
            img.parentNode?.replaceChild(fallback, img);
          }
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

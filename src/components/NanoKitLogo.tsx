'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface NanoKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header'
  href?: string
  className?: string
}

export function NanoKitLogo({ size = 'md', href, className = '' }: NanoKitLogoProps) {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 150, height: 113 },
    lg: { width: 200, height: 150 },
    header: { width: 120, height: 90 }
  }

  // Intentar cargar la imagen después de un delay para dar tiempo al deploy
  useEffect(() => {
    const timer = setTimeout(() => {
      const img = new Image()
      img.onload = () => {
        console.log('✅ Logo loaded successfully')
        setLogoLoaded(true)
      }
      img.onerror = () => {
        console.log('❌ Logo failed to load, using fallback')
        setShowFallback(true)
      }
      img.src = '/images/nano-kit-logo.png'
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const logoElement = (
    <div className={`flex items-center ${className}`}>
      {showFallback ? (
        // Fallback: Logo estilizado que siempre funciona
        <div 
          className="flex items-center justify-center bg-gradient-to-br from-[#B94AFF] via-[#4FC3FF] to-[#FF76FF] rounded-2xl shadow-lg"
          style={{ 
            width: dimensions[size].width, 
            height: dimensions[size].height,
            minWidth: dimensions[size].width,
            minHeight: dimensions[size].height
          }}
        >
          <div className="text-center">
            <div className="text-white font-black text-sm leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              NANO
            </div>
            <div className="text-white font-black text-xs leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              KIT
            </div>
          </div>
        </div>
      ) : (
        // Imagen PNG real
        <img
          src="/images/nano-kit-logo.png"
          alt="Nano Kit"
          width={dimensions[size].width}
          height={dimensions[size].height}
          className="object-contain"
          style={{
            maxWidth: dimensions[size].width,
            maxHeight: dimensions[size].height,
            width: 'auto',
            height: 'auto'
          }}
          onLoad={() => {
            console.log('✅ Image loaded in DOM')
            setLogoLoaded(true)
          }}
          onError={() => {
            console.log('❌ Image failed in DOM, showing fallback')
            setShowFallback(true)
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

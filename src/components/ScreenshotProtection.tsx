'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ScreenshotProtectionProps {
  children: React.ReactNode
  showWatermark?: boolean
}

export default function ScreenshotProtection({ 
  children, 
  showWatermark = true 
}: ScreenshotProtectionProps) {
  const [userEmail, setUserEmail] = useState<string>('Protected')
  const watermarkRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Get user email from Supabase
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 1. Detect PrintScreen key
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen detection
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault()
        navigator.clipboard.writeText('')
        blurScreen()
        return false
      }

      // Prevent common screenshot shortcuts
      if (
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) || // Mac
        (e.key === 'PrintScreen') || // Windows
        (e.metaKey && e.shiftKey && e.key === 's') // Some Linux
      ) {
        e.preventDefault()
        blurScreen()
        return false
      }
    }

    // 2. Detect DevTools
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        blurScreen()
      }
    }

    // 3. Detect window blur (possible screen recording)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        blurScreen()
      }
    }

    // 4. Blur screen temporarily
    const blurScreen = () => {
      if (watermarkRef.current) {
        watermarkRef.current.style.backdropFilter = 'blur(20px)'
        watermarkRef.current.style.background = 'rgba(0, 0, 0, 0.5)'
        
        setTimeout(() => {
          if (watermarkRef.current) {
            watermarkRef.current.style.backdropFilter = 'none'
            watermarkRef.current.style.background = 'transparent'
          }
        }, 2000)
      }
    }

    // 5. Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // 6. Detect screenshot extensions
    const detectExtensions = setInterval(() => {
      detectDevTools()
    }, 1000)

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(detectExtensions)
    }
  }, [])

  // Generate dynamic watermark pattern
  const generateWatermarkText = () => {
    const timestamp = new Date().toISOString().slice(0, 10)
    return `${userEmail} • ${timestamp}`
  }

  return (
    <div className="relative select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* Content */}
      <div 
        className="relative"
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          pointerEvents: 'auto'
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </div>

      {/* Dynamic Watermark Overlay */}
      {showWatermark && (
        <div
          ref={watermarkRef}
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: 'transparent',
            zIndex: 9999,
            mixBlendMode: 'difference'
          }}
        >
          {/* Repeating watermark pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-white/5 font-mono text-xs whitespace-nowrap transform rotate-[-30deg]"
                style={{
                  top: `${(i % 5) * 20}%`,
                  left: `${Math.floor(i / 5) * 25}%`,
                  fontSize: '10px',
                  letterSpacing: '2px',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              >
                {generateWatermarkText()}
              </div>
            ))}
          </div>

          {/* Center watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/10 font-mono text-sm transform rotate-[-30deg] tracking-wider">
              {generateWatermarkText()}
            </div>
          </div>

          {/* Hidden tracking metadata */}
          <div 
            className="hidden"
            data-email={userEmail}
            data-timestamp={Date.now()}
          />
        </div>
      )}

      {/* Screenshot Detection Warning */}
      <div
        id="screenshot-warning"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl opacity-0 pointer-events-none transition-opacity duration-300 z-[10000]"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-semibold">Screenshot attempt detected</span>
        </div>
      </div>

      {/* CSS to prevent text selection and dragging */}
      <style jsx>{`
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }

        /* Prevent screenshot extensions from highlighting */
        ::selection {
          background: transparent;
          color: inherit;
        }

        ::-moz-selection {
          background: transparent;
          color: inherit;
        }
      `}</style>
    </div>
  )
}

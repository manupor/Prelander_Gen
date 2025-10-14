import { BrandConfig } from '@/lib/types'
import { useEffect, useRef } from 'react'

interface T10Props {
  brand: BrandConfig
}

function Template10({ brand }: T10Props) {
  const brandName = brand.brandName || 'Castle Slot'
  const headline = brand.copy?.headline || 'WIN BIG TODAY!'
  const logoUrl = brand.logoUrl || ''
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-play the game
  useEffect(() => {
    const autoPlayGame = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          // Send message to iframe to auto-play
          iframeRef.current.contentWindow.postMessage({ action: 'autoPlay' }, '*')
        } catch (error) {
          console.log('Auto-play will be handled by iframe')
        }
      }
    }

    // Wait for iframe to load, then start auto-play
    const timer = setTimeout(autoPlayGame, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 to-transparent"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Casino Brand Logo - Compact for Better Game Experience */}
        {logoUrl && (
          <div className="text-center py-2 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
            <div className="inline-flex items-center gap-3 bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-2xl px-4 py-2 border border-yellow-400/40 shadow-xl hover:border-yellow-400/60 transition-all duration-300">
              <div className="bg-white/95 rounded-lg p-2 shadow-inner">
                <img 
                  src={logoUrl} 
                  alt={`${brandName} Casino Logo`} 
                  className="h-8 w-auto drop-shadow-lg filter brightness-110 max-w-[160px]"
                />
              </div>
              <div className="flex items-center px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
                <span className="text-yellow-300 text-xs font-bold tracking-wide">🎰 PARTNER</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Wooden Banner - Compact */}
        <div className="relative flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-900 border-b-2 border-amber-950 shadow-lg">
          {/* Decorative nails */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-amber-950 rounded-full border border-amber-700"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-amber-950 rounded-full border border-amber-700"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-amber-950 rounded-full border border-amber-700"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-amber-950 rounded-full border border-amber-700"></div>

          <h1 className="text-2xl md:text-3xl font-black text-yellow-400 text-center drop-shadow-[0_2px_10px_rgba(255,215,0,0.5)]">
            {headline}
          </h1>
        </div>

        {/* Game iframe container */}
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src="/CastleSlot/index.html"
            title="Castle Slot Game"
            className="w-full h-full border-none"
            allowFullScreen
          />
          
          {/* Video Player - Bottom Right Corner */}
          <div className="absolute bottom-4 right-4 z-50 group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/80 bg-gradient-to-br from-amber-900 to-amber-950">
              {/* Decorative frame corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-yellow-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-yellow-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-yellow-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-yellow-300"></div>
              
              {/* Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-64 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              >
                <source src="/images/casino .mp4" type="video/mp4" />
              </video>
              
              {/* Overlay label */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-lg border border-yellow-300">
                🎰 LIVE WINNER
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Template10 }
export { renderTemplate } from './server'

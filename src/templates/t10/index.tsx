import { BrandConfig } from '@/lib/types'

interface T10Props {
  brand: BrandConfig
}

function Template10({ brand }: T10Props) {
  const brandName = brand.brandName || 'Castle Slot'
  const headline = brand.copy?.headline || 'WIN BIG TODAY!'
  const logoUrl = brand.logoUrl || ''

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
            src="/CastleSlot/index.html"
            title="Castle Slot Game"
            className="w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export { Template10 }
export { renderTemplate } from './server'

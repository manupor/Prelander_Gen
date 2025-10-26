'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function DemoPreviewContent() {
  const searchParams = useSearchParams()
  
  const headline = searchParams.get('headline') || 'WIN BIG TODAY!'
  const subheadline = searchParams.get('subheadline') || 'Get your welcome bonus now'
  const cta = searchParams.get('cta') || 'CLAIM BONUS'
  const ctaUrl = searchParams.get('ctaUrl') || '#'
  const primaryColor = searchParams.get('primaryColor') || '#4a90e2'
  const secondaryColor = searchParams.get('secondaryColor') || '#7b68ee'

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl animate-fadeInUp">
          {headline}
        </h1>
        <p className="text-2xl md:text-3xl text-white/90 mb-12 drop-shadow-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {subheadline}
        </p>
        <a
          href={ctaUrl}
          className="inline-block px-12 py-5 text-2xl font-black text-white bg-black/30 hover:bg-black/50 backdrop-blur-xl rounded-2xl transition-all hover:scale-110 shadow-2xl animate-fadeInUp border-2 border-white/30"
          style={{ animationDelay: '0.4s' }}
        >
          {cta}
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default function DemoPreview() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <DemoPreviewContent />
    </Suspense>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { NexusLogo } from '@/components/NexusLogo'

interface TemplateNavigationProps {
  brandName?: string
  showDashboard?: boolean
}

export function TemplateNavigation({ brandName, showDashboard = true }: TemplateNavigationProps) {
  const router = useRouter()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <NexusLogo size="sm" href="/" />
            {brandName && (
              <div className="hidden sm:block border-l border-slate-600 pl-4">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {brandName}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg transition-all duration-300"
            >
              🏠 Home
            </Button>
            {showDashboard && (
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm font-semibold shadow-lg transition-all duration-300"
              >
                📊 Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

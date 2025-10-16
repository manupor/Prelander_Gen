'use client'

import { NexusLogo } from '@/components/NexusLogo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TestDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-hidden relative">
      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <NexusLogo size="md" href="/" />
              <div className="border-l border-slate-600 pl-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Test Dashboard
                </h2>
                <p className="text-sm text-slate-400">Testing connection</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 shadow-2xl shadow-purple-500/10">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-white font-black text-3xl">⚡</div>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Dashboard Test</h3>
            <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
              This is a test page to verify the dashboard is working without database connections.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">✅ React components loading</p>
              <p className="text-sm text-slate-400">✅ Styling working</p>
              <p className="text-sm text-slate-400">✅ Navigation functional</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

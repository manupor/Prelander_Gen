'use client'

import { useEffect, useState } from 'react'

export function DiagnosticInfo() {
  const [diagnostics, setDiagnostics] = useState<{
    supabaseUrl: string
    hasValidUrl: boolean
    hasValidKey: boolean
    nodeEnv: string
  } | null>(null)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'NOT_SET'
    
    setDiagnostics({
      supabaseUrl,
      hasValidUrl: supabaseUrl !== 'NOT_SET' && supabaseUrl !== 'https://placeholder.supabase.co',
      hasValidKey: supabaseKey !== 'NOT_SET' && supabaseKey !== 'placeholder-key',
      nodeEnv: process.env.NODE_ENV || 'unknown'
    })
  }, [])

  if (!diagnostics) return null

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg text-xs font-mono mb-4">
      <h3 className="text-sm font-bold mb-2">🔧 Configuration Diagnostics</h3>
      <div className="space-y-1">
        <div>Environment: <span className="text-yellow-400">{diagnostics.nodeEnv}</span></div>
        <div>Supabase URL: <span className={diagnostics.hasValidUrl ? 'text-green-400' : 'text-red-400'}>
          {diagnostics.hasValidUrl ? '✅ Configured' : '❌ Missing/Invalid'}
        </span></div>
        <div>Supabase Key: <span className={diagnostics.hasValidKey ? 'text-green-400' : 'text-red-400'}>
          {diagnostics.hasValidKey ? '✅ Configured' : '❌ Missing/Invalid'}
        </span></div>
        {!diagnostics.hasValidUrl && (
          <div className="text-red-400 mt-2">
            Current URL: {diagnostics.supabaseUrl}
          </div>
        )}
      </div>
    </div>
  )
}

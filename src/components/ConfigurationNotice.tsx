'use client'

import { useState, useEffect } from 'react'

export function ConfigurationNotice() {
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Check if environment variables are properly configured
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
    
    if (!isConfigured) {
      setShowNotice(true)
    }
  }, [])

  if (!showNotice) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Configuration Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              This is a demo deployment. To enable full functionality including user authentication and site generation, 
              please configure the required environment variables in your deployment settings.
            </p>
            <div className="mt-2">
              <p className="font-medium">Required variables:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li><code className="text-xs bg-yellow-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                <li><code className="text-xs bg-yellow-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                <li><code className="text-xs bg-yellow-100 px-1 rounded">OPENAI_API_KEY</code> (optional)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

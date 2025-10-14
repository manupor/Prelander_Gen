'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface LogoUploaderProps {
  onUpload: (url: string) => void
  currentUrl?: string
}

export function LogoUploader({ onUpload, currentUrl }: LogoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onUpload(result.data.url)
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: false,
  })

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onUpload(result.data.url)
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      onUpload(urlInput.trim())
      setUrlInput('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Current Logo Preview */}
      {currentUrl && (
        <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-xl border border-slate-600 shadow-sm">
          <div className="relative">
            <img
              src={currentUrl}
              alt="Current logo"
              className="w-16 h-16 object-contain bg-white rounded-lg border-2 border-slate-300 shadow-md"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">✅ Logo uploaded successfully</p>
            <p className="text-xs text-gray-300">Upload a new one to replace the current logo</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-purple-500 bg-purple-900/20 scale-105 shadow-lg'
            : 'border-slate-600 hover:border-purple-400 hover:bg-slate-800/50 hover:shadow-md'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragActive ? 'bg-purple-900/30' : 'bg-slate-800/50'
          }`}>
            <svg
              className={`h-8 w-8 transition-colors ${
                isDragActive ? 'text-purple-400' : 'text-gray-400'
              }`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className={`text-sm font-medium transition-colors ${
              isDragActive ? 'text-purple-300' : 'text-gray-300'
            }`}>
              {isDragActive
                ? '🎯 Drop your logo here!'
                : '📁 Drag & drop your logo, or click to browse'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              📏 PNG, SVG, JPEG up to 2MB • Perfect for your prelander
            </p>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
              <div className="absolute inset-0 rounded-full border-2 border-slate-600"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-purple-300">🚀 Uploading your logo...</p>
              <p className="text-xs text-gray-400">This will only take a moment</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-900/50 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-red-300">❌ Upload failed</p>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* URL Input Alternative */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800 text-gray-400">Or paste a URL</span>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm transition-all duration-300"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleUrlSubmit(e as React.FormEvent)
            }
          }}
        />
        <Button 
          type="button" 
          onClick={handleUrlSubmit}
          disabled={!urlInput.trim()}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-lg shadow-purple-500/25 py-3 rounded-2xl font-semibold"
        >
          Use URL
        </Button>
      </div>
    </div>
  )
}

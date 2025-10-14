'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  currentUrl?: string
  label?: string
  placeholder?: string
}

export function ImageUploader({ onUpload, currentUrl, label = "Image", placeholder = "Upload an image" }: ImageUploaderProps) {
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
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  })

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      onUpload(urlInput.trim())
      setUrlInput('')
    }
  }

  return (
    <div className="space-y-3">
      {/* Current Image Preview */}
      {currentUrl && (
        <div className="relative group">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900/50 border border-slate-600">
            <img
              src={currentUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
            <p className="text-white text-sm font-medium">Click to replace</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-cyan-500 bg-cyan-900/20 scale-105'
            : 'border-slate-600 hover:border-cyan-400 hover:bg-slate-800/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isDragActive ? 'bg-cyan-900/30' : 'bg-slate-800/50'
          }`}>
            <svg
              className={`h-6 w-6 transition-colors ${
                isDragActive ? 'text-cyan-400' : 'text-gray-400'
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
              isDragActive ? 'text-cyan-300' : 'text-gray-300'
            }`}>
              {isDragActive
                ? `Drop ${label.toLowerCase()} here!`
                : placeholder}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPEG, WebP up to 5MB
            </p>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-500 border-t-transparent"></div>
            <p className="text-sm font-medium text-cyan-300">Uploading {label.toLowerCase()}...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4">
          <p className="text-sm font-medium text-red-300">❌ {error}</p>
        </div>
      )}

      {/* URL Input Alternative */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800 text-gray-400">Or paste URL</span>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 backdrop-blur-sm transition-all duration-300"
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
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0 shadow-lg shadow-cyan-500/25 py-3 rounded-xl font-semibold"
        >
          Use URL
        </Button>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Eye, ArrowLeft, Palette, Type, ChevronDown, ChevronUp, Lock, Download, X } from 'lucide-react'
import Link from 'next/link'

// Demo template data
const DEMO_TEMPLATE = {
  id: 't6',
  name: 'Classic Overlay',
  preview: '/templates/t6-preview.png'
}

const LOCKED_TEMPLATES = [
  { id: 't7', name: 'Sweet Bonanza', preview: '/templates/t7-preview.png' },
  { id: 't9', name: 'FisherMan Slot', preview: '/templates/t9-preview.png' },
  { id: 't10', name: 'FisherMan Slot 2', preview: '/templates/t10-preview.png' },
  { id: 't11', name: 'Aviator Crash', preview: '/templates/t11-preview.png' },
  { id: 't12', name: 'Scratch & Win', preview: '/templates/t12-preview.png' },
  { id: 't13', name: 'Castle Slot', preview: '/templates/t13-preview.png' },
]

export default function TryEditorPage() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState({
    template: false,
    content: true,
    colors: false,
  })
  
  // Demo fields
  const [headline, setHeadline] = useState('WIN BIG TODAY!')
  const [subheadline, setSubheadline] = useState('Get your welcome bonus now')
  const [cta, setCta] = useState('CLAIM BONUS')
  const [ctaUrl, setCtaUrl] = useState('https://example.com')
  const [primaryColor, setPrimaryColor] = useState('#4a90e2')
  const [secondaryColor, setSecondaryColor] = useState('#7b68ee')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showLockedModal, setShowLockedModal] = useState(false)

  const toggleSection = (section: 'template' | 'content' | 'colors') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getPreviewUrl = () => {
    const params = new URLSearchParams({
      templateId: DEMO_TEMPLATE.id,
      headline,
      subheadline,
      cta,
      ctaUrl,
      primaryColor,
      secondaryColor,
      demo: 'true'
    })
    return `/demo-preview?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] py-3 text-center text-white font-bold text-sm">
        🎨 DEMO MODE - Sign up to unlock all templates and download your pages
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              </Link>
              <div className="h-6 w-px bg-white/20" />
              <h1 className="text-xl font-bold text-white">Try Editor Demo</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDownloadModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] text-white font-bold hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <Link href="/signup">
                <button className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition-all">
                  Sign Up Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/10 bg-black/20 backdrop-blur-xl overflow-y-auto">
          <div className="p-6 space-y-4">
            
            {/* Template Section */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
              <button
                onClick={() => toggleSection('template')}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-[#4FC3FF]" />
                  <span className="font-semibold text-white">Template</span>
                </div>
                {expandedSections.template ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
              </button>
              
              {expandedSections.template && (
                <div className="p-4 space-y-3 border-t border-white/10">
                  {/* Demo Template */}
                  <div className="border-2 border-[#4FC3FF] rounded-xl p-3 bg-[#4FC3FF]/10">
                    <div className="text-sm font-semibold text-white mb-2">✓ {DEMO_TEMPLATE.name}</div>
                    <div className="text-xs text-white/60">Demo Template - Free to try</div>
                  </div>
                  
                  {/* Locked Templates */}
                  {LOCKED_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setShowLockedModal(true)}
                      className="w-full border border-white/20 rounded-xl p-3 bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white/50 group-hover:text-white/70 transition-colors">
                          {template.name}
                        </div>
                        <Lock className="w-4 h-4 text-white/30 group-hover:text-[#B94AFF] transition-colors" />
                      </div>
                      <div className="text-xs text-white/40 mt-1">Sign up to unlock</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
              <button
                onClick={() => toggleSection('content')}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-[#4FC3FF]" />
                  <span className="font-semibold text-white">Content & Text</span>
                </div>
                {expandedSections.content ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
              </button>
              
              {expandedSections.content && (
                <div className="p-4 space-y-4 border-t border-white/10">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#4FC3FF] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Subheadline
                    </label>
                    <input
                      type="text"
                      value={subheadline}
                      onChange={(e) => setSubheadline(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#4FC3FF] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#4FC3FF] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Button URL
                    </label>
                    <input
                      type="url"
                      value={ctaUrl}
                      onChange={(e) => setCtaUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#4FC3FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Colors Section */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
              <button
                onClick={() => toggleSection('colors')}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-[#4FC3FF]" />
                  <span className="font-semibold text-white">Colors</span>
                </div>
                {expandedSections.colors ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
              </button>
              
              {expandedSections.colors && (
                <div className="p-4 space-y-4 border-t border-white/10">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#4FC3FF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#4FC3FF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-slate-900 overflow-hidden">
          <iframe
            src={getPreviewUrl()}
            className="w-full h-full"
            title="Preview"
          />
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900/20 border border-white/20 rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#B94AFF] to-[#4FC3FF] flex items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Sign Up to Download</h2>
              <p className="text-white/70 text-lg">
                Create a free account to download your landing page and unlock all templates.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4FC3FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#4FC3FF] text-sm">✓</span>
                </div>
                <div className="text-white/80 text-sm">Download production-ready HTML/CSS</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4FC3FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#4FC3FF] text-sm">✓</span>
                </div>
                <div className="text-white/80 text-sm">Access to all 12+ premium templates</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4FC3FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#4FC3FF] text-sm">✓</span>
                </div>
                <div className="text-white/80 text-sm">Free hosting on global CDN</div>
              </div>
            </div>

            <Link href="/signup">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] text-white font-black text-lg hover:scale-105 transition-all">
                Create Free Account →
              </button>
            </Link>
            
            <div className="text-center mt-4">
              <Link href="/login" className="text-white/50 hover:text-white text-sm transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Locked Template Modal */}
      {showLockedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900/20 border border-white/20 rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowLockedModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#B94AFF] to-[#4FC3FF] flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Template Locked</h2>
              <p className="text-white/70 text-lg">
                Sign up for free to unlock all premium templates and create unlimited landing pages.
              </p>
            </div>

            <Link href="/signup">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] text-white font-black text-lg hover:scale-105 transition-all mb-3">
                Unlock All Templates →
              </button>
            </Link>
            
            <button
              onClick={() => setShowLockedModal(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
            >
              Continue with Demo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

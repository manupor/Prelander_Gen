'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, Eye, ArrowLeft, Palette, Type, Image as ImageIcon, Link as LinkIcon, ChevronDown, ChevronUp, Layers, FileText, Scale } from 'lucide-react'
import { EditorTour } from '@/components/EditorTour'

interface SiteData {
  id: string
  slug: string
  template_id: string
  brand_name: string
  headline: string
  subheadline: string
  cta: string
  primary_color: string
  secondary_color: string
  accent_color: string
  logo_url: string | null
  cta_url: string | null
  generated_html: string
}

export default function SiteEditorPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [site, setSite] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    vertical: false,
    template: false,
    logo: false,
    content: false,
    colors: false,
    legal: false
  })
  
  // Editable fields
  const [headline, setHeadline] = useState('')
  const [cta, setCta] = useState('')
  const [ctaUrl, setCtaUrl] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#4a90e2')
  const [secondaryColor, setSecondaryColor] = useState('#7b68ee')
  const [accentColor, setAccentColor] = useState('#ffd700')
  const [logoUrl, setLogoUrl] = useState('')
  const [popupTitle, setPopupTitle] = useState('WINNER!')
  const [popupMessage, setPopupMessage] = useState('Congratulations! You\'ve won!')
  const [popupPrize, setPopupPrize] = useState('$1,000 + 50 FREE SPINS')
  const [gameBalance, setGameBalance] = useState(1000)
  const [gameLogo, setGameLogo] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [vertical, setVertical] = useState('casino')
  const [templateId, setTemplateId] = useState('t10')
  const [termsUrl, setTermsUrl] = useState('')
  const [privacyUrl, setPrivacyUrl] = useState('')
  const [responsibleGamingUrl, setResponsibleGamingUrl] = useState('')
  const [previewMode, setPreviewMode] = useState<'live' | 'template'>('live')
  const [showTour, setShowTour] = useState(false)

  const toggleSection = (section: 'vertical' | 'template' | 'logo' | 'content' | 'colors' | 'legal') => {
    const isExpanding = !expandedSections[section]
    
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
    
    // Switch to template preview mode when template section is expanded
    if (section === 'template' && isExpanding) {
      setPreviewMode('template')
    }
    
    // Switch back to live preview when other sections are expanded
    if (section !== 'template' && isExpanding && previewMode === 'template') {
      setPreviewMode('live')
    }
  }

  const collapseAll = () => {
    setExpandedSections({
      vertical: false,
      template: false,
      logo: false,
      content: false,
      colors: false,
      legal: false
    })
  }

  const expandAll = () => {
    setExpandedSections({
      vertical: true,
      template: true,
      logo: true,
      content: true,
      colors: true,
      legal: true
    })
  }

  const areAllExpanded = Object.values(expandedSections).every(val => val === true)
  const areAllCollapsed = Object.values(expandedSections).every(val => val === false)

  useEffect(() => {
    loadSite()
    
    // Verificar si es la primera vez que el usuario ve el editor
    const hasSeenTour = localStorage.getItem('hasSeenEditorTour')
    if (!hasSeenTour) {
      // Esperar a que se cargue la página antes de mostrar el tour
      setTimeout(() => setShowTour(true), 1000)
    }
  }, [slug])

  const handleTourComplete = () => {
    localStorage.setItem('hasSeenEditorTour', 'true')
    setShowTour(false)
  }

  const handleTourSkip = () => {
    localStorage.setItem('hasSeenEditorTour', 'true')
    setShowTour(false)
  }

  const tourSteps = [
    {
      target: '[data-tour="quick-actions"]',
      title: 'Quick Actions Panel',
      content: 'Here you can expand or collapse all editor sections with a single click.',
      position: 'right' as const
    },
    {
      target: '[data-tour="template-section"]',
      title: 'Template Selection',
      content: 'Choose from different pre-designed templates for your landing page. Each template has a unique style.',
      position: 'right' as const
    },
    {
      target: '[data-tour="logo-section"]',
      title: 'Brand Logo',
      content: 'Upload your brand logo to personalize it. Accepted formats are PNG, JPG and SVG.',
      position: 'right' as const
    },
    {
      target: '[data-tour="content-section"]',
      title: 'Content & Text',
      content: 'Customize the main texts: headline, subheadline, and the call-to-action button text (CTA).',
      position: 'right' as const
    },
    {
      target: '[data-tour="colors-section"]',
      title: 'Brand Colors',
      content: 'Customize the primary, secondary and accent colors to match your brand.',
      position: 'right' as const
    },
    {
      target: '[data-tour="preview"]',
      title: 'Live Preview',
      content: 'All your changes are reflected here instantly. You can see exactly how your page will look.',
      position: 'left' as const
    },
    {
      target: '[data-tour="save-btn"]',
      title: 'Save Changes',
      content: 'Don\'t forget to save! Click here when you\'re satisfied with your design.',
      position: 'bottom' as const
    },
    {
      target: '[data-tour="preview-btn"]',
      title: 'External Preview',
      content: 'Open your page in a new tab to see it exactly as your visitors will.',
      position: 'bottom' as const
    }
  ]

  // Listen for close message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'closePopup') {
        setIsPopupOpen(false)
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Reopen popup after iframe reloads if it was open
  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => {
        const iframe = document.querySelector('iframe') as HTMLIFrameElement
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage('showPopup', '*')
        }
      }, 800) // Increased wait time for iframe to fully load
      
      return () => clearTimeout(timer)
    }
  }, [headline, cta, ctaUrl, primaryColor, secondaryColor, accentColor, logoUrl, popupTitle, popupMessage, popupPrize, isPopupOpen])

  const loadSite = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error

      setSite(data)
      setHeadline(data.headline || 'YOUR TITLE HERE')
      setCta(data.cta || 'PLAY NOW')
      setCtaUrl(data.cta_url || 'https://example.com')
      setPrimaryColor(data.primary_color || '#4a90e2')
      setSecondaryColor(data.secondary_color || '#7b68ee')
      setAccentColor(data.accent_color || '#ffd700')
      setLogoUrl(data.logo_url || '')
      setPopupTitle(data.popup_title || 'WINNER!')
      setPopupMessage(data.popup_message || 'Congratulations! You\'ve won!')
      setPopupPrize(data.popup_prize || '$1,000 + 50 FREE SPINS')
      setGameBalance(data.game_balance || 1000)
      setVertical(data.vertical || 'casino')
      setTemplateId(data.template_id || 't10')
      setTermsUrl(data.terms_url || '')
      setPrivacyUrl(data.privacy_url || '')
      setResponsibleGamingUrl(data.responsible_gaming_url || '')
    } catch (error) {
      console.error('Error loading site:', error)
      alert('Failed to load site')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB')
      return
    }

    setUploadingLogo(true)
    try {
      const supabase = createClient()
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}-logo-${Date.now()}.${fileExt}`
      const filePath = `logos/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath)

      setLogoUrl(publicUrl)
      alert('Logo uploaded successfully!')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(`Failed to upload logo: ${error.message}`)
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      
      // Prepare update data
      const updateData: any = {
        headline,
        cta,
        cta_url: ctaUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        logo_url: logoUrl || null
      }
      
      // Try to add popup fields and game balance (they might not exist in DB yet)
      try {
        updateData.popup_title = popupTitle
        updateData.popup_message = popupMessage
        updateData.popup_prize = popupPrize
        updateData.game_balance = gameBalance
        updateData.template_id = templateId
      } catch (e) {
        console.warn('Popup fields or game_balance not available in database yet')
      }
      
      const { error } = await supabase
        .from('sites')
        .update(updateData)
        .eq('slug', slug)

      if (error) {
        console.error('Save error:', error)
        throw error
      }

      // Regenerate HTML with new values
      const regenerateResponse = await fetch('/api/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ slug }),
      })

      if (!regenerateResponse.ok) {
        console.warn('Failed to regenerate HTML, but data was saved')
      }

      alert('Changes saved successfully!')
      await loadSite() // Reload to get updated HTML
    } catch (error: any) {
      console.error('Error saving:', error)
      alert(`Failed to save changes: ${error.message || 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const getPreviewUrl = () => {
    if (!site) return ''
    
    // Build preview URL with current values
    const params = new URLSearchParams({
      templateId,
      headline,
      cta,
      ctaUrl,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl: logoUrl || '',
      popupTitle,
      popupMessage,
      popupPrize,
      gameBalance: gameBalance.toString()
    })
    
    return `/sites/${slug}?${params.toString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Site not found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-400 hover:text-blue-300"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-inter">
        {/* NetFusion Neon Top Bar */}
        <div className="bg-dark-surface border-b border-neon-primary/20 px-6 py-4 flex items-center justify-between shadow-neon">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="text-text-muted hover:text-white transition-colors flex items-center gap-2 px-3 py-2 bg-darker-surface hover:bg-neon-primary/20 rounded-lg"
            title="Go to Home"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-neon-primary hover:text-neon-secondary transition-colors flex items-center gap-2 px-3 py-2 bg-neon-primary/10 hover:bg-neon-primary/20 rounded-lg border border-neon-primary/30"
            title="Go to Dashboard"
          >
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">📊</span>
          </button>
          <div className="border-l border-neon-primary/30 pl-4">
            <h1 className="text-white font-semibold font-inter">{site.brand_name}</h1>
            <p className="text-sm text-text-muted font-inter">Template Editor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            data-tour="preview-btn"
            onClick={() => window.open(getPreviewUrl(), '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-darker-surface hover:bg-neon-primary/20 text-neon-primary hover:text-white rounded-lg transition-colors border border-neon-primary/30"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            data-tour="save-btn"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-secondary hover:to-neon-primary text-black rounded-lg transition-colors disabled:opacity-50 shadow-neon font-semibold"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* NetFusion Neon Left Panel - Controls */}
        <div className="w-80 bg-dark-surface border-r border-neon-primary/20 overflow-y-auto">
          <div className="p-6 space-y-4">
            
            {/* NetFusion Quick Actions */}
            <div data-tour="quick-actions" className="bg-darker-surface rounded-lg p-3 border border-neon-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neon-primary font-inter">Quick Actions</span>
                <span className="text-xs text-text-muted">
                  {Object.values(expandedSections).filter(v => v).length}/6 open
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  disabled={areAllExpanded}
                  className="flex-1 px-3 py-2 bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronDown size={14} />
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  disabled={areAllCollapsed}
                  className="flex-1 px-3 py-2 bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white text-xs rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronUp size={14} />
                  Collapse All
                </button>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('hasSeenEditorTour')
                  setShowTour(true)
                }}
                className="w-full mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors flex items-center justify-center gap-1"
              >
                🎯 Show Tour
              </button>
            </div>
            
            {/* Vertical Section */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('vertical')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-orange-400" />
                  <h3 className="text-sm font-semibold text-white">Vertical</h3>
                </div>
                {expandedSections.vertical ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.vertical && (
                <div className="p-4 space-y-4 border-t border-gray-700">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      Select the industry vertical for your campaign
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Industry Vertical
                    </label>
                    <select
                      value={vertical}
                      onChange={(e) => setVertical(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="casino">🎰 Casino & Gaming</option>
                      <option value="sports">⚽ Sports Betting</option>
                      <option value="forex">💹 Forex & Trading</option>
                      <option value="crypto">₿ Cryptocurrency</option>
                      <option value="ecommerce">🛍️ E-commerce</option>
                      <option value="finance">💰 Finance</option>
                      <option value="health">🏥 Health & Wellness</option>
                      <option value="other">📦 Other</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose the best fit for your offer</p>
                  </div>
                </div>
              )}
            </div>

            {/* Template Section */}
            <div data-tour="template-section" className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('template')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-pink-400" />
                  <h3 className="text-sm font-semibold text-white">Template</h3>
                </div>
                {expandedSections.template ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.template && (
                <div className="p-4 space-y-4 border-t border-gray-700">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      Choose the template design for your landing page
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Template Options - Compact List */}
                    {[
                      { id: 't6', name: 'Classic Overlay', desc: 'Traditional popup overlay', preview: '/templates/t6-preview.svg' },
                      { id: 't7', name: 'Sweet Bonanza', desc: 'Colorful slot theme', preview: '/templates/t7-preview.svg' },
                      { id: 't9', name: 'Pirate Slots', desc: 'Adventure pirate theme', preview: '/templates/t9-preview.png' },
                      { id: 't10', name: 'Castle Slot', desc: 'Medieval castle theme', preview: '/templates/t10-preview.png' },
                      { id: 't11', name: 'Scratch & Win', desc: 'Interactive scratch card game', preview: '/templates/t11-preview.svg' }
                    ].map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setTemplateId(template.id)
                          setPreviewMode('template')
                        }}
                        className={`w-full text-left p-2 rounded-lg border transition-all ${
                          templateId === template.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Small Thumbnail - Left */}
                          <div className="relative w-16 h-12 bg-gray-950 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={template.preview}
                              alt={template.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"><span class="text-white font-bold text-xs">${template.id.toUpperCase()}</span></div>`
                                }
                              }}
                            />
                          </div>
                          
                          {/* Template Info - Right */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-white truncate">{template.name}</h4>
                              {templateId === template.id && (
                                <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">✓</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 truncate">{template.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Preview Mode Toggle */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-2">
                        <strong className="text-white">Preview:</strong> See the selected template in the right panel
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewMode('template')}
                          className={`flex-1 px-3 py-2 text-xs rounded transition-all ${
                            previewMode === 'template'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          📋 Template Preview
                        </button>
                        <button
                          onClick={() => setPreviewMode('live')}
                          className={`flex-1 px-3 py-2 text-xs rounded transition-all ${
                            previewMode === 'live'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          👁️ Live Preview
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                    <p className="text-xs text-blue-300">
                      💡 <strong>Note:</strong> Changing the template will require regenerating the page
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Logo Section */}
            <div data-tour="logo-section" className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('logo')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon size={18} className="text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Logo</h3>
                </div>
                {expandedSections.logo ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.logo && (
                <div className="p-4 space-y-4 border-t border-gray-700">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      🎰 <strong className="text-cyan-300">Perfect for iGaming Affiliates:</strong> Add your casino partner's logo to build trust and brand recognition. The logo appears prominently at the top with an "Official Partner" badge.
                    </p>
                  </div>

                  {/* Upload from Computer */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Upload Logo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className={`flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg cursor-pointer transition-all ${
                          uploadingLogo ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {uploadingLogo ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <ImageIcon size={14} />
                            Choose File
                          </>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Max 2MB • PNG, JPG, GIF
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-gray-800 text-gray-500">OR</span>
                    </div>
                  </div>
                  
                  {/* URL Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Logo Image URL
                    </label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  {logoUrl && (
                    <div className="pt-2">
                      <p className="text-xs text-gray-400 mb-2">Preview:</p>
                      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg p-4 flex items-center justify-center min-h-[80px]">
                        <img
                          src={logoUrl}
                          alt="Logo preview"
                          className="max-h-12 max-w-[140px] object-contain"
                          onError={(e) => {
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              parent.innerHTML = '<div class="text-center"><p class="text-red-400 text-xs">❌ Failed to load</p></div>'
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {!logoUrl && (
                    <div className="pt-2">
                      <div className="bg-gray-900 rounded-lg p-4 text-center">
                        <ImageIcon size={24} className="mx-auto text-gray-600 mb-1" />
                        <p className="text-xs text-gray-500">No logo set</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div data-tour="content-section" className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('content')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Type size={18} className="text-green-400" />
                  <h3 className="text-sm font-semibold text-white">Content</h3>
                </div>
                {expandedSections.content ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.content && (
              <div className="p-4 space-y-4 border-t border-gray-700">
                {/* Main Content Section */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Game Title
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="YOUR TITLE HERE"
                  />
                  <p className="text-xs text-gray-500 mt-1">Appears above the game</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    💰 Game Balance
                  </label>
                  <input
                    type="number"
                    value={gameBalance}
                    onChange={(e) => setGameBalance(parseInt(e.target.value) || 1000)}
                    min="0"
                    step="100"
                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Starting balance shown in the game</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2 flex items-center gap-1">
                    <LinkIcon size={12} />
                    Destination URL
                  </label>
                  <input
                    type="url"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://your-casino.com/signup"
                  />
                  <p className="text-xs text-gray-500 mt-1">Where users go when they click the popup button</p>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-medium text-gray-300">
                      🎉 Win Popup
                    </label>
                    <button
                      onClick={() => {
                        setIsPopupOpen(true)
                        const iframe = document.querySelector('iframe') as HTMLIFrameElement
                        if (iframe && iframe.contentWindow) {
                          iframe.contentWindow.postMessage('showPopup', '*')
                        }
                      }}
                      className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
                    >
                      👁️ Preview
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Appears after 2 clicks on the game
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={popupTitle}
                        onChange={(e) => setPopupTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500"
                        placeholder="WINNER!"
                      />
                      <p className="text-xs text-gray-500 mt-1">Large bold text at the top</p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <input
                        type="text"
                        value={popupMessage}
                        onChange={(e) => setPopupMessage(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Congratulations! You've won!"
                      />
                      <p className="text-xs text-gray-500 mt-1">Subtitle below the title</p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Prize Display
                      </label>
                      <input
                        type="text"
                        value={popupPrize}
                        onChange={(e) => setPopupPrize(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500"
                        placeholder="$1,000 + 50 FREE SPINS"
                      />
                      <p className="text-xs text-gray-500 mt-1">The prize amount shown in the box</p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={cta}
                        onChange={(e) => setCta(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-green-700 border border-green-600 rounded-lg text-white font-bold focus:outline-none focus:border-green-500"
                        placeholder="CLAIM BONUS NOW!"
                      />
                      <p className="text-xs text-gray-500 mt-1">Text on the green button</p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* Colors Section */}
            <div data-tour="colors-section" className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('colors')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Palette size={18} className="text-purple-400" />
                  <h3 className="text-sm font-semibold text-white">Colors</h3>
                </div>
                {expandedSections.colors ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.colors && (
              <div className="p-4 space-y-4 border-t border-gray-700">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">
                    Customize the color scheme of your game title bar
                  </p>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-2 border-gray-700"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Left side of title gradient</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-2 border-gray-700"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Right side of title gradient</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-2 border-gray-700"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Game border & popup highlights</p>
                </div>

                <div>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-2">Preview:</p>
                    <div 
                      className="h-10 rounded"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                        border: `2px solid ${accentColor}`
                      }}
                    />
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* Legal Content Section */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('legal')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-yellow-400" />
                  <h3 className="text-sm font-semibold text-white">Legal Content</h3>
                </div>
                {expandedSections.legal ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              
              {expandedSections.legal && (
                <div className="p-4 space-y-4 border-t border-gray-700">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <p className="text-xs text-gray-400">
                      Add links to your legal pages (optional but recommended)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Terms & Conditions URL
                    </label>
                    <input
                      type="url"
                      value={termsUrl}
                      onChange={(e) => setTermsUrl(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="https://example.com/terms"
                    />
                    <p className="text-xs text-gray-500 mt-1">Link to your terms and conditions</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Privacy Policy URL
                    </label>
                    <input
                      type="url"
                      value={privacyUrl}
                      onChange={(e) => setPrivacyUrl(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="https://example.com/privacy"
                    />
                    <p className="text-xs text-gray-500 mt-1">Link to your privacy policy</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Responsible Gaming URL
                    </label>
                    <input
                      type="url"
                      value={responsibleGamingUrl}
                      onChange={(e) => setResponsibleGamingUrl(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      placeholder="https://example.com/responsible-gaming"
                    />
                    <p className="text-xs text-gray-500 mt-1">Link to responsible gaming information</p>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
                    <p className="text-xs text-yellow-300">
                      ⚠️ <strong>Important:</strong> Legal pages help build trust and may be required by regulations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div data-tour="preview" className="flex-1 bg-gray-950 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {previewMode === 'live' ? (
              // Live Preview with iframe
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden" style={{ height: '90vh' }}>
                <iframe
                  src={getPreviewUrl()}
                  className="w-full h-full border-0"
                  title="Live Preview"
                />
              </div>
            ) : (
              // Template Preview Mode
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Template Preview</h3>
                    <p className="text-sm text-gray-400 mt-1">Customize in real-time</p>
                  </div>
                  <button
                    onClick={() => window.open(getPreviewUrl(), '_blank')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Open Full Size
                  </button>
                </div>

                {/* Large Template Preview - Live with customizations */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-2xl" style={{ height: '70vh' }}>
                    <iframe
                      src={getPreviewUrl()}
                      className="w-full h-full border-0"
                      title="Template Preview"
                    />
                  </div>
                </div>

                {/* Customization Info */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">💡 Real-time Customization</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400">🎨</span>
                      <div>
                        <strong>Colors:</strong> Change colors in the Colors section to see updates
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">🖼️</span>
                      <div>
                        <strong>Logo:</strong> Upload or paste logo URL in Logo section
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400">📝</span>
                      <div>
                        <strong>Content:</strong> Edit text and messages in Content section
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">💾</span>
                      <div>
                        <strong>Save:</strong> Click "Save Changes" to apply and publish
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tour Guide */}
      {showTour && (
        <EditorTour 
          steps={tourSteps} 
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}
    </div>
  )
}

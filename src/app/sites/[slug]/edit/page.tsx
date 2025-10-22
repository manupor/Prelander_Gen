'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save, Eye, ArrowLeft, Palette, Type, Image as ImageIcon, Link as LinkIcon, ChevronDown, ChevronUp, Layers, FileText, Scale, Download, Mail, Globe, Monitor, Smartphone } from 'lucide-react'
import { EditorTour } from '@/components/EditorTour'
import { getTemplateConfig, templateSupportsField } from '@/lib/template-config'
import ScreenshotProtection from '@/components/ScreenshotProtection'

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
  is_downloaded?: boolean
  is_published?: boolean
  downloaded_at?: string
  published_at?: string
  download_count?: number
}

export default function SiteEditorPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [showArchived, setShowArchived] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const supabase = createClient()
  
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
  const [subheadline, setSubheadline] = useState('')
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
  const [templateId, setTemplateId] = useState('t6')
  const [termsUrl, setTermsUrl] = useState('')
  const [privacyUrl, setPrivacyUrl] = useState('')
  const [responsibleGamingUrl, setResponsibleGamingUrl] = useState('')
  const [previewMode, setPreviewMode] = useState<'live' | 'template'>('live')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [showTour, setShowTour] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadEmail, setDownloadEmail] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [affiliateCode, setAffiliateCode] = useState('')
  const [domainLock, setDomainLock] = useState('')

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
      setSubheadline(data.subheadline || '')
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
      setTemplateId(data.template_id || 't6')
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

  const handleAIChanges = (changes: any) => {
    if (changes.headline) setHeadline(changes.headline)
    if (changes.subheadline) setSubheadline(changes.subheadline)
    if (changes.cta) setCta(changes.cta)
    if (changes.ctaUrl) setCtaUrl(changes.ctaUrl)
    if (changes.primaryColor) setPrimaryColor(changes.primaryColor)
    if (changes.secondaryColor) setSecondaryColor(changes.secondaryColor)
    if (changes.accentColor) setAccentColor(changes.accentColor)
    if (changes.logoUrl) setLogoUrl(changes.logoUrl)
    if (changes.popupTitle) setPopupTitle(changes.popupTitle)
    if (changes.popupMessage) setPopupMessage(changes.popupMessage)
    if (changes.popupPrize) setPopupPrize(changes.popupPrize)
    if (changes.gameBalance) setGameBalance(changes.gameBalance)
    if (changes.templateId) setTemplateId(changes.templateId)
  }

  const getCurrentSiteData = () => ({
    headline,
    subheadline,
    cta,
    ctaUrl,
    primaryColor,
    secondaryColor,
    accentColor,
    logoUrl,
    popupTitle,
    popupMessage,
    popupPrize,
    gameBalance,
    templateId,
    vertical
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      
      // Prepare update data
      const updateData: any = {
        headline,
        subheadline,
        cta,
        cta_url: ctaUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        logo_url: logoUrl || null,
        template_id: templateId  // Always save template_id
      }
      
      // Try to add popup fields and game balance (they might not exist in DB yet)
      try {
        updateData.popup_title = popupTitle
        updateData.popup_message = popupMessage
        updateData.popup_prize = popupPrize
        updateData.game_balance = gameBalance
      } catch (e) {
        console.warn('Popup fields, game_balance, or custom_logo not available in database yet')
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

      // Auto-generate and send protected prelander to email
      try {
        const autoSendResponse = await fetch('/api/auto-send-prelander', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })

        if (autoSendResponse.ok) {
          const result = await autoSendResponse.json()
          alert(`✅ Changes Saved Successfully!\n\n📧 Protected prelander sent to: ${result.email}\n\n🔒 Your secure prelander has been automatically generated and sent to your email with maximum protection:\n• Anti-screenshot\n• Code obfuscation\n• DevTools blocking\n• Anti-clone protection\n\n✨ Check your email for the download link!\n\nYour landing page is now live and ready!`)
        } else {
          alert('✅ Changes Saved Successfully!\n\n🎉 Your template has been updated.\n\n⚠️ Note: Could not send prelander automatically. You can download it manually from the download button.')
          setShowDownloadModal(true)
        }
      } catch (emailError) {
        console.error('Auto-send error:', emailError)
        alert('✅ Changes Saved Successfully!\n\n🎉 Your template has been updated.\n\n⚠️ Note: Could not send prelander automatically. You can download it manually from the download button.')
        setShowDownloadModal(true)
      }
      
      await loadSite() // Reload to get updated HTML
    } catch (error: any) {
      console.error('Error saving:', error)
      alert(`Failed to save changes: ${error.message || 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  // Simple protected download with FALLBACK
  const handleSimpleDownload = async () => {
    setDownloading(true)
    try {
      // Try token-based download first
      console.log('[DOWNLOAD] Attempting token-based download...')
      const tokenResponse = await fetch('/api/generate-download-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      })

      let response

      if (tokenResponse.ok) {
        // Token system works - use it
        const { downloadUrl } = await tokenResponse.json()
        console.log('[DOWNLOAD] Token generated, downloading from:', downloadUrl)
        response = await fetch(downloadUrl, { method: 'GET' })
      } else {
        // Token system failed - fallback to direct download
        console.log('[DOWNLOAD] Token system unavailable, using direct download fallback...')
        response = await fetch('/api/download-simple-protected', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.details || errorData.error || 'Failed to download'
        throw new Error(errorMessage)
      }

      const filename = 'download.zip'
      
      console.log('[DOWNLOAD] Slug:', slug)
      console.log('[DOWNLOAD] Final filename:', filename)

      // Create blob and download
      const blob = await response.blob()
      console.log('[DOWNLOAD] Blob size:', blob.size, 'bytes')
      console.log('[DOWNLOAD] Blob type:', blob.type)
      
      // Method 1: Try blob URL
      try {
        const url = window.URL.createObjectURL(blob)
        console.log('[DOWNLOAD] Blob URL created:', url)
        
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.style.display = 'none'
        document.body.appendChild(a)
        
        console.log('[DOWNLOAD] Triggering download via blob URL...')
        a.click()
        
        // Clean up after a delay
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
          console.log('[DOWNLOAD] Cleanup complete')
        }, 100)
      } catch (blobError) {
        console.error('[DOWNLOAD] Blob URL method failed:', blobError)
        
        // Method 2: Fallback to data URL for small files
        console.log('[DOWNLOAD] Trying data URL fallback...')
        const reader = new FileReader()
        reader.onload = () => {
          const a = document.createElement('a')
          a.href = reader.result as string
          a.download = filename
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          console.log('[DOWNLOAD] Downloaded via data URL')
        }
        reader.onerror = () => {
          console.error('[DOWNLOAD] All download methods failed')
          alert('Download failed. Please try again or contact support.')
        }
        reader.readAsDataURL(blob)
      }

      setShowDownloadModal(false)
      
      // Mark site as downloaded (with fallback if columns don't exist)
      try {
        await supabase
          .from('sites')
          .update({ 
            is_downloaded: true, 
            downloaded_at: new Date().toISOString(),
            download_count: site?.download_count ? site.download_count + 1 : 1
          })
          .eq('slug', slug)
      } catch (columnError: any) {
        // If the new columns don't exist, skip the tracking for now
        if (columnError.message?.includes('is_downloaded') || columnError.message?.includes('column')) {
          console.log('Download tracking columns not available, skipping tracking')
        } else {
          throw columnError
        }
      }

      // Show success message
      alert('✅ Download Successful!\n\n🔒 Your prelander has been downloaded with maximum security protection:\n• Anti-screenshot blocking\n• DevTools protection\n• Code obfuscation\n• Anti-clone measures\n\nYou can download again anytime from this page.')
      
    } catch (error: any) {
      console.error('Download error:', error)
      alert(`❌ Download Failed\n\n${error.message || 'Unknown error'}\n\nPlease try again or contact support.`)
    } finally {
      setDownloading(false)
    }
  }

  const handlePublish = async () => {
    if (!site) return
    
    setPublishing(true)
    
    try {
      // First save any pending changes
      await handleSave()
      
      // Try to mark site as published with new columns, fallback to just status if columns don't exist
      try {
        const { error } = await supabase
          .from('sites')
          .update({ 
            is_published: true, 
            published_at: new Date().toISOString(),
            status: 'published' 
          })
          .eq('slug', slug)

        if (error) {
          throw error
        }
      } catch (columnError: any) {
        // If the new columns don't exist, just update the status
        if (columnError.message?.includes('is_published') || columnError.message?.includes('column')) {
          console.log('New columns not available, updating status only')
          const { error } = await supabase
            .from('sites')
            .update({ status: 'published' })
            .eq('slug', slug)

          if (error) {
            throw error
          }
        } else {
          throw columnError
        }
      }

      // Auto-generate and send protected prelander to email on publish
      try {
        const autoSendResponse = await fetch('/api/auto-send-prelander', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })

        if (autoSendResponse.ok) {
          const result = await autoSendResponse.json()
          alert(`🚀 Site Published Successfully!\n\n📧 Protected prelander sent to: ${result.email}\n\n🔒 Your fully secured prelander has been automatically sent to your email with:\n• Maximum encryption\n• Anti-clone protection\n• Code obfuscation\n• DevTools blocking\n\n✨ Check your email for the download link!\n\n🌐 Your site is now live and ready for the world!`)
        } else {
          alert('🚀 Site Published Successfully!\n\n✅ Your site is now live and accessible.\n\n⚠️ Note: Could not send prelander automatically. You can download it manually.')
        }
      } catch (emailError) {
        console.error('Auto-send on publish error:', emailError)
        alert('🚀 Site Published Successfully!\n\n✅ Your site is now live and accessible.')
      }
      
      // Reload site data
      await loadSite()
      
    } catch (error: any) {
      console.error('Error publishing site:', error)
      alert(`Failed to publish site: ${error.message || 'Unknown error'}`)
    } finally {
      setPublishing(false)
    }
  }

  const handleDownload = async () => {
    if (!downloadEmail) {
      alert('Please enter your email address')
      return
    }

    setDownloading(true)
    try {
      const response = await fetch('/api/download-encrypted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          userEmail: downloadEmail
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.details || errorData.error || 'Failed to generate download'
        throw new Error(errorMessage)
      }

      // EMERGENCY: Use completely hardcoded simple name
      const filename = 'standard.zip'  // HARDCODED
      
      console.log('[STANDARD] Final filename:', filename)

      // Create blob and download with fallback
      const blob = await response.blob()
      try {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 100)
      } catch (err) {
        // Fallback method
        const reader = new FileReader()
        reader.onload = () => {
          const a = document.createElement('a')
          a.href = reader.result as string
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
        reader.readAsDataURL(blob)
      }

      // Get password from header (development only)
      const password = response.headers.get('X-Download-Password')
      
      setShowDownloadModal(false)
      setDownloadEmail('')
      
      alert(`🔐 Encrypted Package Downloaded!\n\n${password ? `ZIP Password: ${password}` : 'Check your email for the ZIP password.'}\n\nThe encrypted ZIP contains:\n• 📄 index.html - Your complete landing page\n• ⚙️ config.json - Site configuration\n• 📋 README.md - Deployment instructions\n\nTO USE:\n1. Extract the ZIP file using the password\n2. Upload index.html to your web hosting service\n3. Test your landing page\n\n🔒 Your files are now properly encrypted!\nPassword sent to your email for security.`)
      
    } catch (error: any) {
      console.error('Download error:', error)
      alert(`Failed to download: ${error.message}`)
    } finally {
      setDownloading(false)
    }
  }

  const handleSecureDownload = async () => {
    if (!downloadEmail) {
      alert('Please enter your email address')
      return
    }

    if (!affiliateCode) {
      alert('Please enter an affiliate code')
      return
    }

    setDownloading(true)
    try {
      const response = await fetch('/api/generate-secure-package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          userEmail: downloadEmail,
          affiliateCode,
          allowedDomain: domainLock || undefined
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.details || errorData.error || 'Failed to generate secure package'
        throw new Error(errorMessage)
      }

      // EMERGENCY: Use completely hardcoded simple name
      const filename = 'secure.zip'  // HARDCODED
      
      console.log('[SECURE] Final filename:', filename)

      // Create blob and download with fallback
      const blob = await response.blob()
      try {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }, 100)
      } catch (err) {
        // Fallback method
        const reader = new FileReader()
        reader.onload = () => {
          const a = document.createElement('a')
          a.href = reader.result as string
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
        reader.readAsDataURL(blob)
      }

      // Get password from header (development only)
      const password = response.headers.get('X-Download-Password')
      
      setShowDownloadModal(false)
      setDownloadEmail('')
      setAffiliateCode('')
      setDomainLock('')
      
      alert(`🛡️ SECURE Package Downloaded!\n\n🔑 PACKAGE PASSWORD: ${password || 'Check README.md file'}\n\nThe SECURE ZIP contains:\n• 📄 index.html - Protected shell page\n• 🔒 script.js - Obfuscated JavaScript with encrypted content\n• 🎨 style.css - Responsive styling\n• 📋 README.md - Security guide WITH PASSWORD\n\nSECURITY FEATURES:\n✅ JavaScript obfuscation & encryption\n✅ Anti-debugging protection\n✅ Domain locking${domainLock ? ` (${domainLock})` : ' (disabled)'}\n✅ Hidden affiliate tracking (${affiliateCode})\n✅ File:// protocol blocking\n✅ Right-click protection\n\nDEPLOYMENT:\n1. Extract ZIP (no password needed)\n2. Check README.md for package password\n3. Upload ALL files to web hosting\n4. Access via your domain (not locally)\n5. Do NOT modify files\n\n🛡️ Maximum security protection active!\n📧 Password also in README.md file for reference.`)
      
    } catch (error: any) {
      console.error('Secure download error:', error)
      alert(`Failed to generate secure package: ${error.message}`)
    } finally {
      setDownloading(false)
    }
  }

  // AWS Hosting - Deploy directly to S3
  const handleAWSHosting = async () => {
    if (!downloadEmail) {
      alert('Please enter your email address')
      return
    }

    setDownloading(true)
    try {
      const response = await fetch('/api/host-to-aws', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          email: downloadEmail,
          domainLock: domainLock || undefined
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.details || errorData.error || 'Failed to host prelander'
        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      setShowDownloadModal(false)
      setDownloadEmail('')
      setDomainLock('')
      
      alert(`🚀 Prelander Hosted on AWS!\n\n🔗 LIVE URL:\n${data.hostedUrl}\n\nYour prelander is now live and accessible worldwide!\n\nFEATURES:\n✅ Hosted on Amazon S3\n✅ Code obfuscation & protection\n✅ Affiliate fingerprinting\n✅ Anti-screenshot protection\n${domainLock ? `✅ Domain locked to: ${domainLock}\n` : ''}✅ CDN delivery (fast loading)\n\nNEXT STEPS:\n1. Check your email for the live URL\n2. Test your prelander\n3. Share with your audience\n4. Monitor performance in dashboard\n\n📧 Confirmation email sent to ${downloadEmail}\n\n🎉 Your prelander is ready to convert!`)
      
    } catch (error: any) {
      console.error('AWS hosting error:', error)
      alert(`Failed to host prelander: ${error.message}`)
    } finally {
      setDownloading(false)
    }
  }

  const getPreviewUrl = () => {
    if (!site) return ''
    
    // Build preview URL with current values
    const params = new URLSearchParams({
      templateId,
      headline,
      subheadline: subheadline || '',
      cta,
      ctaUrl,
      primaryColor,
      secondaryColor,
      accentColor,
      logoUrl: logoUrl || '',
      popupTitle,
      popupMessage,
      popupPrize,
      gameBalance: gameBalance.toString(),
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
        {/* NetFusion Neon Top Bar - Enhanced */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-neon-primary/30 px-6 py-4 flex items-center justify-between shadow-lg shadow-neon-primary/20 relative">
          {/* Animated background accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/5 via-transparent to-neon-secondary/5 animate-pulse"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => router.push('/')}
              className="text-gray-300 hover:text-neon-primary transition-all duration-300 flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-neon-primary/10 rounded-lg border border-gray-700 hover:border-neon-primary/50 backdrop-blur-sm"
              title="Go to Home"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-neon-primary hover:text-neon-secondary transition-all duration-300 flex items-center gap-2 px-3 py-2 bg-neon-primary/10 hover:bg-neon-primary/20 rounded-lg border border-neon-primary/50 hover:border-neon-primary shadow-sm shadow-neon-primary/20"
              title="Go to Dashboard"
            >
              <span className="hidden sm:inline font-medium">Dashboard</span>
              <span className="sm:hidden">📊</span>
            </button>
            <div className="border-l-2 border-neon-primary/40 pl-4">
              <h1 className="text-white font-bold font-inter text-lg tracking-wide">{site.brand_name}</h1>
              <p className="text-sm text-neon-primary/80 font-inter font-medium">Template Editor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <button
              data-tour="preview-btn"
              onClick={() => window.open(getPreviewUrl(), '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800/70 hover:bg-neon-primary/10 text-neon-primary hover:text-white rounded-lg transition-all duration-300 border-2 border-neon-primary/40 hover:border-neon-primary hover:shadow-lg hover:shadow-neon-primary/30 backdrop-blur-sm font-medium"
            >
              <Eye size={18} />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              data-tour="save-btn"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800/70 hover:bg-neon-primary/10 text-neon-primary hover:text-white rounded-lg transition-all duration-300 border-2 border-neon-primary/40 hover:border-neon-primary hover:shadow-lg hover:shadow-neon-primary/30 backdrop-blur-sm font-medium disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 border-2 border-green-500/40 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 backdrop-blur-sm font-medium disabled:opacity-50"
            >
              {publishing ? <Loader2 size={18} className="animate-spin" /> : <Globe size={18} />}
              <span className="hidden sm:inline">{publishing ? 'Publishing...' : 'Publish Site'}</span>
            </button>
          </div>
        </div>

      <div className="flex-1 flex">
        {/* NetFusion Neon Left Panel - Enhanced */}
        <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r-2 border-neon-primary/30 overflow-y-auto shadow-xl shadow-neon-primary/10 relative">
          {/* Animated side accent */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-neon-primary via-neon-secondary to-neon-primary animate-pulse"></div>
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
              
              {expandedSections.content && (() => {
                const templateConfig = getTemplateConfig(templateId)
                if (!templateConfig) {
                  return (
                    <div className="p-4 text-center text-gray-400 text-sm">
                      No editable fields for this template
                    </div>
                  )
                }

                const fields = templateConfig.fields
                const hasPopupFields = fields.popupTitle || fields.popupMessage || fields.popupPrize

                return (
                  <div className="p-4 space-y-4 border-t border-gray-700">
                    {/* Template-specific info */}
                    <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-700/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <p className="text-xs text-cyan-300 font-semibold">
                          {templateConfig.name}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Showing {Object.keys(fields).length} editable field{Object.keys(fields).length !== 1 ? 's' : ''} for this template
                      </p>
                    </div>

                    {/* Headline */}
                    {fields.headline && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                          {fields.headline.label}
                          {fields.headline.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={fields.headline.placeholder}
                          required={fields.headline.required}
                        />
                        {fields.headline.description && (
                          <p className="text-xs text-gray-500 mt-1">{fields.headline.description}</p>
                        )}
                      </div>
                    )}

                    {/* Subheadline */}
                    {fields.subheadline && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                          {fields.subheadline.label}
                          {fields.subheadline.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          value={subheadline}
                          onChange={(e) => setSubheadline(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={fields.subheadline.placeholder}
                        />
                        {fields.subheadline.description && (
                          <p className="text-xs text-gray-500 mt-1">{fields.subheadline.description}</p>
                        )}
                      </div>
                    )}

                    {/* CTA Button Text */}
                    {fields.cta && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                          {fields.cta.label}
                          {fields.cta.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          value={cta}
                          onChange={(e) => setCta(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={fields.cta.placeholder}
                          required={fields.cta.required}
                        />
                        {fields.cta.description && (
                          <p className="text-xs text-gray-500 mt-1">{fields.cta.description}</p>
                        )}
                      </div>
                    )}

                    {/* Game Balance */}
                    {fields.gameBalance && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                          {fields.gameBalance.label}
                          {fields.gameBalance.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <input
                          type="number"
                          value={gameBalance}
                          onChange={(e) => setGameBalance(parseInt(e.target.value) || 1000)}
                          min="0"
                          step="100"
                          className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={fields.gameBalance.placeholder}
                        />
                        {fields.gameBalance.description && (
                          <p className="text-xs text-gray-500 mt-1">{fields.gameBalance.description}</p>
                        )}
                      </div>
                    )}


                    {/* CTA URL */}
                    {fields.ctaUrl && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2 flex items-center gap-1">
                          <LinkIcon size={12} />
                          {fields.ctaUrl.label}
                          {fields.ctaUrl.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                        <input
                          type="url"
                          value={ctaUrl}
                          onChange={(e) => setCtaUrl(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={fields.ctaUrl.placeholder}
                          required={fields.ctaUrl.required}
                        />
                        {fields.ctaUrl.description && (
                          <p className="text-xs text-gray-500 mt-1">{fields.ctaUrl.description}</p>
                        )}
                      </div>
                    )}

                    {/* Win Popup Section (if template supports it) */}
                    {hasPopupFields && (
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
                          Appears after user interaction with the game
                        </p>
                        
                        <div className="space-y-3">
                          {/* Popup Title */}
                          {fields.popupTitle && (
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
                                {fields.popupTitle.label}
                              </label>
                              <input
                                type="text"
                                value={popupTitle}
                                onChange={(e) => setPopupTitle(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500"
                                placeholder={fields.popupTitle.placeholder}
                              />
                              {fields.popupTitle.description && (
                                <p className="text-xs text-gray-500 mt-1">{fields.popupTitle.description}</p>
                              )}
                            </div>
                          )}

                          {/* Popup Message */}
                          {fields.popupMessage && (
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
                                {fields.popupMessage.label}
                              </label>
                              {fields.popupMessage.type === 'textarea' ? (
                                <textarea
                                  value={popupMessage}
                                  onChange={(e) => setPopupMessage(e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                  placeholder={fields.popupMessage.placeholder}
                                  rows={2}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={popupMessage}
                                  onChange={(e) => setPopupMessage(e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                  placeholder={fields.popupMessage.placeholder}
                                />
                              )}
                              {fields.popupMessage.description && (
                                <p className="text-xs text-gray-500 mt-1">{fields.popupMessage.description}</p>
                              )}
                            </div>
                          )}

                          {/* Popup Prize */}
                          {fields.popupPrize && (
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1">
                                {fields.popupPrize.label}
                              </label>
                              <input
                                type="text"
                                value={popupPrize}
                                onChange={(e) => setPopupPrize(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500"
                                placeholder={fields.popupPrize.placeholder}
                              />
                              {fields.popupPrize.description && (
                                <p className="text-xs text-gray-500 mt-1">{fields.popupPrize.description}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
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
        <div data-tour="preview" className="flex-1 bg-gray-950 p-3 overflow-auto">
          <div className="max-w-full mx-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Monitor size={18} />
                <span className="font-semibold">Desktop</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Smartphone size={18} />
                <span className="font-semibold">Mobile</span>
              </button>
            </div>

            {previewMode === 'live' ? (
              // Live Preview with iframe
              <ScreenshotProtection>
                <div 
                  className={`bg-white rounded-lg shadow-2xl overflow-hidden mx-auto transition-all ${
                    viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
                  }`} 
                  style={{ height: '90vh' }}
                >
                  <iframe
                    key={`live-${templateId}-${viewMode}`}
                    src={getPreviewUrl()}
                    className="w-full h-full border-0"
                    title="Live Preview"
                  />
                </div>
              </ScreenshotProtection>
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
                <ScreenshotProtection>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <div 
                      className={`relative bg-white rounded-lg overflow-hidden shadow-2xl mx-auto transition-all ${
                        viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
                      }`} 
                      style={{ height: '82vh' }}
                    >
                      <iframe
                        key={`template-${templateId}-${viewMode}`}
                        src={getPreviewUrl()}
                        className="w-full h-full border-0"
                        title="Template Preview"
                      />
                    </div>
                  </div>
                </ScreenshotProtection>

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

      {/* Enhanced Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] border-2 border-neon-primary/30 shadow-2xl shadow-neon-primary/20 relative overflow-hidden flex flex-col">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/5 via-transparent to-neon-secondary/5 animate-pulse"></div>
            
            {/* Fixed Header */}
            <div className="relative z-10 p-4 pb-3 border-b border-neon-primary/20 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 rounded-lg border border-neon-primary/30">
                    <Download className="w-5 h-5 text-neon-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Download Prelander</h3>
                    <p className="text-xs text-neon-primary/80">Choose your security level</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 p-4 overflow-y-auto flex-1">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Option 1: Download ZIP */}
                <div className="bg-gradient-to-r from-blue-800/50 to-cyan-700/50 rounded-lg p-4 border border-cyan-500/40 backdrop-blur-sm hover:border-cyan-400/60 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg flex-shrink-0">
                      <Download className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-base text-white font-bold mb-1.5">Download ZIP</p>
                      <p className="text-sm text-gray-200 leading-relaxed mb-2">
                        Secure, protected prelander ready to deploy on any hosting platform.
                      </p>
                      <ul className="text-xs text-cyan-200/80 space-y-1">
                        <li>🔒 Code obfuscation & anti-clone protection</li>
                        <li>📦 Works on any hosting service</li>
                        <li>⚡ No setup required - upload and go</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Option 2: Host with Us */}
                <div className="bg-gradient-to-r from-purple-800/50 to-indigo-700/50 rounded-lg p-4 border border-purple-500/40 backdrop-blur-sm hover:border-purple-400/60 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                      <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-base text-white font-bold mb-1.5">Host with Us</p>
                      <p className="text-sm text-gray-200 leading-relaxed mb-2">
                        We host your prelander on AWS with global CDN for instant worldwide access.
                      </p>
                      <ul className="text-xs text-purple-200/80 space-y-1">
                        <li>🌐 Instant live URL in seconds</li>
                        <li>⚡ Fast global CDN delivery</li>
                        <li>🔐 Automatic security & protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={downloadEmail}
                  onChange={(e) => setDownloadEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-darker-surface border border-neon-primary/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-primary focus:border-transparent"
                  placeholder="your@email.com"
                  disabled={downloading}
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  We'll send your download link or hosted URL to this email
                </p>
              </div>
            </div>

            {/* Fixed Footer with Buttons */}
            <div className="relative z-10 p-4 pt-3 border-t border-neon-primary/20 flex-shrink-0 bg-gray-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Download ZIP Button */}
                <button
                  onClick={handleSimpleDownload}
                  disabled={downloading}
                  className="px-5 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 disabled:opacity-50 font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download ZIP
                    </>
                  )}
                </button>

                {/* Host with Us Button */}
                <button
                  onClick={handleAWSHosting}
                  disabled={downloading || !downloadEmail}
                  className="px-5 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 disabled:opacity-50 font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Hosting...
                    </>
                  ) : (
                    <>
                      <Globe className="w-5 h-5" />
                      Host with Us
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

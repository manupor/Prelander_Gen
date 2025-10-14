'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

const DEMO_TEMPLATES = [
  {
    id: 't6',
    name: 'Casino Classic',
    description: 'Traditional casino landing page with elegant design',
    preview: '/templates/t6-preview.jpg',
    demoSlug: 'demo-casino-classic'
  },
  {
    id: 't7',
    name: 'Neon Slots',
    description: 'Modern neon-themed slot machine experience',
    preview: '/templates/t7-preview.jpg',
    demoSlug: 'demo-neon-slots'
  },
  {
    id: 't9',
    name: 'Golden Fortune',
    description: 'Luxury gold-themed casino landing',
    preview: '/templates/t9-preview.jpg',
    demoSlug: 'demo-golden-fortune'
  },
  {
    id: 't10',
    name: 'Castle Slots',
    description: 'Medieval castle-themed slot adventure',
    preview: '/templates/t10-preview.jpg',
    demoSlug: 'demo-castle-slots'
  },
  {
    id: 't11',
    name: 'Fisherman Slots',
    description: 'Ocean-themed fishing slot experience',
    preview: '/templates/t11-preview.jpg',
    demoSlug: 'demo-fisherman-slots'
  }
]

export default function DemoPage() {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)

  const createDemoSite = async (template: typeof DEMO_TEMPLATES[0]) => {
    setCreating(template.id)
    
    try {
      // Create a demo site without authentication
      const response = await fetch('/api/demo/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          slug: template.demoSlug
        })
      })

      const data = await response.json()

      if (data.slug) {
        // Redirect to editor
        router.push(`/sites/${data.slug}/edit`)
      } else {
        alert('Failed to create demo site')
      }
    } catch (error) {
      console.error('Error creating demo:', error)
      alert('Failed to create demo site')
    } finally {
      setCreating(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neon-accent to-black text-white font-inter">
      {/* Header */}
      <header className="border-b border-neon-primary/20 bg-dark-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-neon-primary hover:text-neon-secondary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-primary" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
                Try Templates - No Login Required
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-primary animate-gradient-x">
              Explore Our Templates
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Try any template instantly. No signup required. Full editor access with AI assistant included.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-dark-surface/80 backdrop-blur-sm border border-neon-primary/30 rounded-2xl overflow-hidden hover:border-neon-primary/60 transition-all duration-300 hover:shadow-neon group"
            >
              {/* Template Preview */}
              <div className="aspect-video bg-darker-surface relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🎰</div>
                </div>
                <div className="absolute top-2 right-2 px-3 py-1 bg-neon-primary/20 backdrop-blur-sm border border-neon-primary/30 rounded-full text-xs font-semibold text-neon-primary">
                  {template.id.toUpperCase()}
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-primary transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {template.description}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => createDemoSite(template)}
                  disabled={creating === template.id}
                  className="w-full bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-secondary hover:to-neon-primary text-black font-bold py-3 px-6 rounded-xl shadow-neon transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {creating === template.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Try This Template
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-dark-surface/80 backdrop-blur-sm border border-neon-primary/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
            What You Get
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-bold text-white mb-2">Full Editor Access</h4>
              <p className="text-sm text-text-muted">Customize colors, text, images, and more in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="font-bold text-white mb-2">AI Assistant</h4>
              <p className="text-sm text-text-muted">Chat with AI to make changes faster - just like Windsurf</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-bold text-white mb-2">Instant Preview</h4>
              <p className="text-sm text-text-muted">See your changes live as you edit</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

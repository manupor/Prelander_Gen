'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NanoKitLogo } from '@/components/NanoKitLogo'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0A24] via-[#1A0F40] to-[#0C0A24] text-white overflow-x-hidden" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
      
      {/* Animated Star Field */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-[#B94AFF]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <NanoKitLogo size="md" href="/" />
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#templates" className="text-white/70 hover:text-white transition-colors">Templates</a>
              <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-[#4FC3FF] border border-[#4FC3FF]/30 hover:border-[#4FC3FF] transition-all px-5 py-2 rounded-xl">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="relative overflow-hidden px-6 py-2 rounded-xl font-bold transition-all hover:scale-105 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3FF] to-[#B94AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-white">Get Started</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#B94AFF]/10 to-[#4FC3FF]/10 border border-[#4FC3FF]/30 mb-8 backdrop-blur-sm animate-fadeIn">
            <div className="w-2 h-2 rounded-full bg-[#4FC3FF] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">AI-POWERED LANDING PAGE BUILDER</span>
            <div className="w-2 h-2 rounded-full bg-[#B94AFF] animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 animate-fadeInUp">
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Create Any Style
            </span>
            <span className="block bg-gradient-to-r from-[#B94AFF] via-[#4FC3FF] to-[#B94AFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient drop-shadow-[0_0_50px_rgba(185,74,255,0.5)]">
              Landing Page
            </span>
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              With AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            From <span className="text-[#4FC3FF] font-semibold">minimal corporate</span> to{' '}
            <span className="text-[#B94AFF] font-semibold">bold lifestyle</span>—our AI adapts to any design style.{' '}
            <span className="text-white font-semibold">No coding. Pure creativity.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Link href="/signup">
              <Button className="relative group overflow-hidden px-12 py-7 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-[0_0_60px_rgba(185,74,255,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3FF] to-[#B94AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-white flex items-center gap-3">
                  START CREATING FREE
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Button>
            </Link>
            <a href="#templates">
              <Button variant="ghost" className="text-white hover:text-[#4FC3FF] border-2 border-white/20 hover:border-[#4FC3FF] px-10 py-7 rounded-2xl text-lg transition-all backdrop-blur-sm">
                Browse Templates
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/50 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {[
              { label: '12+ Template Styles', icon: '✦' },
              { label: 'AI-Powered Generation', icon: '⚡' },
              { label: 'Real-Time Editor', icon: '⟡' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 group hover:text-white transition-colors">
                <span className="text-[#4FC3FF]">{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-[#B94AFF]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] bg-clip-text text-transparent">
                Powerful Creative Engine
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              AI that understands design, aesthetics, and conversion optimization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'AI Generate',
                desc: 'Describe your vision—AI creates a complete, styled landing page in seconds. From minimal to maximal.',
                gradient: 'from-[#B94AFF] to-[#B94AFF]/50',
              },
              {
                icon: '⚡',
                title: 'Real-Time Edit',
                desc: 'See every change instantly. Edit colors, text, images, and layout with live preview.',
                gradient: 'from-[#4FC3FF] to-[#4FC3FF]/50',
              },
              {
                icon: '📦',
                title: 'Export Clean Code',
                desc: 'Download production-ready HTML/CSS. No frameworks, no dependencies—just clean code.',
                gradient: 'from-[#B94AFF] to-[#B94AFF]/50',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 backdrop-blur-xl"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(185,74,255,0.3)] group-hover:shadow-[0_0_60px_rgba(185,74,255,0.5)] transition-shadow`}>
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#4FC3FF] to-[#B94AFF] bg-clip-text text-transparent">
                Three Simple Steps
              </span>
            </h2>
            <p className="text-xl text-white/60">From idea to deployed landing page in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-28 left-1/3 right-1/3 h-1 bg-gradient-to-r from-[#4FC3FF] via-[#B94AFF] to-[#4FC3FF] opacity-30" />
            
            {[
              { step: '1', title: 'Forge', desc: 'Create with AI or choose a template', icon: '◆', color: '#B94AFF' },
              { step: '2', title: 'Edit', desc: 'Customize in real-time visual editor', icon: '▲', color: '#4FC3FF' },
              { step: '3', title: 'Export', desc: 'Download or host your page', icon: '●', color: '#B94AFF' },
            ].map((item, i) => (
              <div key={i} className="text-center relative group">
                <div 
                  className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#B94AFF] to-[#4FC3FF] flex items-center justify-center text-5xl font-black text-white shadow-[0_0_60px_rgba(185,74,255,0.4)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ boxShadow: `0 0 80px ${item.color}80` }}
                >
                  {item.icon}
                </div>
                <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/50 text-sm font-bold mb-3">
                  STEP {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-[#4FC3FF]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] bg-clip-text text-transparent">
                Every Style, Every Industry
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our AI creates landing pages in <span className="text-white font-semibold">any aesthetic</span>—from clean corporate to bold 90's synth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Corporate', desc: 'Clean & Professional', color: '#3B82F6', styles: 'Minimal, Modern' },
              { name: 'Lifestyle', desc: 'Bold & Vibrant', color: '#EC4899', styles: 'Editorial, Rich' },
              { name: 'Tech', desc: 'Futuristic & Sleek', color: '#8B5CF6', styles: 'Neon, Gradient' },
              { name: 'Gaming', desc: 'Dynamic & Energetic', color: '#EF4444', styles: 'Intense, Animated' },
            ].map((template, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${template.color}20 0%, transparent 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ backgroundColor: `${template.color}40`, color: template.color }}>
                    {template.styles}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{template.name}</h3>
                  <p className="text-white/60 text-sm">{template.desc}</p>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/dashboard">
              <Button className="px-10 py-6 rounded-2xl text-lg font-bold bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all backdrop-blur-xl text-white">
                Browse All 12+ Templates →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Trusted by Creators
            </h2>
            <p className="text-white/60 text-lg">Join thousands building stunning landing pages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '10,000+', label: 'Pages Created' },
              { stat: '99%', label: 'Uptime' },
              { stat: '4.9/5', label: 'User Rating' },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all">
                <div className="text-5xl font-black bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <div className="text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-16 rounded-3xl bg-gradient-to-br from-[#B94AFF]/20 via-[#4FC3FF]/20 to-[#B94AFF]/20 border border-[#4FC3FF]/30 backdrop-blur-2xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#B94AFF]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#4FC3FF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF] bg-clip-text text-transparent">
                  Start Creating Today
                </span>
              </h2>
              <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                From minimal to maximal. Corporate to creative. Your style, powered by AI.
              </p>
              <Link href="/signup">
                <Button className="relative group overflow-hidden px-16 py-8 rounded-2xl text-xl font-black transition-all hover:scale-105 shadow-[0_0_80px_rgba(185,74,255,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B94AFF] to-[#4FC3FF]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3FF] to-[#B94AFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-white flex items-center gap-3">
                    CREATE YOUR FIRST PAGE
                    <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </Button>
              </Link>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50">
                <span>✓ No Credit Card Required</span>
                <span>✓ 12+ Template Styles</span>
                <span>✓ AI-Powered Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/10 backdrop-blur-2xl bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <NanoKitLogo size="md" />
              <p className="text-white/40 text-sm text-center md:text-left max-w-xs">
                AI-powered landing page builder for every style and industry
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-white mb-3">Product</h4>
                <div className="flex flex-col gap-2 text-white/50">
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                  <a href="#templates" className="hover:text-white transition-colors">Templates</a>
                  <a href="#" className="hover:text-white transition-colors">Pricing</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3">Company</h4>
                <div className="flex flex-col gap-2 text-white/50">
                  <a href="#" className="hover:text-white transition-colors">About</a>
                  <a href="#" className="hover:text-white transition-colors">Blog</a>
                  <a href="#" className="hover:text-white transition-colors">Careers</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3">Resources</h4>
                <div className="flex flex-col gap-2 text-white/50">
                  <a href="#" className="hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="hover:text-white transition-colors">Community</a>
                  <a href="#" className="hover:text-white transition-colors">Status</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-3">Legal</h4>
                <div className="flex flex-col gap-2 text-white/50">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Security</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>© 2025 Nano Kit. Built with passion for creators worldwide.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )
}

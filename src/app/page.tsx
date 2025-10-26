import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NanoKitLogo } from '@/components/NanoKitLogo'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-hidden relative font-inter">
      {/* Purple Synthwave Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* WebGL Canvas Container */}
        <div id="synth-canyon-container" className="absolute inset-0"></div>
        
        {/* Purple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black">
          {/* Animated Grid Floor */}
          <div className="absolute inset-0 perspective-[1000px]">
            {/* Vertical Grid Lines - Animated */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`vline-${i}`}
                className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse"
                style={{
                  left: `${5 + i * 5}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                  opacity: 0.3 + (i % 3) * 0.2
                } as React.CSSProperties}
              />
            ))}
            
            {/* Horizontal Grid Lines - Animated with glow */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`hline-${i}`}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
                style={{
                  top: `${10 + i * 6}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${2.5 + (i % 4) * 0.5}s`,
                  opacity: 0.2 + (i % 4) * 0.15,
                  boxShadow: i % 3 === 0 ? '0 0 10px rgba(168, 85, 247, 0.3)' : 'none'
                } as React.CSSProperties}
              />
            ))}
            
            {/* Moving particles along vertical grid lines */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`grid-particle-v-${i}`}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
                style={{
                  left: `${5 + (i * 12)}%`,
                  top: '0',
                  animation: `moveVertical ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: '0 0 15px rgba(34, 211, 238, 0.8)'
                } as React.CSSProperties}
              />
            ))}
            
            {/* Moving particles along horizontal grid lines */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`grid-particle-h-${i}`}
                className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm"
                style={{
                  left: '0',
                  top: `${15 + (i * 15)}%`,
                  animation: `moveHorizontal ${4 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                  boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)'
                } as React.CSSProperties}
              />
            ))}
            
            {/* Intersection glow points */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`intersection-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + ((i * 7) % 60)}%`,
                  animation: 'gridPulse 2s ease-in-out infinite',
                  animationDelay: `${i * 0.3}s`,
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
                } as React.CSSProperties}
              />
            ))}
          </div>
          
          {/* Subtle Mountain Horizon */}
          <div className="mountain-horizon">
            <svg className="horizon-svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="subtleMountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(2, 193, 115, 0.15)" />
                  <stop offset="40%" stopColor="rgba(114, 220, 96, 0.1)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {/* Subtle Mountain Silhouette */}
              <path
                d="M0,200 L0,120 L100,100 L200,130 L300,90 L400,110 L500,80 L600,105 L700,75 L800,95 L900,70 L1000,85 L1100,65 L1200,90 L1200,200 Z"
                fill="url(#subtleMountainGradient)"
                className="subtle-mountain"
              />
            </svg>
            
            {/* Connection Lines to Grid */}
            <div className="mountain-grid-connections">
              {[5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77, 83, 89, 95].map((position, i) => (
                <div
                  key={`connection-${i}`}
                  className="grid-connection-line"
                  style={{
                    left: `${position}%`,
                    animationDelay: `${i * 0.1}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
          
          {/* Ambient Particles */}
          <div className="ambient-particles">
            {[...Array(25)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className={`ambient-particle ${i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'pink' : 'yellow'}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                } as React.CSSProperties}
              />
            ))}
          </div>
          
          {/* Subtle Starburst Level */}
          <div className="subtle-starburst-level">
            {/* Gentle Light Rays */}
            <div className="gentle-rays">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`gentle-ray-${i}`}
                  className="gentle-ray"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                    animationDelay: `${i * 0.5}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>
            
            {/* Soft Twinkling Stars */}
            <div className="soft-stars">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`soft-star-${i}`}
                  className="soft-star"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${4 + Math.random() * 2}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>
            
            {/* Subtle Glow Pulse */}
            <div className="central-glow">
              <div className="glow-core" />
            </div>
          </div>
          
          {/* Subtle Glow Effects */}
          <div className="background-glow">
            <div className="glow-left" />
            <div className="glow-right" />
            <div className="glow-center" />
          </div>
        </div>
      </div>

      {/* Synth-Styled Header with better contrast */}
      <header className="relative z-10 backdrop-blur-xl border-b border-cyan-400/20 shadow-2xl">
        {/* Header gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-purple-950/40 to-black/80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center">
              {/* Logo with enhanced glow */}
              <div className="relative">
                <div 
                  className="absolute inset-0 blur-2xl opacity-60"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, transparent 70%)',
                    transform: 'scale(1.5)'
                  }}
                />
                <NanoKitLogo size="md" href="/" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="border-2 border-cyan-400/70 bg-black/50 text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-300 hover:text-cyan-100 transition-all duration-300 backdrop-blur-xl font-inter font-semibold px-6 py-2.5 shadow-lg hover:shadow-cyan-400/40"
                  style={{
                    boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                  }}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  className="relative overflow-hidden font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-inter group"
                  style={{
                    background: 'linear-gradient(135deg, #FF00FF 0%, #00FFFF 100%)',
                    boxShadow: '0 0 30px rgba(255,0,255,0.4), 0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="relative z-10 text-white drop-shadow-lg">Get Started</span>
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-pulse"
                    style={{
                      transform: 'translateX(-100%)',
                      animation: 'shine 3s ease-in-out infinite'
                    }}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Purple Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-8 hover:border-cyan-400/50 transition-all duration-300 group">
            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse group-hover:animate-ping"></span>
            <span className="text-sm font-medium text-cyan-300 tracking-wide font-inter">AI-Powered Landing Pages</span>
            <span className="w-3 h-3 bg-purple-400 rounded-full ml-3 animate-pulse group-hover:animate-ping"></span>
          </div>
          
          {/* Purple Gradient Headlines */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-center font-inter drop-shadow-2xl">
            <span className="text-white">
              Build Retro-Future
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-x">
              Landing Pages
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:from-cyan-400 hover:to-purple-400 transition-all duration-500">
              in Seconds
            </span>
          </h1>
          
          {/* Enhanced Animated Subtitle - Clear and Sharp */}
          <div className="relative text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed font-inter text-center">
            {/* Clean background without blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/5 via-transparent to-neon-secondary/5 rounded-2xl"></div>
            <div className="relative z-10 p-6">
              <span className="text-white">Synth-powered design meets </span>
              <span className="text-white font-bold">
                modern technology
              </span>
              <span className="text-white">. Create </span>
              <span className="text-white font-bold">
                high-converting pages
              </span>
              <span className="text-white"> with </span>
              <span className="text-white font-bold">
                90's aesthetics
              </span>
              <span className="text-white">. </span>
              <span className="text-white font-semibold">No coding required</span>
              <span className="text-white">, just pure </span>
              <span className="text-white font-bold">
                retro-futuristic magic
              </span>
              <span className="text-white">.</span>
            </div>
          </div>
          
          {/* Animated Stats */}
          <div className="flex justify-center items-center space-x-8 mb-12 text-sm font-inter">
            <div className="flex items-center group hover:scale-105 transition-all duration-300">
              <span className="w-2 h-2 bg-neon-secondary rounded-full mr-2 animate-pulse group-hover:animate-ping"></span>
              <span className="text-text-muted group-hover:text-neon-secondary transition-colors">
                <span className="text-neon-secondary font-bold">10,000+</span> Pages Created
              </span>
            </div>
            <div className="flex items-center group hover:scale-105 transition-all duration-300">
              <span className="w-2 h-2 bg-neon-primary rounded-full mr-2 animate-pulse group-hover:animate-ping" style={{animationDelay: '0.5s'}}></span>
              <span className="text-text-muted group-hover:text-neon-primary transition-colors">
                <span className="text-neon-primary font-bold">99%</span> Uptime
              </span>
            </div>
            <div className="flex items-center group hover:scale-105 transition-all duration-300">
              <span className="w-2 h-2 bg-neon-secondary rounded-full mr-2 animate-pulse group-hover:animate-ping" style={{animationDelay: '1s'}}></span>
              <span className="text-text-muted group-hover:text-neon-secondary transition-colors">
                <span className="text-neon-secondary font-bold">AI-Powered</span> Copy
              </span>
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="flex justify-center items-center mb-16">
            <Link href="/signup">
              <Button className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-black py-6 px-12 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-xl font-inter group overflow-hidden">
                <span className="relative z-10">
                  START CREATING NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all">
                <span className="text-2xl text-white font-bold">7</span>
              </div>
              <h3 className="text-base font-bold mb-2 text-cyan-300 font-inter text-center">TEMPLATES</h3>
              <p className="text-slate-300 text-sm font-inter text-center">Professional designs ready to customize</p>
            </div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all">
                <span className="text-2xl text-white font-bold">⚡</span>
              </div>
              <h3 className="text-base font-bold mb-2 text-purple-300 font-inter text-center">LIVE EDITING</h3>
              <p className="text-slate-300 text-sm font-inter text-center">See changes in real-time as you edit</p>
            </div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all">
                <span className="text-2xl text-white font-bold">↓</span>
              </div>
              <h3 className="text-base font-bold mb-2 text-cyan-300 font-inter text-center">ONE-CLICK EXPORT</h3>
              <p className="text-slate-300 text-sm font-inter text-center">Download clean code instantly</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-20 reveal-on-scroll" data-parallax="0.3">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ▲ POWERFUL FEATURES ▲
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mx-auto font-inter">
              Everything you need to create stunning landing pages
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all">
                <span className="text-xl text-white font-bold">◆</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors font-inter">AI-POWERED GENERATION</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-inter">
                Describe your brand and let AI generate a complete landing page with optimized copy and design.
              </p>
            </div>
            
            <div className="group bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all">
                <span className="text-xl text-white font-bold">▲</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-purple-300 group-hover:text-purple-400 transition-colors font-inter">REAL-TIME EDITOR</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-inter">
                Edit colors, text, images, and layout with live preview. See changes instantly as you customize.
              </p>
            </div>
            
            <div className="group bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all">
                <span className="text-xl text-white font-bold">●</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors font-inter">CLEAN CODE EXPORT</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-inter">
                Download production-ready HTML/CSS code. No dependencies, no bloat, just clean code.
              </p>
            </div>
          </div>
        </div>

        {/* Simple 3-Step Process Flow */}
        <div className="mt-20 reveal-on-scroll" data-parallax="0.2">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ● HOW IT WORKS ●
              </span>
            </h2>
            <p className="text-sm text-slate-300 font-inter">3 simple steps to your perfect landing page</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Purple Connection Lines */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-50"></div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300">
                ◆
              </div>
              <h3 className="text-lg font-bold mb-2 text-cyan-300 font-inter">FORGE</h3>
              <p className="text-slate-400 text-sm font-inter">Create a new site with AI-powered generation</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-300">
                ▲
              </div>
              <h3 className="text-lg font-bold mb-2 text-purple-300 font-inter">EDIT</h3>
              <p className="text-slate-400 text-sm font-inter">Customize your template in real-time editor</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300">
                ●
              </div>
              <h3 className="text-lg font-bold mb-2 text-cyan-300 font-inter">EXPORT</h3>
              <p className="text-slate-400 text-sm font-inter">Download clean HTML/CSS ready to deploy</p>
            </div>
          </div>
        </div>

        {/* Purple CTA Terminal */}
        <div className="mt-20 relative reveal-on-scroll">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl shadow-purple-500/10">
            {/* Purple Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-cyan-300 font-semibold text-sm font-inter">NEXUS FORGE • READY</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 font-inter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  ▲ START BUILDING TODAY ▲
                </span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-inter">
                Create professional landing pages in minutes, not hours
              </p>
              
              <div className="flex justify-center">
                <Link href="/signup">
                  <Button className="text-lg px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 rounded-xl font-black font-inter">
                    ◆ CREATE YOUR FIRST SITE ◆
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 flex justify-center space-x-6 text-xs text-slate-400 font-inter">
                <span>✓ AI-Powered Generation</span>
                <span>✓ Real-Time Editor</span>
                <span>✓ Clean Code Export</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* NetFusion Footer */}
      <footer className="relative z-10 bg-dark-surface/80 backdrop-blur-xl border-t border-neon-primary/20 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {/* NetFusion Footer Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-primary via-neon-secondary to-neon-primary rounded-lg flex items-center justify-center shadow-neon">
                  <div className="text-black font-black text-xl">◆</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-neon-primary via-neon-secondary to-neon-primary rounded-lg blur-md opacity-50"></div>
              </div>
              
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-primary tracking-tight font-inter">
                  NEXUS
                </h1>
                <span className="text-xs font-mono text-neon-primary tracking-widest -mt-1">
                  FORGE
                </span>
              </div>
            </div>
            <p className="text-text-muted mb-6 max-w-xl mx-auto text-sm font-inter">
              Neural AI-powered landing page synthesis. Forge stunning, conversion-optimized pages 
              with cutting-edge artificial intelligence.
            </p>
            <div className="flex justify-center items-center space-x-6 text-xs text-text-muted font-inter">
              <span>© 2025 Nexus Forge</span>
              <span>•</span>
              <span>Built with ◆ for creators</span>
              <span>•</span>
              <span>Powered by Neural AI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Synth CSS Animations */}
      <style>{`
        /* Synth Floor Grid */
        .synth-floor {
          position: absolute;
          inset: 0;
          perspective: 1200px;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        
        /* Vertical Grid Lines */
        .vertical-grid-line {
          position: absolute;
          top: 60%;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(0, 255, 255, 0.2) 20%,
            rgba(0, 255, 255, 0.6) 60%,
            rgba(0, 255, 255, 0.8) 100%
          );
          box-shadow: 0 0 4px rgba(0, 255, 255, 0.3);
          transform: rotateX(75deg) translateZ(-50px);
          animation: vertical-pulse 4s ease-in-out infinite;
        }
        
        /* Horizontal Grid Lines */
        .horizontal-grid-line {
          position: absolute;
          left: 5%;
          right: 5%;
          height: 1px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(0, 255, 255, 0.1) 20%,
            rgba(0, 255, 255, 0.4) 50%,
            rgba(0, 255, 255, 0.1) 80%,
            transparent 100%
          );
          box-shadow: 0 0 3px rgba(0, 255, 255, 0.2);
          transform: rotateX(75deg) translateZ(-30px);
          animation: horizontal-pulse 5s ease-in-out infinite;
        }
        
        /* Subtle Mountain Horizon */
        .mountain-horizon {
          position: absolute;
          top: 30%;
          left: 0;
          right: 0;
          height: 25%;
          pointer-events: none;
          z-index: 2;
        }
        
        .horizon-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .subtle-mountain {
          animation: subtle-mountain-breathe 10s ease-in-out infinite;
        }
        
        /* Grid Connection Lines */
        .mountain-grid-connections {
          position: absolute;
          top: 70%;
          left: 0;
          right: 0;
          height: 30%;
          pointer-events: none;
        }
        
        .grid-connection-line {
          position: absolute;
          top: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom,
            rgba(0, 255, 255, 0.3) 0%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 100%
          );
          box-shadow: 0 0 2px rgba(0, 255, 255, 0.2);
          animation: connection-pulse 6s ease-in-out infinite;
        }
        
        /* Ambient Particles */
        .ambient-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .ambient-particle {
          position: absolute;
          border-radius: 50%;
          animation: particle-drift 6s ease-in-out infinite;
        }
        
        .ambient-particle.cyan {
          width: 2px;
          height: 2px;
          background: rgba(0, 255, 255, 0.7);
          box-shadow: 0 0 6px rgba(0, 255, 255, 0.5);
        }
        
        .ambient-particle.pink {
          width: 3px;
          height: 3px;
          background: rgba(255, 20, 147, 0.6);
          box-shadow: 0 0 8px rgba(255, 20, 147, 0.4);
        }
        
        .ambient-particle.yellow {
          width: 1px;
          height: 1px;
          background: rgba(255, 215, 0, 0.8);
          box-shadow: 0 0 4px rgba(255, 215, 0, 0.6);
        }
        
        /* Subtle Starburst Level */
        .subtle-starburst-level {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }
        
        /* Gentle Light Rays */
        .gentle-rays {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
        }
        
        .gentle-ray {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 120px;
          background: linear-gradient(to top,
            transparent 0%,
            rgba(0, 255, 255, 0.1) 40%,
            rgba(0, 255, 255, 0.2) 60%,
            transparent 100%
          );
          transform-origin: bottom center;
          animation: gentle-ray-pulse 8s ease-in-out infinite;
        }
        
        /* Soft Twinkling Stars */
        .soft-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .soft-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
          animation: soft-twinkle 6s ease-in-out infinite;
        }
        
        /* Central Glow */
        .central-glow {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
        }
        
        .glow-core {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle,
            rgba(0, 255, 255, 0.08) 0%,
            rgba(0, 255, 255, 0.04) 40%,
            transparent 70%
          );
          border-radius: 50%;
          animation: core-breathe 10s ease-in-out infinite;
        }
        
        /* Background Glow Effects */
        .background-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .glow-left {
          position: absolute;
          top: 20%;
          left: 0;
          width: 300px;
          height: 400px;
          background: radial-gradient(ellipse,
            rgba(255, 20, 147, 0.1) 0%,
            rgba(255, 20, 147, 0.05) 40%,
            transparent 70%
          );
          animation: glow-pulse-left 8s ease-in-out infinite;
        }
        
        .glow-right {
          position: absolute;
          top: 40%;
          right: 0;
          width: 250px;
          height: 300px;
          background: radial-gradient(ellipse,
            rgba(0, 255, 255, 0.08) 0%,
            rgba(0, 255, 255, 0.04) 40%,
            transparent 70%
          );
          animation: glow-pulse-right 10s ease-in-out infinite;
        }
        
        .glow-center {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 200px;
          background: radial-gradient(ellipse,
            rgba(138, 43, 226, 0.06) 0%,
            rgba(138, 43, 226, 0.03) 50%,
            transparent 70%
          );
          animation: glow-pulse-center 12s ease-in-out infinite;
        }
        
        /* Keyframe Animations */
        @keyframes vertical-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: rotateX(75deg) translateZ(-50px) scaleY(1);
          }
          50% { 
            opacity: 0.7;
            transform: rotateX(75deg) translateZ(-50px) scaleY(1.1);
          }
        }
        
        @keyframes horizontal-pulse {
          0%, 100% { 
            opacity: 0.2;
            transform: rotateX(75deg) translateZ(-30px) scaleX(1);
          }
          50% { 
            opacity: 0.5;
            transform: rotateX(75deg) translateZ(-30px) scaleX(1.05);
          }
        }
        
        /* Subtle Mountain Animations */
        @keyframes subtle-mountain-breathe {
          0%, 100% { 
            opacity: 0.8;
            transform: translateY(0px);
          }
          50% { 
            opacity: 1;
            transform: translateY(-2px);
          }
        }
        
        @keyframes connection-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% { 
            opacity: 0.6;
            transform: scaleY(1.1);
          }
        }
        
        /* Subtle Starburst Animations */
        @keyframes gentle-ray-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% { 
            opacity: 0.6;
            transform: scaleY(1.1);
          }
        }
        
        @keyframes soft-twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        
        @keyframes core-breathe {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        @keyframes particle-drift {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-8px) translateX(-5px) scale(0.9);
            opacity: 1;
          }
          75% { 
            transform: translateY(-20px) translateX(3px) scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes glow-pulse-left {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes glow-pulse-right {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.15);
          }
        }
        
        @keyframes glow-pulse-center {
          0%, 100% { 
            opacity: 0.4;
            transform: translateX(-50%) scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: translateX(-50%) scale(1.2);
          }
        }
        
        /* Text Gradient Animation */
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x { 
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .vertical-grid-line {
            transform: rotateX(60deg) translateZ(-30px);
          }
          
          .horizontal-grid-line {
            transform: rotateX(60deg) translateZ(-20px);
          }
          
          .glow-left, .glow-right, .glow-center {
            width: 200px;
            height: 150px;
          }
        }
      `}</style>
    </div>
    </>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Modern Background with Purple Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black">
          {/* Animated Grid Floor */}
          <div className="synth-floor">
            {/* Vertical Grid Lines */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`vline-${i}`}
                className="vertical-grid-line"
                style={{
                  left: `${5 + i * 6}%`,
                  animationDelay: `${i * 0.15}s`
                } as React.CSSProperties}
              />
            ))}
            
            {/* Horizontal Grid Lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`hline-${i}`}
                className="horizontal-grid-line"
                style={{
                  bottom: `${10 + i * 8}%`,
                  animationDelay: `${i * 0.1}s`
                } as React.CSSProperties}
              />
            ))}
          </div>
          
          {/* Subtle Mountain Horizon */}
          <div className="mountain-horizon">
            <svg className="horizon-svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="subtleMountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 255, 255, 0.15)" />
                  <stop offset="40%" stopColor="rgba(138, 43, 226, 0.1)" />
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

      {/* Modern Futuristic Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                {/* Futuristic Logo Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="text-white font-black text-xl">⚡</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
                
                {/* Creative App Name */}
                <div className="flex flex-col">
                  <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300 hover:from-pink-400 hover:to-cyan-400 tracking-tight">
                    NEXUS
                  </h1>
                  <span className="text-xs font-mono text-cyan-300 tracking-widest -mt-1">
                    FORGE
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Futuristic Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-8 hover:border-cyan-400/50 transition-all duration-300 group">
            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse group-hover:animate-ping"></span>
            <span className="text-sm font-medium text-cyan-300 tracking-wide">AI-Powered Landing Pages</span>
            <span className="w-3 h-3 bg-purple-400 rounded-full ml-3 animate-pulse group-hover:animate-ping"></span>
          </div>
          
          {/* Modern Gradient Headlines */}
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 hover:from-cyan-400 hover:to-white transition-all duration-500">
              Forge Stunning
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
              Digital Experiences
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:from-pink-400 hover:to-cyan-400 transition-all duration-500">
              in Seconds
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Connect ideas to reality with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">high-converting landing pages</span> forged by 
            cutting-edge AI. No coding required, infinite possibilities unleashed.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mb-12 text-sm text-gray-500 dark:text-slate-400">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span>10,000+ Pages Created</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <span>99% Uptime</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              <span>AI-Generated Copy</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-16">
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 text-lg">
                🚀 Start Creating Now
              </Button>
            </Link>
          </div>
          
          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-orange-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-orange-400 dark:text-orange-400 light:text-orange-600">Beautiful Templates</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Choose from 7 stunning, conversion-optimized templates</p>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-blue-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-400 dark:text-blue-400 light:text-blue-600">AI-Powered Copy</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Let AI write compelling headlines and persuasive content</p>
            </div>
            <div className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white backdrop-blur-sm border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:border-green-500/50 shadow-lg dark:shadow-lg light:shadow-xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-400 dark:text-green-400 light:text-green-600">Lightning Fast</h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-gray-600 text-sm">Download ready-to-use HTML/CSS files in seconds</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-orange-500">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to create professional landing pages that convert visitors into customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition-colors">AI-Powered Generation</h3>
              <p className="text-slate-400 leading-relaxed">
                Our advanced AI analyzes your brand, industry, and goals to create compelling copy and design that converts visitors into customers.
              </p>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4a2 2 0 01-2-2V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">Professional Templates</h3>
              <p className="text-slate-400 leading-relaxed">
                Choose from our collection of professionally designed templates, each optimized for different industries and conversion goals.
              </p>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400 group-hover:text-green-300 transition-colors">Export Ready</h3>
              <p className="text-slate-400 leading-relaxed">
                Download your complete landing page as clean HTML, CSS, and assets ready to deploy anywhere you want.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-blue-400">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From idea to live landing page in just 4 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-slate-600 opacity-30"></div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-orange-500/25 transform hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">Choose Template</h3>
              <p className="text-gray-400 leading-relaxed">Select from 7 stunning, conversion-optimized templates designed for different industries</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-blue-500/25 transform hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Upload Logo</h3>
              <p className="text-gray-400 leading-relaxed">Upload your logo and watch AI extract your brand colors automatically</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-blue-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-blue-400/25 transform hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">Describe Business</h3>
              <p className="text-gray-400 leading-relaxed">Tell us about your business and let AI craft compelling, conversion-focused copy</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-2xl shadow-2xl shadow-green-500/25 transform hover:scale-110 transition-all duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-400">Generate & Export</h3>
              <p className="text-gray-400 leading-relaxed">AI creates your professional landing page, ready to publish anywhere</p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-32 relative">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full mb-8 backdrop-blur-sm">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                <span className="text-blue-400 font-semibold">Premium AI Platform • Live Now</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-slate-100">
                  Ready to Launch?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join <span className="text-cyan-400 font-bold">10,000+</span> businesses already forging 
                extraordinary digital experiences with Nexus Forge
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/signup">
                  <Button size="lg" className="text-xl px-16 py-8 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-2xl shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 rounded-2xl font-black">
                    🚀 Start Creating Now
                  </Button>
                </Link>
                <div className="text-center">
                  <p className="text-sm text-gray-400">✓ Professional AI-powered platform</p>
                  <p className="text-sm text-gray-400">✓ 7 premium templates included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 py-16 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {/* Footer Logo */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                  <div className="text-white font-black text-2xl">⚡</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-xl blur-lg opacity-40"></div>
              </div>
              
              <div className="flex flex-col items-start">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-tight">
                  NEXUS
                </h1>
                <span className="text-sm font-mono text-cyan-300 tracking-widest -mt-1">
                  FORGE
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              The future of landing page creation is here. Forge stunning, conversion-optimized pages 
              with the power of artificial intelligence and cutting-edge design.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>© 2025 Nexus Forge</span>
              <span>•</span>
              <span>Built with ⚡ for creators</span>
              <span>•</span>
              <span>Powered by AI</span>
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
  )
}

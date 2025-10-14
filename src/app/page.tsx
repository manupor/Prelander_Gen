import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neon-accent to-black text-white overflow-hidden relative font-inter">
      {/* Synth Canyon Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* WebGL Canvas Container */}
        <div id="synth-canyon-container" className="absolute inset-0"></div>
        
        {/* Enhanced NetFusion Neon Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neon-accent/20 to-black">
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

      {/* NetFusion Neon Header */}
      <header className="relative z-10 bg-dark-surface/80 backdrop-blur-xl border-b border-neon-primary/20 shadow-neon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                {/* NetFusion Logo Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-primary via-neon-secondary to-neon-primary rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-neon">
                    <div className="text-black font-black text-xl">⚡</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-primary via-neon-secondary to-neon-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
                
                {/* Creative App Name */}
                <div className="flex flex-col">
                  <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-primary transition-all duration-300 hover:from-neon-secondary hover:to-neon-primary tracking-tight font-inter">
                    NEXUS
                  </h1>
                  <span className="text-xs font-mono text-neon-primary tracking-widest -mt-1">
                    FORGE
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-2 border-neon-primary/60 bg-transparent text-neon-primary hover:bg-neon-primary/10 hover:border-neon-primary hover:shadow-neon transition-all duration-300 backdrop-blur-sm font-inter font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-secondary hover:to-neon-primary text-black shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105 font-inter font-bold">
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
          {/* NetFusion Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-primary/10 to-neon-secondary/10 backdrop-blur-sm border border-neon-primary/30 rounded-full mb-8 hover:border-neon-primary/50 transition-all duration-300 group">
            <span className="w-3 h-3 bg-neon-primary rounded-full mr-3 animate-pulse group-hover:animate-ping"></span>
            <span className="text-sm font-medium text-neon-primary tracking-wide font-inter">AI-Powered Landing Pages</span>
            <span className="w-3 h-3 bg-neon-secondary rounded-full ml-3 animate-pulse group-hover:animate-ping"></span>
          </div>
          
          {/* NetFusion Gradient Headlines */}
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight font-inter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-text-muted hover:from-neon-primary hover:to-white transition-all duration-500">
              Forge Stunning
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-primary animate-gradient-x">
              Digital Experiences
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-secondary to-neon-primary hover:from-neon-primary hover:to-neon-secondary transition-all duration-500">
              in Seconds
            </span>
          </h1>
          
          {/* Enhanced Animated Subtitle - Clear and Sharp */}
          <div className="relative text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed font-inter text-center">
            {/* Clean background without blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/5 via-transparent to-neon-secondary/5 rounded-2xl"></div>
            <div className="relative z-10 p-6">
              <span className="text-white">Connect ideas to reality with </span>
              <span className="text-white font-bold">
                high-converting landing pages
              </span>
              <span className="text-white"> forged by </span>
              <span className="text-white font-bold">
                cutting-edge AI
              </span>
              <span className="text-white">. </span>
              <span className="text-white font-semibold">No coding required</span>
              <span className="text-white">, </span>
              <span className="text-white font-bold">
                infinite possibilities unleashed
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
              <Button className="relative bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-secondary hover:to-neon-primary text-black font-black py-5 px-10 rounded-2xl shadow-neon-xl transform hover:scale-105 transition-all duration-300 text-xl font-inter group overflow-hidden border-2 border-neon-primary/20">
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  START CREATING NOW
                  <span className="text-2xl">⚡</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-secondary to-neon-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
          
          {/* NetFusion Synth Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-dark-surface/80 backdrop-blur-sm border border-neon-primary/30 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:border-neon-primary/60 shadow-neon group">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-lg flex items-center justify-center mb-3 mx-auto shadow-neon group-hover:animate-glow">
                <span className="text-lg text-black font-bold">◆</span>
              </div>
              <h3 className="text-sm font-bold mb-1 text-neon-primary font-inter">SYNTH TEMPLATES</h3>
              <p className="text-text-muted text-xs font-inter">7 cyber-optimized templates</p>
            </div>
            <div className="bg-dark-surface/80 backdrop-blur-sm border border-neon-primary/30 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:border-neon-primary/60 shadow-neon group">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-lg flex items-center justify-center mb-3 mx-auto shadow-neon group-hover:animate-glow">
                <span className="text-lg text-black font-bold">▲</span>
              </div>
              <h3 className="text-sm font-bold mb-1 text-neon-primary font-inter">AI NEURAL NET</h3>
              <p className="text-text-muted text-xs font-inter">Neural copy generation</p>
            </div>
            <div className="bg-dark-surface/80 backdrop-blur-sm border border-neon-primary/30 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:border-neon-primary/60 shadow-neon group">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-lg flex items-center justify-center mb-3 mx-auto shadow-neon group-hover:animate-glow">
                <span className="text-lg text-black font-bold">●</span>
              </div>
              <h3 className="text-sm font-bold mb-1 text-neon-primary font-inter">INSTANT DEPLOY</h3>
              <p className="text-text-muted text-xs font-inter">Export in nanoseconds</p>
            </div>
          </div>
        </div>

        {/* NetFusion Synth Features */}
        <div className="mt-20 reveal-on-scroll" data-parallax="0.3">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
                ▲ NEURAL FORGE SYSTEM ▲
              </span>
            </h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto font-inter">
              Advanced AI-powered landing page synthesis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-dark-surface/60 backdrop-blur-sm border border-neon-primary/20 rounded-2xl p-6 hover:border-neon-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-neon">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow shadow-neon">
                <span className="text-xl text-black font-bold">◆</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-neon-primary group-hover:text-neon-secondary transition-colors font-inter">AI NEURAL NET</h3>
              <p className="text-text-muted text-sm leading-relaxed font-inter">
                Advanced neural networks analyze your brand and generate high-converting copy instantly.
              </p>
            </div>
            
            <div className="group bg-dark-surface/60 backdrop-blur-sm border border-neon-primary/20 rounded-2xl p-6 hover:border-neon-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-neon">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow shadow-neon">
                <span className="text-xl text-black font-bold">▲</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-neon-primary group-hover:text-neon-secondary transition-colors font-inter">SYNTH TEMPLATES</h3>
              <p className="text-text-muted text-sm leading-relaxed font-inter">
                Cyber-optimized templates designed for maximum conversion and visual impact.
              </p>
            </div>
            
            <div className="group bg-dark-surface/60 backdrop-blur-sm border border-neon-primary/20 rounded-2xl p-6 hover:border-neon-primary/50 transition-all duration-300 transform hover:-translate-y-1 shadow-neon">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-primary to-neon-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow shadow-neon">
                <span className="text-xl text-black font-bold">●</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-neon-primary group-hover:text-neon-secondary transition-colors font-inter">INSTANT DEPLOY</h3>
              <p className="text-text-muted text-sm leading-relaxed font-inter">
                Export clean HTML/CSS code ready for deployment in nanoseconds.
              </p>
            </div>
          </div>
        </div>

        {/* Synth Process Flow */}
        <div className="mt-20 reveal-on-scroll" data-parallax="0.2">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
                ● NEURAL PROCESS FLOW ●
              </span>
            </h2>
            <p className="text-sm text-text-muted font-inter">4-step synthesis protocol</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Neon Connection Lines */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-neon-primary to-neon-secondary opacity-50"></div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-primary to-neon-secondary text-black rounded-xl flex items-center justify-center mx-auto mb-4 font-black text-lg shadow-neon transform hover:scale-110 transition-all duration-300 hover:animate-glow">
                ◆
              </div>
              <h3 className="text-sm font-bold mb-2 text-neon-primary font-inter">SELECT</h3>
              <p className="text-text-muted text-xs font-inter">Choose synth template</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-primary to-neon-secondary text-black rounded-xl flex items-center justify-center mx-auto mb-4 font-black text-lg shadow-neon transform hover:scale-110 transition-all duration-300 hover:animate-glow">
                ▲
              </div>
              <h3 className="text-sm font-bold mb-2 text-neon-primary font-inter">UPLOAD</h3>
              <p className="text-text-muted text-xs font-inter">Neural brand analysis</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-primary to-neon-secondary text-black rounded-xl flex items-center justify-center mx-auto mb-4 font-black text-lg shadow-neon transform hover:scale-110 transition-all duration-300 hover:animate-glow">
                ●
              </div>
              <h3 className="text-sm font-bold mb-2 text-neon-primary font-inter">DESCRIBE</h3>
              <p className="text-text-muted text-xs font-inter">AI copy synthesis</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-primary to-neon-secondary text-black rounded-xl flex items-center justify-center mx-auto mb-4 font-black text-lg shadow-neon transform hover:scale-110 transition-all duration-300 hover:animate-glow">
                ◇
              </div>
              <h3 className="text-sm font-bold mb-2 text-neon-primary font-inter">DEPLOY</h3>
              <p className="text-text-muted text-xs font-inter">Instant export</p>
            </div>
          </div>
        </div>

        {/* NetFusion CTA Terminal */}
        <div className="mt-20 relative reveal-on-scroll">
          <div className="bg-dark-surface/80 backdrop-blur-xl border border-neon-primary/30 rounded-2xl p-8 text-center relative overflow-hidden shadow-neon">
            {/* Synth Background Effects */}
            <div className="absolute inset-0 bg-neon-primary/5 rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-neon-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-neon-secondary/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-neon-primary/20 border border-neon-primary/30 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-neon-primary rounded-full mr-2 animate-pulse"></span>
                <span className="text-neon-primary font-semibold text-sm font-inter">NEURAL FORGE • ONLINE</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 font-inter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-neon-secondary">
                  ▲ READY TO SYNTHESIZE? ▲
                </span>
              </h2>
              
              <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto font-inter">
                Join <span className="text-neon-primary font-bold">10,000+</span> users forging digital experiences with neural AI
              </p>
              
              <div className="flex justify-center">
                <Link href="/signup">
                  <Button className="text-lg px-12 py-4 bg-gradient-to-r from-neon-primary to-neon-secondary hover:from-neon-secondary hover:to-neon-primary text-black border-0 shadow-neon-xl transform hover:scale-105 transition-all duration-300 rounded-xl font-black font-inter">
                    ◆ INITIALIZE FORGE ◆
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 flex justify-center space-x-6 text-xs text-text-muted font-inter">
                <span>✓ Neural AI Platform</span>
                <span>✓ 7 Synth Templates</span>
                <span>✓ Instant Deploy</span>
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
  )
}

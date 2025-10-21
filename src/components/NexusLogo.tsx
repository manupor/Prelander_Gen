import Link from 'next/link'

interface NexusLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  href?: string
}

export function NexusLogo({ size = 'md', showText = true, href = '/' }: NexusLogoProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      icon: 'text-lg',
      title: 'text-xl',
      subtitle: 'text-xs'
    },
    md: {
      container: 'w-12 h-12',
      icon: 'text-xl',
      title: 'text-3xl',
      subtitle: 'text-xs'
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'text-2xl',
      title: 'text-4xl',
      subtitle: 'text-sm'
    }
  }

  const LogoContent = () => (
    <div className="flex items-center space-x-3 group">
      {/* Futuristic Logo Icon */}
      <div className="relative">
        <div className={`${sizeClasses[size].container} bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <div className={`text-white font-black ${sizeClasses[size].icon}`}>⚡</div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
      </div>
      
      {/* Brand Name */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${sizeClasses[size].title} font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]`}>
            NEXUS
          </h1>
          <span className={`${sizeClasses[size].subtitle} font-mono text-cyan-400 tracking-widest -mt-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]`}>
            FORGE
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}

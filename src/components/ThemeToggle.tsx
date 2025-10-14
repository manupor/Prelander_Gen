'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm font-semibold shadow-lg dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 light:border-gray-300 light:bg-white light:text-gray-900 light:hover:bg-gray-100"
    >
      {theme === 'dark' ? (
        <span className="flex items-center space-x-2">
          <span>☀️</span>
          <span className="hidden sm:inline">Light</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <span>🌙</span>
          <span className="hidden sm:inline">Dark</span>
        </span>
      )}
    </Button>
  )
}

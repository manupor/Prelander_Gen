import { ColorPalette } from './types'

export async function extractColorsFromImage(imageUrl: string): Promise<ColorPalette> {
  // Return default branded colors (node-vibrant removed due to ESM compatibility issues)
  console.log('Using default colors for image:', imageUrl)
  
  return {
    primary: '#3B82F6',   // Blue
    secondary: '#6B7280', // Gray  
    accent: '#10B981'     // Green
  }
}

export function generateCSSVariables(colors: ColorPalette): string {
  return `
    :root {
      --brand-primary: ${colors.primary};
      --brand-secondary: ${colors.secondary};
      --brand-accent: ${colors.accent};
    }
  `
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return '#000000'
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * (percent / 100)))
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * (percent / 100)))
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * (percent / 100)))
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const r = Math.max(0, Math.floor(rgb.r * (1 - percent / 100)))
  const g = Math.max(0, Math.floor(rgb.g * (1 - percent / 100)))
  const b = Math.max(0, Math.floor(rgb.b * (1 - percent / 100)))
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

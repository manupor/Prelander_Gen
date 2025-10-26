import { renderTemplate as renderT7 } from '@/templates/t7/server'

interface SearchParams {
  templateId?: string
  headline?: string
  subheadline?: string
  cta?: string
  ctaUrl?: string
  primaryColor?: string
  secondaryColor?: string
  demo?: string
}

export default async function DemoPreview({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams>
}) {
  const query = await searchParams
  
  // Demo mode always uses t7 (Sweet Bonanza)
  const brandConfig = {
    brandName: 'Demo Casino',
    logoUrl: '',
    colors: {
      primary: query.primaryColor || '#4a90e2',
      secondary: query.secondaryColor || '#7b68ee',
      accent: '#ffd700'
    },
    copy: {
      headline: query.headline || 'WIN BIG WITH BONANZA BILLION SLOTS!',
      subheadline: query.subheadline || 'Premium 3x3 slot machine with life-changing prizes',
      cta: query.cta || 'SPIN TO WIN'
    },
    industry: 'Casino & Gaming',
    description: 'Demo preview',
    ctaUrl: query.ctaUrl || '#',
    popupTitle: 'WINNER!',
    popupMessage: 'Congratulations! You\'ve won!',
    popupPrize: '$1,000 + 50 FREE SPINS',
    gameBalance: 1000,
    customLogo: null
  }

  // Render Sweet Bonanza template
  const rendered = renderT7(brandConfig)
  let html = rendered.html
  let css = rendered.css || ''

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Demo Preview</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </body>
    </html>
  )
}

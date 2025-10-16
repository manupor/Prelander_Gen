import { renderTemplate as renderT1 } from '@/templates/t1'
import { renderTemplate as renderT2 } from '@/templates/t2'
import { renderTemplate as renderT3 } from '@/templates/t3'
import { renderTemplate as renderT4 } from '@/templates/t4'
import { renderTemplate as renderT5 } from '@/templates/t5'
import { renderTemplate as renderT6 } from '@/templates/t6'
import { renderTemplate as renderT7 } from '@/templates/t7/server'
import type { BrandConfig } from '@/lib/types'

const brand: BrandConfig = {
  brandName: 'SmokeTest Brand',
  logoUrl: undefined,
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981',
  },
  copy: {
    headline: 'Smoke Test Headline',
    subheadline: 'Subheadline for smoke test rendering',
    cta: 'Get Started',
  },
  industry: 'Technology',
  description: 'This is a smoke-test description.',
  ctaUrl: 'https://example.com'
}

const tests: Array<[string, (b: BrandConfig) => { html: string; css: string }]> = [
  ['t1', renderT1],
  ['t2', renderT2],
  ['t3', renderT3],
  ['t4', renderT4],
  ['t5', renderT5],
  ['t6', renderT6],
  ['t7', renderT7],
]

let failures = 0
for (const [id, renderer] of tests) {
  try {
    const { html, css } = renderer(brand)
    if (!html || !css) throw new Error('Empty html/css')
    console.log(`[OK] ${id} rendered: html=${html.length} css=${css.length}`)
  } catch (e) {
    failures++
    console.error(`[FAIL] ${id} renderer threw:`, e)
  }
}

if (failures > 0) {
  console.error(`Smoke test failed: ${failures} template(s) had errors.`)
  process.exit(1)
} else {
  console.log('All templates rendered successfully.')
}

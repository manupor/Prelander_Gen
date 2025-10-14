import { Template6, renderTemplate as renderT6 } from './t6'
import { Template7, renderTemplate as renderT7 } from './t7'
import { Template9, renderTemplate as renderT9 } from './t9'
import { Template10, renderTemplate as renderT10 } from './t10'
import { Template11, renderTemplate as renderT11 } from './t11'
import { Template12, renderTemplate as renderT12 } from './t12'
import { TemplateDefinition } from '@/lib/types'

export const templates: Record<'t6' | 't7' | 't9' | 't10' | 't11' | 't12', TemplateDefinition> = {
  t6: {
    id: 't6',
    name: 'Cyber Casino',
    description: 'Futuristic neon-themed casino with cyberpunk aesthetics and digital grid design',
    preview: '/templates/t6-preview.png',
    component: Template6,
    renderTemplate: renderT6,
  },
  t7: {
    id: 't7',
    name: 'Bonanza Billion',
    description: 'Premium 3x3 slot machine with jackpot features and animated bonanza theme',
    preview: '/templates/t7-preview.svg',
    component: Template7,
    renderTemplate: renderT7,
  },
  t9: {
    id: 't9',
    name: 'Fisherman Slot',
    description: 'Ocean-themed slot machine with fishing adventure and interactive reels',
    preview: '/templates/t9-preview.png',
    component: Template9,
    renderTemplate: renderT9,
  },
  t10: {
    id: 't10',
    name: 'Castle Slot',
    description: 'Medieval castle-themed slot machine with royal treasures and kingdom adventures',
    preview: '/templates/t10-preview.png',
    component: Template10,
    renderTemplate: renderT10,
  },
  t11: {
    id: 't11',
    name: 'Scratch & Win',
    description: 'Interactive scratch card game with 9 scratchable golden boxes and instant win prizes',
    preview: '/templates/t11-preview.svg',
    component: Template11,
    renderTemplate: renderT11,
  },
  t12: {
    id: 't12',
    name: 'Aviator Crash',
    description: 'Exciting airplane crash game with auto-play, live video winner, and synchronized 13-second gameplay',
    preview: '/templates/t12-preview.svg',
    component: Template12,
    renderTemplate: renderT12,
  },
}

export { 
  Template6,
  Template7, 
  Template9,
  Template10,
  Template11,
  Template12,
  renderT6,
  renderT7,
  renderT9,
  renderT10,
  renderT11,
  renderT12
}

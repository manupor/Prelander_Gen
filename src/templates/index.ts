import { Template6, renderTemplate as renderT6 } from './t6'
import { Template7, renderTemplate as renderT7 } from './t7'
import { Template9, renderTemplate as renderT9 } from './t9'
import { Template10, renderTemplate as renderT10 } from './t10'
import { Template14 } from './t14'
import { renderTemplate as renderT14 } from './t14/server'
import { TemplateDefinition } from '@/lib/types'

export const templates: Record<'t6' | 't7' | 't9' | 't10' | 't14', TemplateDefinition> = {
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
  t14: {
    id: 't14',
    name: 'Pirates Wheel Fortune',
    description: 'Spin the wheel of fortune with pirate treasure theme - interactive wheel game with prizes',
    preview: '/templates/t14-preview.png',
    component: Template14,
    renderTemplate: renderT14,
  },
}

export { 
  Template6,
  Template7, 
  Template9,
  Template10,
  Template14,
  renderT6,
  renderT7,
  renderT9,
  renderT10,
  renderT14
}

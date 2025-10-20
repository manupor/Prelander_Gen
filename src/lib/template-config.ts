/**
 * Template Configuration
 * 
 * Define qué campos son editables para cada template.
 * Esto asegura que el sidebar del editor muestre SOLO los campos
 * que el template realmente usa y puede renderizar.
 */

export interface TemplateField {
  id: string
  label: string
  type: 'text' | 'number' | 'url' | 'textarea'
  placeholder?: string
  description?: string
  required?: boolean
}

export interface TemplateConfig {
  id: string
  name: string
  fields: {
    // Basic fields (always available)
    headline?: TemplateField
    subheadline?: TemplateField
    cta?: TemplateField
    ctaUrl?: TemplateField
    
    // Game-specific fields
    gameBalance?: TemplateField
    gameCredit?: TemplateField
    gameTotalBet?: TemplateField
    totalWin?: TemplateField
    
    // Popup/Win modal fields
    popupTitle?: TemplateField
    popupMessage?: TemplateField
    popupPrize?: TemplateField
  }
}

// Template configurations
export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  t6: {
    id: 't6',
    name: 'Classic Overlay',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'YOUR TITLE HERE',
        description: 'Main headline displayed above the game',
        required: true
      },
      subheadline: {
        id: 'subheadline',
        label: 'Subtitle',
        type: 'text',
        placeholder: 'Join thousands of winners...',
        description: 'Secondary text below the title'
      },
      cta: {
        id: 'cta',
        label: 'Button Text',
        type: 'text',
        placeholder: 'PLAY NOW',
        description: 'Call-to-action button text',
        required: true
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go when they click the button',
        required: true
      }
    }
  },

  t7: {
    id: 't7',
    name: 'Sweet Bonanza',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'WIN BIG WITH BONANZA BILLION SLOTS!',
        description: 'Main headline displayed at the top',
        required: true
      },
      subheadline: {
        id: 'subheadline',
        label: 'Subtitle',
        type: 'text',
        placeholder: 'Premium 3x3 slot machine with life-changing prizes',
        description: 'Secondary text below the title'
      },
      cta: {
        id: 'cta',
        label: 'Button Text',
        type: 'text',
        placeholder: 'SPIN TO WIN',
        description: 'Main action button text',
        required: true
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go when they click',
        required: true
      }
    }
  },

  t9: {
    id: 't9',
    name: 'FisherMan Slot',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'FISHERMAN SLOT',
        description: 'Main game title',
        required: true
      },
      gameBalance: {
        id: 'gameBalance',
        label: '💰 Game Balance',
        type: 'number',
        placeholder: '1000',
        description: 'Starting balance shown in the game',
        required: false
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go after winning',
        required: true
      },
      popupTitle: {
        id: 'popupTitle',
        label: 'Win Popup Title',
        type: 'text',
        placeholder: 'WINNER!',
        description: 'Title shown in the win popup',
        required: false
      },
      popupMessage: {
        id: 'popupMessage',
        label: 'Win Popup Message',
        type: 'textarea',
        placeholder: 'Congratulations! You\'ve won!',
        description: 'Message shown in the win popup',
        required: false
      },
      popupPrize: {
        id: 'popupPrize',
        label: 'Prize Display',
        type: 'text',
        placeholder: '$1,000 + 50 FREE SPINS',
        description: 'Prize amount shown in popup',
        required: false
      }
    }
  },

  t10: {
    id: 't10',
    name: 'FisherMan Slot 2',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'FISHERMAN SLOT',
        description: 'Main game title',
        required: true
      },
      gameBalance: {
        id: 'gameBalance',
        label: '💰 Game Balance',
        type: 'number',
        placeholder: '1000',
        description: 'Starting balance shown in the game',
        required: false
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go after winning',
        required: true
      },
      popupTitle: {
        id: 'popupTitle',
        label: 'Win Popup Title',
        type: 'text',
        placeholder: 'WINNER!',
        description: 'Title shown in the win popup',
        required: false
      },
      popupMessage: {
        id: 'popupMessage',
        label: 'Win Popup Message',
        type: 'textarea',
        placeholder: 'Congratulations! You\'ve won!',
        description: 'Message shown in the win popup',
        required: false
      },
      popupPrize: {
        id: 'popupPrize',
        label: 'Prize Display',
        type: 'text',
        placeholder: '$1,000 + 50 FREE SPINS',
        description: 'Prize amount shown in popup',
        required: false
      }
    }
  },

  t11: {
    id: 't11',
    name: 'Aviator Crash',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'AVIATOR CRASH',
        description: 'Main game title',
        required: true
      },
      cta: {
        id: 'cta',
        label: 'Button Text',
        type: 'text',
        placeholder: 'PLACE BET',
        description: 'Main action button text',
        required: true
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go when they click',
        required: true
      }
    }
  },

  t12: {
    id: 't12',
    name: 'Scratch & Win',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'SCRATCH & WIN',
        description: 'Main game title',
        required: true
      },
      cta: {
        id: 'cta',
        label: 'Button Text',
        type: 'text',
        placeholder: 'SCRATCH NOW',
        description: 'Main action button text',
        required: true
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go when they click',
        required: true
      }
    }
  },

  t13: {
    id: 't13',
    name: 'Pirate\'s Treasures Slot',
    fields: {
      headline: {
        id: 'headline',
        label: 'Game Title',
        type: 'text',
        placeholder: 'PIRATE\'S TREASURES',
        description: 'Main game title displayed at top',
        required: true
      },
      gameBalance: {
        id: 'gameBalance',
        label: '💰 Game Balance',
        type: 'number',
        placeholder: '150000',
        description: 'Starting balance shown in coins',
        required: false
      },
      cta: {
        id: 'cta',
        label: 'Spin Button Text',
        type: 'text',
        placeholder: 'SPIN',
        description: 'Main spin button text',
        required: true
      },
      ctaUrl: {
        id: 'ctaUrl',
        label: 'Destination URL',
        type: 'url',
        placeholder: 'https://your-casino.com/signup',
        description: 'Where users go after claiming prize',
        required: true
      },
      popupTitle: {
        id: 'popupTitle',
        label: 'Win Popup Title',
        type: 'text',
        placeholder: 'TREASURE FOUND!',
        description: 'Title shown in the win popup',
        required: false
      },
      popupMessage: {
        id: 'popupMessage',
        label: 'Win Popup Message',
        type: 'textarea',
        placeholder: 'You\'ve discovered a legendary prize!',
        description: 'Message shown in the win popup',
        required: false
      },
      popupPrize: {
        id: 'popupPrize',
        label: 'Prize Display',
        type: 'text',
        placeholder: '$5,000 + 100 FREE SPINS',
        description: 'Prize amount shown in popup',
        required: false
      }
    }
  }
}

/**
 * Get the configuration for a specific template
 */
export function getTemplateConfig(templateId: string): TemplateConfig | null {
  return TEMPLATE_CONFIGS[templateId] || null
}

/**
 * Get all editable field IDs for a template
 */
export function getTemplateEditableFields(templateId: string): string[] {
  const config = getTemplateConfig(templateId)
  if (!config) return []
  return Object.keys(config.fields)
}

/**
 * Check if a template supports a specific field
 */
export function templateSupportsField(templateId: string, fieldId: string): boolean {
  const config = getTemplateConfig(templateId)
  if (!config) return false
  return fieldId in config.fields
}

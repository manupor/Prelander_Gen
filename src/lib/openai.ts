import OpenAI from 'openai'
import { OpenAIResponseSchema, type OpenAIResponse } from './types'

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

export async function generateMarketingCopy({
  brandName,
  industry,
  description
}: {
  brandName: string
  industry: string
  description?: string
}): Promise<OpenAIResponse> {
  try {
    // If no OpenAI API key, use fallback directly
    if (!openai) {
      console.log('OpenAI API key not available, using fallback copy')
      // Skip to fallback section
      throw new Error('No OpenAI key - using fallback')
    }

    const systemPrompt = `You are a senior conversion copywriter. Output concise, high-converting copy in JSON, strictly following the schema. Focus on creating compelling headlines that drive action.`

    const userPrompt = `Create marketing copy for:
Brand: ${brandName}
Industry: ${industry}
Description: ${description}

Generate JSON with:
- headline: Compelling main headline (max 10 words)
- subheadline: Supporting text that explains value (max 20 words)
- cta: Action-oriented call-to-action (max 6 words)
- seo_keywords: Relevant keywords for SEO (max 6 keywords)

Focus on benefits, urgency, and clear value proposition.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated from OpenAI')
    }

    const parsed = JSON.parse(content)
    return OpenAIResponseSchema.parse(parsed)
  } catch (error) {
    console.error('OpenAI generation failed:', error)
    
    // Fallback to casino-specific defaults for gaming industry
    if (industry.toLowerCase().includes('gaming') || industry.toLowerCase().includes('casino') || industry.toLowerCase().includes('entertainment')) {
      return {
        headline: `${brandName} - Win Big Today!`,
        subheadline: `Join thousands of winners at the hottest casino of 2025`,
        cta: 'Play Now & Win!',
        seo_keywords: [brandName.toLowerCase(), 'casino', 'slots', 'win', 'jackpot', 'gaming'],
      }
    }
    
    // Fallback to safe defaults
    return {
      headline: `Transform Your ${industry} Business`,
      subheadline: `${brandName} delivers results you can trust`,
      cta: 'Get Started Today',
      seo_keywords: [brandName.toLowerCase(), industry.toLowerCase(), 'solution', 'business', 'professional', 'service'],
    }
  }
}

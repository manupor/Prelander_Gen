import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai) {
      return NextResponse.json(
        { 
          message: '⚠️ AI Assistant is not configured. Please add OPENAI_API_KEY to environment variables.',
          changes: null
        },
        { status: 200 }
      )
    }

    const { message, context, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation context
    const systemPrompt = `You are an AI assistant for a landing page builder called Nexus Forge. You help users edit and customize their landing pages.

Current page context:
${context ? JSON.stringify(context, null, 2) : 'No context available'}

You can help with:
- Changing headlines, CTAs, and copy
- Adjusting colors (primary, secondary, accent)
- Modifying game settings (balance, popup messages)
- Updating URLs and links
- General design advice

When suggesting changes, be specific and actionable. If you recommend changes to the page, format your response with clear instructions.

If you want to apply changes automatically, include a JSON object at the end of your message with this format:
\`\`\`json
{
  "changes": {
    "headline": "New headline",
    "primaryColor": "#ff0000",
    // ... other fields
  }
}
\`\`\`

Be friendly, helpful, and concise. Use emojis occasionally to make the conversation engaging.`

    const messages: any[] = [
      { role: 'system', content: systemPrompt }
    ]

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.role,
          content: msg.content
        })
      })
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    })

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1000
    })

    const assistantMessage = completion.choices[0].message.content || 'Sorry, I could not generate a response.'

    // Try to extract JSON changes if present
    let changes = null
    const jsonMatch = assistantMessage.match(/```json\n([\s\S]*?)\n```/)
    if (jsonMatch) {
      try {
        const jsonData = JSON.parse(jsonMatch[1])
        changes = jsonData.changes
      } catch (e) {
        console.error('Failed to parse JSON changes:', e)
      }
    }

    // Remove JSON block from message if present
    const cleanMessage = assistantMessage.replace(/```json\n[\s\S]*?\n```/g, '').trim()

    return NextResponse.json({
      message: cleanMessage,
      changes
    })

  } catch (error: any) {
    console.error('AI Assistant Error:', error)
    
    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'OpenAI API key is invalid or missing' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process AI request', details: error?.message },
      { status: 500 }
    )
  }
}

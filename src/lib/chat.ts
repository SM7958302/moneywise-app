import OpenAI from 'openai'
import { prisma } from './prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are a friendly and knowledgeable financial advisor helping young people learn about money and personal finance. 
Your responses should be:
1. Educational but easy to understand
2. Encouraging and supportive
3. Focused on practical advice
4. Age-appropriate for teenagers
5. Brief but informative (2-3 paragraphs maximum)

You can help with:
- Explaining financial concepts
- Giving budgeting advice
- Answering questions about saving and investing
- Providing tips for money management
- Explaining how banking works

Always encourage good financial habits and responsible money management.`

export async function getChatResponse(userId: string, message: string) {
  try {
    // Save user message
    const userMessage = await prisma.$transaction([
      prisma.chatMessage.create({
        data: {
          userId,
          content: message,
          role: 'user'
        }
      })
    ])

    // Get chat history
    const history = await prisma.chatMessage.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 10 // Limit history to last 10 messages
    })

    // Convert history to OpenAI format
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ]

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 500
    })

    const response = completion.choices[0].message.content

    // Save assistant response
    await prisma.chatMessage.create({
      data: {
        userId,
        content: response || "I'm sorry, I couldn't generate a response.",
        role: 'assistant'
      }
    })

    return response

  } catch (error) {
    console.error('Chat error:', error)
    throw new Error('Failed to get chat response')
  }
} 
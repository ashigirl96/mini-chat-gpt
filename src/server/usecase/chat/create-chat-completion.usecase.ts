import {
  chatGPTClient,
  ChatResponse,
} from '~/server/model/chat-gpt-client.model'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { prisma } from '~/server/prisma'

interface ChatGptMessage {
  role: ChatCompletionRequestMessageRoleEnum
  content: string
}

const chatGptMessages = (message: string): ChatGptMessage[] => [
  // TODO: ここらへんよくわからんから調べる
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: 'You are a helpful assistant.',
  },
  {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: message,
  },
]

export class CreateChatCompletionUsecase {
  async execute(message: string): Promise<ChatResponse> {
    const messages = chatGptMessages(message)
    const result = await chatGPTClient.respond({
      messages,
      model: 'gpt-3.5-turbo',
      stream: false,
    })
    const timeline = await prisma.chatTimeline.findFirst()
    if (timeline && result.text) {
      await prisma.chat.create({
        data: {
          ChatTimelineId: timeline.id,
          prompt: message,
          answer: result.text,
        },
      })
    }
    return result
  }
}

import {
  chatGPTClient,
  ChatResponse,
} from '~/server/model/chat-gpt-client.model'
import { ChatRepository } from '~/server/infrastructure/repository/chat.repository'
import { ChatTimelineRepository } from '~/server/infrastructure/repository/chat-timeline.repository'

export class CreateChatCompletionUsecase {
  private chatRepository: ChatRepository
  private chatTimelineRepository: ChatTimelineRepository
  constructor() {
    this.chatRepository = new ChatRepository()
    this.chatTimelineRepository = new ChatTimelineRepository()
  }
  async execute({
    prompt,
    timelineId,
  }: {
    prompt: string
    timelineId: string
  }): Promise<ChatResponse> {
    const timeline = await this.chatTimelineRepository.find(timelineId)
    const messages = timeline.messages(prompt)
    const result = await chatGPTClient.respond({
      messages,
      model: 'gpt-3.5-turbo',
      stream: false,
    })
    await this.chatRepository.create({
      timelineId: timeline.id,
      prompt,
      response: result.text,
    })
    return result
  }
}

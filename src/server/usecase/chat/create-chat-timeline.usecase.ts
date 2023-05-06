import { ChatTimelineRepository } from '~/server/infrastructure/repository/chat-timeline.repository'

export class CreateChatTimelineUsecase {
  private chatTimelineRepository: ChatTimelineRepository
  constructor() {
    this.chatTimelineRepository = new ChatTimelineRepository()
  }

  async execute({ title }: { title: string }) {
    return await this.chatTimelineRepository.create(title)
  }
}

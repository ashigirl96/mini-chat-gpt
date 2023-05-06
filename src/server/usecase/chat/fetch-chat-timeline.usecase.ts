import { ChatTimelineRepository } from '~/server/infrastructure/repository/chat-timeline.repository'

export class FetchChatTimelineUsecase {
  private chatTimelineRepository: ChatTimelineRepository
  constructor() {
    this.chatTimelineRepository = new ChatTimelineRepository()
  }

  async execute({ id }: { id: string }) {
    return await this.chatTimelineRepository.find(id)
  }
}

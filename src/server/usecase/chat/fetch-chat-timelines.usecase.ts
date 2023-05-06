import { ChatTimelineRepository } from '~/server/infrastructure/repository/chat-timeline.repository'

export class FetchChatTimelinesUsecase {
  private chatTimelineRepository: ChatTimelineRepository
  constructor() {
    this.chatTimelineRepository = new ChatTimelineRepository()
  }

  async execute() {
    return await this.chatTimelineRepository.findAll()
  }
}

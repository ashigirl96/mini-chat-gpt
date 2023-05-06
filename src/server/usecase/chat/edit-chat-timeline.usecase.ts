import { ChatTimelineRepository } from '~/server/infrastructure/repository/chat-timeline.repository'

export class EditChatTimelineUsecase {
  private chatTimelineRepository: ChatTimelineRepository
  constructor() {
    this.chatTimelineRepository = new ChatTimelineRepository()
  }

  async execute({ id, title }: { id: string; title: string }) {
    return await this.chatTimelineRepository.update(id, title)
  }
}

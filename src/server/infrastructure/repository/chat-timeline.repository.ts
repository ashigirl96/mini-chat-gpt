import { prisma } from '~/server/prisma'
import { ChatTimelineEntity } from '~/server/domain/entity/chat-timeline.entity'
import { ChatEntity } from '~/server/domain/entity/chat.entity'

export class ChatTimelineRepository {
  async findOrCreate(id: string | null) {
    const timeline = await prisma.chatTimeline.upsert({
      where: {
        id: id ?? '',
      },
      update: {},
      create: {},
      select: {
        id: true,
        Chats: true,
      },
    })
    const chats = timeline.Chats.map(({ id, ChatTimelineId, answer, prompt }) =>
      ChatEntity.fromPrisma({
        id,
        answer,
        prompt,
        timelineId: ChatTimelineId,
      }),
    )
    return ChatTimelineEntity.fromPrisma({
      id: timeline.id,
      chats,
    })
  }
}

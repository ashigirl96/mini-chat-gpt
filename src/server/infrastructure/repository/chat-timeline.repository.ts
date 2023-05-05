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
        chats: true,
      },
    })
    const chats = timeline.chats.map(({ id, timelineId, response, prompt }) =>
      ChatEntity.fromPrisma({
        id,
        response,
        prompt,
        timelineId,
      }),
    )
    return ChatTimelineEntity.fromPrisma({
      id: timeline.id,
      chats,
    })
  }
}

import { prisma } from '~/server/prisma'
import { ChatTimelineEntity } from '~/server/domain/entity/chat-timeline.entity'
import { ChatEntity } from '~/server/domain/entity/chat.entity'

export class ChatTimelineRepository {
  async find(id: string) {
    const { title, ...timeline } = await prisma.chatTimeline.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        chats: true,
      },
    })
    const chats = timeline.chats.map((chat) => ChatEntity.fromPrisma(chat))
    return ChatTimelineEntity.fromPrisma({
      id,
      title,
      chats,
    })
  }

  // async findOrCreate(id: string | null) {
  //   const timeline = await prisma.chatTimeline.upsert({
  //     where: {
  //       id: id ?? '',
  //     },
  //     update: {},
  //     create: {},
  //     select: {
  //       id: true,
  //       chats: true,
  //     },
  //   })
  //   const chats = timeline.chats.map(
  //     ({ id, timelineId, response, prompt, status }) =>
  //       ChatEntity.fromPrisma({
  //         id,
  //         response,
  //         prompt,
  //         timelineId,
  //         status,
  //       }),
  //   )
  //   return ChatTimelineEntity.fromPrisma({
  //     id: timeline.id,
  //     chats,
  //   })
  // }
}

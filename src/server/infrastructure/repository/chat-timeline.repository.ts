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

  async findAll() {
    const timelines = await prisma.chatTimeline.findMany({
      select: {
        id: true,
        title: true,
        chats: true,
      },
    })
    return timelines.map(({ id, title, chats }) =>
      ChatTimelineEntity.fromPrisma({
        id,
        title,
        chats: chats.map((chat) => ChatEntity.fromPrisma(chat)),
      }),
    )
  }

  async create(title: string) {
    const timeline = await prisma.chatTimeline.create({
      data: {
        title,
      },
      select: {
        id: true,
        title: true,
      },
    })
    return ChatTimelineEntity.fromPrisma({
      id: timeline.id,
      title: timeline.title,
      chats: [],
    })
  }

  async update(id: string, title: string) {
    const timeline = await prisma.chatTimeline.update({
      where: {
        id,
      },
      data: {
        title,
      },
      select: {
        id: true,
        title: true,
        chats: true,
      },
    })
    return ChatTimelineEntity.fromPrisma({ ...timeline })
  }

  // async findOrCreate(id: string | null) {
  //   const timelines = await prisma.chatTimeline.upsert({
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
  //   const chats = timelines.chats.map(
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
  //     id: timelines.id,
  //     chats,
  //   })
  // }
}

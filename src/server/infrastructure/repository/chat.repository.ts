import { prisma } from '~/server/prisma'

export class ChatRepository {
  async create({
    prompt,
    response,
    timelineId,
  }: {
    prompt: string
    response?: string
    timelineId: string
  }) {
    if (response) {
      await prisma.chat.create({
        data: {
          prompt,
          response,
          timelineId,
        },
      })
    }
  }
}

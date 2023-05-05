import { ChatTimeline } from '@prisma/client'
import { prisma } from '~/server/prisma'

export class ChatRepository {
  async create({
    prompt,
    answer,
    timelineId,
  }: {
    prompt: string
    answer?: string
    timelineId: string
  }) {
    if (answer) {
      await prisma.chat.create({
        data: {
          prompt,
          answer,
          ChatTimelineId: timelineId,
        },
      })
    }
  }
}

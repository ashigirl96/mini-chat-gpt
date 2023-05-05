import { ChatResponseStatus } from '@prisma/client'
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
      return await prisma.chat.create({
        data: {
          prompt,
          response,
          timelineId,
          status: ChatResponseStatus.Success,
        },
      })
    }
    return await prisma.chat.create({
      data: {
        prompt,
        timelineId,
        status: ChatResponseStatus.Failure,
      },
    })
  }
}

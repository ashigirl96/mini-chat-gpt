import { publicProcedure } from '~/server/trpc'
import { z } from 'zod'
import { CreateChatTimelineUsecase } from '~/server/usecase/chat/create-chat-timeline.usecase'

export class ChatTimelineResolver {
  static createTimeline() {
    const usecase = new CreateChatTimelineUsecase()
    return publicProcedure
      .input(
        z.object({
          title: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await usecase.execute(input)
      })
  }
}

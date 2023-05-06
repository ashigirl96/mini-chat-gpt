import { publicProcedure } from '~/server/trpc'
import { z } from 'zod'
import { CreateChatTimelineUsecase } from '~/server/usecase/chat/create-chat-timeline.usecase'
import { EditChatTimelineUsecase } from '~/server/usecase/chat/edit-chat-timeline.usecase'
import { FetchChatTimelineUsecase } from '~/server/usecase/chat/fetch-chat-timeline.usecase'
import { FetchChatTimelinesUsecase } from '~/server/usecase/chat/fetch-chat-timelines.usecase'

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

  static editTimeline() {
    const usecase = new EditChatTimelineUsecase()
    return publicProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await usecase.execute(input)
      })
  }

  static fetchTimeline() {
    const usecase = new FetchChatTimelineUsecase()
    return publicProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => {
        return await usecase.execute(input)
      })
  }
  static fetchTimelines() {
    const usecase = new FetchChatTimelinesUsecase()
    return publicProcedure.query(async () => {
      return await usecase.execute()
    })
  }
}

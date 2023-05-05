import { publicProcedure } from '~/server/trpc'
import { z } from 'zod'
import { CreateChatCompletionUsecase } from '~/server/usecase/chat/create-chat-completion.usecase'

export class ChatCompletionResolver {
  static createChatCompletion() {
    const usecase = new CreateChatCompletionUsecase()
    return publicProcedure
      .input(
        z.object({
          prompt: z.string(),
          timelineId: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await usecase.execute(input)
      })
  }
}

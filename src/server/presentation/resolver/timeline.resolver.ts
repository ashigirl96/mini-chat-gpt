import { publicProcedure } from '~/server/trpc'
import { z } from 'zod'

export class TimelineResolver {
  static createTimeline() {
    return publicProcedure
      .input(
        z.object({
          title: z.string(),
        }),
      )
      .mutation(async ({ input }) => {})
  }
}

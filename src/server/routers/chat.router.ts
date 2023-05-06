import { router } from '~/server/trpc'
import { ChatCompletionResolver } from '~/server/presentation/resolver/chat-completion.resolver'
import { ChatTimelineResolver } from '~/server/presentation/resolver/chat-timeline.resolver'

export const chatRouter = router({
  createChatCompletion: ChatCompletionResolver.createChatCompletion(),
  createChatTimeline: ChatTimelineResolver.createTimeline(),
  editChatTimeline: ChatTimelineResolver.editTimeline(),
  fetchChatTimeline: ChatTimelineResolver.fetchTimeline(),
  fetchChatTimelines: ChatTimelineResolver.fetchTimelines(),
})

//     if (!post) {
//       throw new TRPCError({
//         code: 'NOT_FOUND',
//         message: `No post with id '${id}'`,
//       });
//     }

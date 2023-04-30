import { router } from '~/server/trpc';
import { ChatCompletionResolver } from '~/server/presentation/resolver/chat-completion.resolver';

export const chatRouter = router({
  createChatCompletion: ChatCompletionResolver.createChatCompletion(),
});

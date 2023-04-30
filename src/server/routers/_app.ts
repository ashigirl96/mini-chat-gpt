/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { chatRouter } from './chat.router';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;

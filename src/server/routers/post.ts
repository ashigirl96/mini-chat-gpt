export {};
// export const postRouter = router({
// list: publicProcedure
//   .input(
//     z.object({
//       limit: z.number().min(1).max(100).nullish(),
//       cursor: z.string().nullish(),
//     }),
//   )
//   .query(async ({ input }) => {
//     /**
//      * For pagination docs you can have a look here
//      * @see https://trpc.io/docs/useInfiniteQuery
//      * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
//      */
//
//     const limit = input.limit ?? 50;
//     const { cursor } = input;
//
//     const items = await prisma.post.findMany({
//       select: defaultPostSelect,
//       // get an extra item at the end which we'll use as next cursor
//       take: limit + 1,
//       where: {},
//       cursor: cursor
//         ? {
//             id: cursor,
//           }
//         : undefined,
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//     let nextCursor: typeof cursor | undefined = undefined;
//     if (items.length > limit) {
//       // Remove the last item and use it as next cursor
//
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       const nextItem = items.pop()!;
//       nextCursor = nextItem.id;
//     }
//
//     return {
//       items: items.reverse(),
//       nextCursor,
//     };
//   }),
// byId: publicProcedure
//   .input(
//     z.object({
//       id: z.string(),
//     }),
//   )
//   .query(async ({ input }) => {
//     const { id } = input;
//     const post = await prisma.post.findUnique({
//       where: { id },
//       select: defaultPostSelect,
//     });
//     if (!post) {
//       throw new TRPCError({
//         code: 'NOT_FOUND',
//         message: `No post with id '${id}'`,
//       });
//     }
//     return post;
//   }),
// });

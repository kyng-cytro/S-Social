import { router } from "~/server/trpc/trpc";
import { userRouter } from "./users";
import { postRouter } from "./posts";

export const appRouter = router({
  users: userRouter,
  posts: postRouter,
});

export type AppRouter = typeof appRouter;

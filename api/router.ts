import { authRouter } from "./auth-router";
import { todoRouter } from "./todo-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;

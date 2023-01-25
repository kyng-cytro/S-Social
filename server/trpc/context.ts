import { inferAsyncReturnType } from "@trpc/server";

export const createContext = () => {
  return {};
};
export type Context = inferAsyncReturnType<typeof createContext>;

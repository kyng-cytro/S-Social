import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.user.findUnique({
        where: { id: req.input.id },
        select: { Post: true, username: true },
      });
    }),
  getByUserName: publicProcedure
    .input(z.object({ username: z.string().min(6).max(12) }))
    .query(async (req) => {
      return await prisma.user.findUnique({
        where: { username: req.input.username },
        select: { Post: true, id: true },
      });
    }),
  getAllUsers: publicProcedure.query(async (req) => {
    return await prisma.user.findMany({});
  }),
  createUser: publicProcedure
    .input(
      z.object({
        username: z.string().min(6).max(12),
        profile_image: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.user.create({
        data: {
          username: req.input.username,
          profile_image: req.input.profile_image,
        },
      });
    }),
});

import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.post.findUnique({
        where: { id: req.input.id },
        include: { Comment: true, author: true },
      });
    }),
  getByAuthor: publicProcedure
    .input(z.object({ author_id: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.post.findMany({
        where: { userId: req.input.author_id },
        include: { Comment: true, author: true },
      });
    }),
  getAllPosts: publicProcedure.query(async (req) => {
    return await prisma.post.findMany({
      include: { Comment: true, author: true },
      orderBy: { created_at: "desc" },
    });
  }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        userId: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.create({
        data: req.input,
        include: { Comment: true, author: true },
      });
    }),
});

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
        include: { comments: true, author: true },
      });
    }),
  getByAuthor: publicProcedure
    .input(z.object({ author_id: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.post.findMany({
        where: {
          author: { followers: { some: { followerId: req.input.author_id } } },
        },
        include: { comments: true, author: true },
        orderBy: { createdAt: "desc" },
      });
    }),
  getAllPosts: publicProcedure.query(async () => {
    return await prisma.post.findMany({
      where: { isPrivate: false },
      include: { comments: true, author: true },
      orderBy: { createdAt: "desc" },
    });
  }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        userId: z.string().min(1),
        isPrivate: z.boolean().default(false),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.create({
        data: req.input,
      });
    }),
});

import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";
import { PrismaClient, Post } from "@prisma/client";

const prisma = new PrismaClient();

// const postShape = z.object({
//   id: z.string().min(1),
//   title: z.string().min(1),
//   content: z.string().min(1),
//   isPrivate: z.boolean(),
//   userId: z.string().min(1),
// });

export const postRouter = router({
  getById: publicProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.post.findUnique({
        where: { id: req.input.postId },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          author: true,
        },
      });
    }),
  getByAuthor: publicProcedure
    .input(z.object({ authorId: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.post.findMany({
        where: {
          OR: [
            {
              author: { id: req.input.authorId },
            },
            {
              author: {
                followers: { some: { followerId: req.input.authorId } },
              },
            },
          ],
        },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
          author: true,
        },
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
  addComment: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        userId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.update({
        where: { id: req.input.postId },
        data: {
          comments: {
            create: {
              text: req.input.text,
              userId: req.input.userId,
            },
          },
        },
      });
    }),
  updatePost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
        isPrivate: z.boolean(),
        userId: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.update({
        where: { id: req.input.id },
        data: req.input,
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
  deletePost: publicProcedure
    .input(
      z.object({
        postId: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.delete({
        where: { id: req.input.postId },
      });
    }),
});

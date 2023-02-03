import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async (req) => {
      return await prisma.user.findUnique({
        where: { id: req.input.userId },
      });
    }),
  getByUserName: publicProcedure
    .input(z.object({ userName: z.string().min(6).max(12) }))
    .query(async (req) => {
      return await prisma.user.findUnique({
        where: { username: req.input.userName },
      });
    }),
  getAllUsers: publicProcedure.query(async (req) => {
    return await prisma.user.findMany({});
  }),
  createUser: publicProcedure
    .input(
      z.object({
        userName: z
          .string()
          .min(6, { message: "username should be at least 6 characters" })
          .max(12, { message: "username should be no more than 12 characters" })
          .trim(),
        profileImage: z
          .string()
          .min(1, { message: "Error grabbing profile image" }),
      })
    )
    .mutation(async (req) => {
      return await prisma.user.create({
        data: {
          username: req.input.userName,
          profileImage: req.input.profileImage,
        },
      });
    }),
  followUser: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        friendId: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.user.update({
        where: { id: req.input.userId },
        data: {
          following: {
            create: {
              followingId: req.input.friendId,
            },
          },
        },
      });
    }),
});

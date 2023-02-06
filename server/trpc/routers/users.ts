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
    .input(
      z.object({
        userName: z.string().min(1),
        full: z.boolean().default(false),
      })
    )
    .query(async (req) => {
      return await prisma.user.findUnique({
        where: { username: req.input.userName },
        include: {
          _count: { select: { followers: true, following: true } },
          followers: {
            include: {
              follower: true,
            },
          },
          following: {
            include: {
              following: true,
            },
          },
          posts: req.input.full
            ? {
                where: { isPrivate: false },
              }
            : false,
        },
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
          .trim()
          .regex(new RegExp("^[a-z0-9_]+$"), {
            message:
              "username should only contains alphanumeric characters and underscores",
          }),
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
  unFollowUser: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        friendId: z.string().min(1),
      })
    )
    .mutation(async (req) => {
      return await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: req.input.userId,
            followingId: req.input.friendId,
          },
        },
      });
    }),
  isFollowing: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        friend: z.string().min(1),
      })
    )
    .query(async (req) => {
      const user = await prisma.user.findUnique({
        where: { username: req.input.friend },
      });

      if (!user) return;

      return await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: req.input.userId,
            followingId: user.id,
          },
        },
      });
    }),
});

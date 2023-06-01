import { getCurrentUser } from "@/lib/session";
import { Context } from "../app/api/graphql/route";

export const resolvers = {
  Query: {
    note: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    notes: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.findMany();
    },
  },
  Mutation: {
    createNote: async (parent: any, args: any, context: Context) => {
      const user = await getCurrentUser();
      const userId = user?.id;
      return await context.prisma.note.create({
        data: {
          title: args.title,
          content: args.content,
          author: { connect: { id: userId } },
        },
      });
    },
    updateNote: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
    deleteNote: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
  Note: {
    author: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note
        .findUnique({ where: { id: parent.id } })
        .author();
    },
  },
};

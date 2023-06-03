import { getCurrentUser } from "@/lib/session";
import { Context } from "../app/api/graphql/route";

export const resolvers = {
  Query: {
    note: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.findUnique({
        where: {
          id: args.id,
        },
        include: {
          Tag: true,
        },
      });
    },
    notes: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note.findMany({
        include: {
          Tag: true,
        },
      });
    },
    tags: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.findMany();
    },
  },
  Mutation: {
    createTag: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.create({
        data: {
          name: args.name,
        },
      });
    },
    addTagsToNote: async (parent: any, args: any, context: Context) => {
      const { noteId, tagIds } = args;
      return await context.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          Tag: {
            connect: tagIds.map((tagId: string) => ({ id: tagId })),
          },
        },
        include: {
          Tag: true, // Updated include field name to "tags"
        },
      });
    },
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
          updatedAt: new Date(),
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
    tags: async (parent: any, args: any, context: Context) => {
      return await context.prisma.note
        .findUnique({ where: { id: parent.id } })
        .Tag();
    },
  },
};

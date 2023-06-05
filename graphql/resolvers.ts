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
          tags: true,
        },
      });
    },
    notes: async (parent: any, args: any, context: Context) => {
      const user = await getCurrentUser();
      const userId = user?.id;
      return await context.prisma.note.findMany({
        where: {
          authorId: userId,
        },
        include: {
          tags: true,
        },
      });
    },
    notesByTag: async (parent: any, args: any, context: Context) => {
      const user = await getCurrentUser();
      const userId = user?.id;
      return await context.prisma.note.findMany({
        where: {
          authorId: userId,
          tags: {
            some: {
              id: args.tagId,
            },
          },
        },
        include: {
          tags: true,
        },
      });
    },
    tags: async (parent: any, args: any, context: Context) => {
      const user = await getCurrentUser();
      const userId = user?.id;
      return await context.prisma.tag.findMany({
        where: {
          id: userId,
        },
        include: {
          author: true,
        },
      });
    },
  },
  Mutation: {
    createNoteWithTags: async (parent: any, args: any, context: Context) => {
      const user = await getCurrentUser();
      const userId = user?.id;
      const tags = args.tags;
      const note = await context.prisma.note.create({
        data: {
          title: args.title,
          content: args.content,
          author: { connect: { id: userId } },
          tags: {
            connectOrCreate: tags.map((tagName: String) => ({
              where: { name: tagName },
              create: {
                name: tagName,
                author: { connect: { id: userId } },
              },
            })),
          },
        },
        include: {
          tags: true,
        },
      });
      return note;
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
      const user = await getCurrentUser();
      const userId = user?.id;
      const tags = args.tags;
      return await context.prisma.note.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          content: args.content,
          updatedAt: new Date(),
          tags: {
            connectOrCreate: tags.map((tagName: String) => ({
              where: { name: tagName },
              create: {
                name: tagName,
                author: { connect: { id: userId } },
              },
            })),
          },
        },
        include: {
          tags: true,
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
        .tags();
    },
  },
  Tag: {
    author: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag
        .findUnique({ where: { id: parent.id } })
        .author();
    },
  },
};

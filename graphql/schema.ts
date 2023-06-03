export const typeDefs = `#graphql
    type Note {
        id: ID!
        title: String
        content: String
        createdAt: String
        updatedAt: String
        author: User
        tags: [Tag]
    }

    type Tag {
        id: ID!
        name: String
    }

    type User{
        id: ID!
        name: String
        email: String
    }

    type Query {
        note(id: ID!): Note
        notes: [Note]  
        tags: [Tag]
        notesByTag(tagId: ID!): [Note] 
    }

    type Mutation {
        createNote(title: String, content: String): Note!
        updateNote(id: ID!, title: String, content: String): Note
        deleteNote(id: ID!): Note
        createTag(name: String): Tag!
        addTagsToNote (noteId: ID!, tagIds: [ID!]!): Note
    }
`;

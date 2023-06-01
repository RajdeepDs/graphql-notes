import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation Mutation($title: String, $content: String) {
    createNote(title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_NOTE = gql`
  mutation Mutation($id: ID!) {
    deleteNote(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_NOTE = gql`
  mutation Mutation($id: ID!, $title: String, $content: String) {
    updateNote(id: $id, title: $title, content: $content) {
      id
      updatedAt
      createdAt
      content
      title
    }
  }
`;

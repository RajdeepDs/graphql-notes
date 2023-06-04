import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query Notes {
    notes {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTE = gql`
  query Note($id: ID!) {
    note(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
// export const GET_USER = gql`
//   query User($id: ID!) {
//     getUser(id: $id) {
//       id
//       username
//       email
//       avatar
//       notes {
//         id
//         title
//         content
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;

import { DELETE_NOTE } from "@/graphql/mutations";
import { GET_NOTES } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { INote } from "@/types";
import React from "react";
import Link from "next/link";

type Props = {
  note: INote;
};
export const Note = ({ note }: Props) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id: note.id },
    refetchQueries: [{ query: GET_NOTES }],
  });
  return (
    <article className="bg-gray-100 p-5 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{note.title}</h1>
      <p className="text-gray-500">{note.content}</p>
      <Link
        href={`http://localhost:3000/note/${note.id}`}
        className="text-blue-500 hover:underline"
      >
        Read More
      </Link>
      <button
        onClick={() => deleteNote({ variables: { id: note.id } })}
        className="bg-red-200 text-red-700 p-2 mt-2 rounded-lg"
      >
        Delete
      </button>
    </article>
  );
};

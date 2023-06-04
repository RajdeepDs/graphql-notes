"use client";

import { UPDATE_NOTE } from "@/graphql/mutations";
import { GET_NOTE } from "@/graphql/queries";
import { INote } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Note({ params: { id } }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: { id, title, description },
    refetchQueries: [{ query: GET_NOTE, variables: { id } }],
  });

  const note: INote = data?.note;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops! Something went wrong...</p>;
  const handleUpdateNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" && description === "")
      return alert("Please fill all the fields");
    updateNote({
      variables: { id: id, title: title, description: description },
    });
    setTitle("");
    setDescription("");
  };
  return (
    <>
      <div className="mt-5">
        <h1 className="text-xl font-bold">{note.title}</h1>
        <p className="text-gray-500">{note.content}</p>
      </div>
      <form className="flex gap-2" onSubmit={handleUpdateNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter New Title"
          className="bg-transparent border p-2 rounded-lg"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter New Title"
          className="bg-transparent border p-2 rounded-lg"
        />
        <button>Update</button>
      </form>
    </>
  );
}

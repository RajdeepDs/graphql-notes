"use client";
import { GET_NOTES } from "@/graphql/queries";
import { CREATE_NOTE } from "@/graphql/mutations";
import { INote } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent } from "react";
import { Note } from "@/components/Note";
export const Notes = () => {
  const { loading, error, data } = useQuery(GET_NOTES);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [createNote] = useMutation(CREATE_NOTE, {
    variables: { title, description },
    refetchQueries: [{ query: GET_NOTES }],
  });
  const notes: INote[] = data?.notes;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops! Something went wrong...</p>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || description === "")
      return alert("Please fill all the fields");
    createNote({ variables: { title, description } });

    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="mt-5">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="bg-transparent border p-2 rounded-lg"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="bg-transparent border p-2 rounded-lg"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            Add Note
          </button>
        </form>
        <div className="grid grid-cols-4 gap-2">
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
};

import { Note } from "@prisma/client";
interface INote extends Note {
  notes: Note[];
}

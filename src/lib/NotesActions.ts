/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from "uuid";
import { getToday } from "react-persian-calendar-date-picker";
import {Date,Note} from '../types/types'

type AddNoteProps = {
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
  addNoteInputRef: React.RefObject<HTMLInputElement>;
  date: Date;
};

type RemoveNoteProps = {
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
  id: string;
};

type EditNoteProps = {
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
  id: string;
  newContent: string;
  newDeadline: Date;
};

const today = getToday();

export function addNote({
  notesInfo,
  setNotesInfo,
  addNoteInputRef,
  date,
}: AddNoteProps) {
  const { day, month, year } = date || { day: 0, month: 0, year: 0 };
  setNotesInfo([
    ...notesInfo,
    {
      content: addNoteInputRef.current?.value || "",
      dateOfRegistration: {
        year: today.year,
        month: today.month,
        day: today.day,
      },
      deadline: {
        year: date ? year : 0,
        month: date ? month : 0,
        day: date ? day : 0,
      },
      id: uuid(),
    },
  ]);
}

export function removeNote({ notesInfo, setNotesInfo, id }: RemoveNoteProps) {
  const newNotesInfo = notesInfo.filter((note) => note.id !== id);
  setNotesInfo(newNotesInfo);
}

export function editNote({
  notesInfo,
  setNotesInfo,
  id,
  newContent,
  newDeadline,
}: EditNoteProps) {
  setNotesInfo(
    notesInfo.map((note: Note) =>
      note.id === id
        ? { ...note, content: newContent, deadline: newDeadline }
        : note
    )
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Reorder } from "framer-motion";
import { NoteBox } from "../";
import { Note } from "../../types/types";

type Props = {
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
};

function NoteSBoxesList({ notesInfo, setNotesInfo }: Props) {
  return (
    <>
      <div aria-label="note-boxes-part" className="mt-10">
        <Reorder.Group values={notesInfo} onReorder={setNotesInfo}>
          <ul>
            {[...notesInfo].map((note, index) => (
              <Reorder.Item value={note} key={note.id}>
                <NoteBox
                  note={note}
                  notesInfo={notesInfo}
                  setNotesInfo={setNotesInfo}
                />
              </Reorder.Item>
            ))}
          </ul>
        </Reorder.Group>
      </div>
    </>
  );
}

export default NoteSBoxesList;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Reorder } from "framer-motion";
import { Note } from "../../types/types";
import { NoteBox } from "../";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../Redux/Reducers/notesReducer";
import { RootState, AppDispatch } from "../../Redux/Store/Store";

function NoteSBoxesList() {
  const dispatch = useDispatch<AppDispatch>();
  const notesInfo = useSelector((state: RootState) => state.notes.value);
  const handleReorder = (newOrder: Note[]) => {
    dispatch(updateNote(newOrder));
  };

  return (
    <>
      <div aria-label="note-boxes-part">
        <Reorder.Group values={notesInfo} onReorder={handleReorder}>
          <ul>
            {[...notesInfo].map((note, index) => (
              <Reorder.Item value={note} key={note.id}>
                <NoteBox note={note} />
              </Reorder.Item>
            ))}
          </ul>
        </Reorder.Group>
      </div>
    </>
  );
}

export default NoteSBoxesList;

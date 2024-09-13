/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";
import { toPersianNumber } from "../../lib/TopersianNumber";
import DatePicker from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { removeNote, editNote } from "../../lib/NotesActions";
import { getToday } from "react-persian-calendar-date-picker";
import {Note} from '../../types/types'

type Props = {
  note: Note;
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
};

function App({ note, notesInfo, setNotesInfo }: Props) {
  const { content, deadline, dateOfRegistration, id } = note;
  const [contentState, setContentState] = React.useState(content);
  const [deadlineState, setDeadlineState] = React.useState(deadline);
  const [editingMode, setEditingMode] = React.useState(false);
  const [date, setDate] = React.useState(deadline);
  const { day, month, year } = date || { day: 0, month: 0, year: 0 };
  const editNoteInputRef = React.useRef<HTMLInputElement>(null);
  const noteBoxRef = React.useRef<HTMLDivElement>(null);

  const today = getToday();

  function specifyExpiredNotes() {
    if (deadlineState.year < today.year) {
      noteBoxRef.current?.classList.add("bg-red-500");
    } else if (deadlineState.year === today.year) {
      if (deadlineState.month < today.month) {
        noteBoxRef.current?.classList.add("bg-red-500");
      } else if (deadlineState.month === today.month) {
        if (deadlineState.day < today.day) {
          noteBoxRef.current?.classList.add("bg-red-500");
        }
      }
    }
  }
  
  React.useEffect(() => {
    specifyExpiredNotes();
  }, [deadlineState]);

  function handleClickEdit() {
    setEditingMode(true);
  }
  function handleClickRemove() {
    removeNote({ notesInfo, setNotesInfo, id });
  }

  function handleSubmitEditNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditingMode(false);
    const newContent = editNoteInputRef.current?.value || "";
    const newDeadline = {
      year: date ? year : 0,
      month: date ? month : 0,
      day: date ? day : 0,
    };
    editNote({ notesInfo, setNotesInfo, id, newContent, newDeadline });
    setContentState(newContent);
    setDeadlineState(newDeadline);

    localStorage.setItem("notesInfo", JSON.stringify(notesInfo));
  }

  return (
    <>
      <div
        className="w-96 min-h-28 mx-auto border-2 text-center p-3 rounded-md text-sm 
      hover:shadow-md bg-lime-400 cursor-pointer"
        ref={noteBoxRef}
      >
        {editingMode ? (
          <form onSubmit={handleSubmitEditNote}>
            <input
              type="text"
              ref={editNoteInputRef}
              defaultValue={contentState}
              className="w-[300px] border-2 rounded shadow-md
                placeholder:text-xs focus:outline-none"
            />
            <DatePicker selectedDay={date} onChange={setDate} />
            <button type="submit">تایید</button>
          </form>
        ) : (
          <div className="mb-2">{contentState}</div>
        )}
        <div className="fontIransnasLight text-xs mb-1">
          تاریخ ثبت یادداشت :{" "}
          {`${toPersianNumber(dateOfRegistration.day || 0)} /
          ${toPersianNumber(dateOfRegistration.month || 0)} / 
          ${toPersianNumber(dateOfRegistration.year || 0)}`}
        </div>
        <div className="fontIransnasLight text-xs">
          ددلاین یادداشت :{" "}
          {`${toPersianNumber(deadlineState.day || 0)} /
          ${toPersianNumber(deadlineState.month || 0)} /
          ${toPersianNumber(deadlineState.year || 0)}`}
        </div>
        <button className="bg-slate-300" onClick={handleClickEdit}>
          ویرایش
        </button>
        <button className="bg-slate-500" onClick={handleClickRemove}>
          حذف
        </button>
      </div>
    </>
  );
}

export default App;

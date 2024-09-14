/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import { toPersianNumber } from "../../lib/TopersianNumber";
import DatePicker from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { removeNote, editNote } from "../../lib/NotesActions";
import { specifyExpiredNotes } from "../../lib/specifyExpiredNotes";
import { Note } from "../../types/types";

type Props = {
  note: Note;
  notesInfo: Note[];
  setNotesInfo: React.Dispatch<React.SetStateAction<Note[]>>;
};

function NoteBox({ note, notesInfo, setNotesInfo }: Props) {
  const { content, deadline, dateOfRegistration, id } = note;
  const [contentState, setContentState] = React.useState(content);
  const [deadlineState, setDeadlineState] = React.useState(deadline);
  const [editingMode, setEditingMode] = React.useState(false);
  const [date, setDate] = React.useState(deadline);
  const { day, month, year } = date || { day: 0, month: 0, year: 0 };
  const editNoteInputRef = React.useRef<HTMLInputElement>(null);
  const noteBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    specifyExpiredNotes({ deadlineState, noteBoxRef });
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
        aria-label="note-box-container"
        className="w-96 min-h-28 mx-auto border-2 text-center p-3 rounded-md text-sm 
       bg-lime-400 cursor-pointer"
        ref={noteBoxRef}
      >
        {editingMode ? (
          <div aria-label="form-container" className="bg-slate-200 py-1 mb-4">
            <form onSubmit={handleSubmitEditNote}>
              <input
                type="text"
                ref={editNoteInputRef}
                defaultValue={contentState}
                className="w-[300px] border-2 py-1 px-2 rounded shadow-md mb-1
              placeholder:text-xs focus:outline-none bg-slate-100"
              />
              <div
                aria-label="deadline-part"
                className="flex justify-evenly items-center"
              >
                <span className="fontIransnasLight text-xs">
                  ددلاین یادداشت :
                </span>
                <DatePicker selectedDay={date} onChange={setDate} />
                <button
                  type="submit"
                  className="fontIransnasLight text-xs bg-cyan-600 p-2 rounded text-[white]"
                >
                  تایید
                </button>
              </div>
            </form>
          </div>
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
        <div
          aria-label="buttons-edit-and-remove-container"
          className="flex justify-between"
        >
          <button
            className="fontIransnasLight text-xs rounded text-purple-700 hover:text-purple-500"
            onClick={handleClickEdit}
          >
            ویرایش
          </button>
          <button
            className="fontIransnasLight text-xs rounded text-purple-700 hover:text-purple-500"
            onClick={handleClickRemove}
          >
            حذف
          </button>
        </div>
      </div>
    </>
  );
}

export default NoteBox;

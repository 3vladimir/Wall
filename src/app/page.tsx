/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";
import { Header, NoteBoxesList } from "../components";
import { notesInitialValues } from "../lib/NotesInintialValues";
import {addNote} from '../lib/NotesActions'
import DatePicker from "react-persian-calendar-date-picker";
import { getToday } from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";

function Main() {
  const today = getToday();
  const [date, setDate] = React.useState(today);

  const [notesInfo, setNotesInfo] = React.useState(notesInitialValues);
  const addNoteInputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmitAddNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addNote({notesInfo, setNotesInfo, addNoteInputRef, date})
    addNoteInputRef.current ? (addNoteInputRef.current.value = "") : null;
  }

  React.useEffect(() => {
    localStorage.setItem("notesInfo", JSON.stringify(notesInfo));
  }, [notesInfo]);

  return (
    <>
      <main>
        <div className="w-4/5 mx-auto mt-5 text-sm">
          <div aria-label="add-note-part" className="text-center">
            <form onSubmit={handleSubmitAddNote}>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="افزودن یادداشت..."
                  ref={addNoteInputRef}
                  required
                  className="w-[500px] border-2 pb-28 rounded shadow-md
                placeholder:text-xs focus:outline-none focus:pb-28"
                />
                <div
                  className="absolute right-[370px] bottom-1 text-xs flex items-center
                invisible group-focus-within:visible"
                >
                  تاریخ ددلاین :
                  <DatePicker selectedDay={date} onChange={setDate} />
                </div>
                <button
                  type="submit"
                  className="absolute left-[370px] bottom-1 invisible group-focus-within:visible"
                >
                  افزودن یادداشت
                </button>
              </div>
            </form>
          </div>
          <NoteBoxesList notesInfo={notesInfo} setNotesInfo={setNotesInfo} />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;

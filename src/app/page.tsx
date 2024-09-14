/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";
import { Header, NoteBoxesList } from "../components";
import { notesInitialValues } from "../lib/NotesInintialValues";
import { addNote } from "../lib/NotesActions";
import DatePicker from "react-persian-calendar-date-picker";
import { getToday } from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";

function Main() {
  const today = getToday();

  const [date, setDate] = React.useState(today);
  const [notesInfo, setNotesInfo] = React.useState(notesInitialValues);
  const addNoteInputRef = React.useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  isInputFocused
    ? addNoteInputRef.current?.classList.add("pb-28")
    : addNoteInputRef.current?.classList.remove("pb-28");

  function handleSubmitAddNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addNote({ notesInfo, setNotesInfo, addNoteInputRef, date });
    addNoteInputRef.current ? (addNoteInputRef.current.value = "") : null;
  }

  React.useEffect(() => {
    localStorage.setItem("notesInfo", JSON.stringify(notesInfo));
  }, [notesInfo]);

  return (
    <>
      <main>
        <div
          aria-label="whole-container"
          className="w-4/5 mx-auto mt-5 text-sm flex justify-evenly"
        >
          <div aria-label="add-note-part">
            <form onSubmit={handleSubmitAddNote}>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="نوشتن یادداشت..."
                  ref={addNoteInputRef}
                  required
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-[500px] border-2 rounded shadow-md p-2 
                 transition-all duration-500 placeholder:text-xs focus:outline-none"
                />
                <div
                  aria-label="choose-deadline-part"
                  className="absolute right-[5px]  bottom-0 text-xs flex items-center
                invisible group-focus-within:visible"
                >
                  <span className="ml-1 fontIransnasLight">تاریخ ددلاین :</span>

                  <div
                    aria-label="claender"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  >
                    <DatePicker selectedDay={date} onChange={setDate} />
                  </div>
                </div>
                <button
                  type="submit"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="absolute left-0 bottom-0 bg-cyan-600 p-4 rounded
                  text-xs text-[white] fontIransnasLight invisible group-focus-within:visible"
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

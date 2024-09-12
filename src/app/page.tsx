/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Header, NoteBox } from "../components";
import { notesInitialValues } from "../lib/NotesInintialValues";
import { Reorder } from "framer-motion";
import DatePicker from "react-persian-calendar-date-picker";
import { getToday } from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";

// day === today.day && month === today.month && year === today.year

function Main() {
  const [date, setDate] = React.useState(null);
  const { day, month, year } = date || { day: 0, month: 0, year: 0 };

  const [notesInfo, setNotesInfo] = React.useState(notesInitialValues);
  const addNoteInputRef = React.useRef<HTMLInputElement>(null);
  const today = getToday();

  function removeNote(id: string) {
    const newNotesInfo = notesInfo.filter((note) => note.id !== id);
    setNotesInfo(newNotesInfo);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            <form onSubmit={handleSubmit}>
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
          <div aria-label="note-boxes-part" className="mt-10">
            <Reorder.Group values={notesInfo} onReorder={setNotesInfo}>
              <ul>
                {[...notesInfo].map((item, index) => (
                  <Reorder.Item value={item} key={item.id}>
                    <NoteBox
                      content={item.content}
                      dateOfRegistration={item.dateOfRegistration}
                      deadline={item.deadline}
                      id={item.id}
                      removeNote={removeNote}
                    />
                  </Reorder.Item>
                ))}
              </ul>
            </Reorder.Group>
          </div>
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

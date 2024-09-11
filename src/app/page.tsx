/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Header, NoteBox } from "../components";
import { notesInitialValues } from "../lib/NotesInintialValues.js";
import { Reorder } from "framer-motion";

function Main() {
  const [notesInfo, setNotesInfo] = React.useState(notesInitialValues);
  const addNoteInputRef = React.useRef<HTMLInputElement>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotesInfo([
      ...notesInfo,
      {
        content: addNoteInputRef.current?.value || "",
        dateOfRegistration: 0,
        deadline: 0,
        id:uuid()
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
        <div className="w-4/5 mx-auto mt-10">
          <div aria-label="add-note-part" className="text-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="افزودن یادداشت..."
                ref={addNoteInputRef}
                className="w-[500px] border-2 p-2 rounded focus:outline-none shadow-md
              placeholder:text-xs"
              />
              <button type="submit">افزودن یادداشت</button>
            </form>
          </div>
          <div aria-label="note-boxes-part" className="mt-10">
            <Reorder.Group values={notesInfo} onReorder={setNotesInfo}>
            <ul
            // className="flex"
            >
                {[...notesInfo].map((item, index) => (
                  <Reorder.Item value={item} key={item.id}
                  >
                    <NoteBox
                      content={item.content}
                      dateOfRegistration={item.dateOfRegistration}
                      deadline={item.deadline}
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

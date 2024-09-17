/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notesInitialValues } from "../../lib/NotesInintialValues";
import { Note, Date } from "../../types/types";
import { getToday } from "react-persian-calendar-date-picker";
const today = getToday();

type CounterState = {
  value: Note[];
};

const initialState: CounterState = {
  value: notesInitialValues,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{
        newContent: string;
        date: Date;
      }>
    ) => {
      const { day, month, year } = action.payload.date || {
        day: 0,
        month: 0,
        year: 0,
      };

      state.value.push({
        content: action.payload.newContent,
        dateOfRegistration: {
          year: today.year,
          month: today.month,
          day: today.day,
        },
        deadline: {
          year: action.payload.date ? year : 0,
          month: action.payload.date ? month : 0,
          day: action.payload.date ? day : 0,
        },
        id: uuid(),
      });
    },

    removeNote: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      state.value = state.value.filter((note) => note.id !== action.payload.id);
    },
    editNote: (
      state,
      action: PayloadAction<{
        newContent: string;
        newDeadline: Date;
        id: string;
      }>
    ) => {
      state.value.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              content: action.payload.newContent,
              deadline: action.payload.newDeadline,
            }
          : note
      );
    },
    updateNote: (state, action: PayloadAction<Note[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addNote, removeNote, editNote, updateNote } = counterSlice.actions;

export default counterSlice.reducer;

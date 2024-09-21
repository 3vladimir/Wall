import { configureStore } from "@reduxjs/toolkit";
import notesRducer from "../Reducers/notesReducer";

export const store = configureStore({
  reducer: {
    notes: notesRducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

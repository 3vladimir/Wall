import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Reducers/notesReducer';

export const store = configureStore({
  reducer: {
    notes: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
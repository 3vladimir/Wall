/* eslint-disable @typescript-eslint/no-unused-vars */
import { getToday } from "react-persian-calendar-date-picker";
const today = getToday();
import { Date } from "../types/types";

type Props = {
  deadlineState: Date;
  noteBoxRef: React.RefObject<HTMLDivElement>;
};

export function specifyExpiredNotes({ deadlineState, noteBoxRef }: Props) {
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

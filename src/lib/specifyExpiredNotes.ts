/* eslint-disable @typescript-eslint/no-unused-vars */
import { getToday } from "react-persian-calendar-date-picker";
const today = getToday();
import { Date } from "../types/types";

type Props = {
  deadlineState: Date;
  noteBoxRef: React.RefObject<HTMLDivElement>;
};
export function specifyExpiredNotes({ deadlineState, noteBoxRef }: Props) {
  const isExpired =
    deadlineState.year < today.year ||
    (deadlineState.year === today.year &&
      (deadlineState.month < today.month ||
        (deadlineState.month === today.month &&
          deadlineState.day < today.day)));

  if (isExpired) {
    noteBoxRef.current?.classList.add("bg-red-500");
  } else {
    noteBoxRef.current?.classList.remove("bg-red-500");
  }
}

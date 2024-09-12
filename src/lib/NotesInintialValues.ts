/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuid } from "uuid";

const storedNotes = localStorage.getItem("notesInfo");
export const notesInitialValues = storedNotes
  ? JSON.parse(storedNotes)
  : [
      {
        content: "خرید نان",
        dateOfRegistration: { year: 1403, month: 6, day: 21 },
        deadline: { year: 1403, month: 6, day: 23 },
        id: uuid(),
      },
      {
        content: "آب دادن به گل ها",
        dateOfRegistration: { year: 1403, month: 6, day: 21 },
        deadline: { year: 1403, month: 6, day: 25 },
        id: uuid(),
      },
    ];

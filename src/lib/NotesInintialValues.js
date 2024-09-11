/* eslint-disable @typescript-eslint/no-unused-vars */

import { v4 as uuid } from "uuid";

export const notesInitialValues = JSON.parse(
  localStorage.getItem("notesInfo")
) || [
  { content: "خرید نان", dateOfRegistration: 0, deadline: 0, id: uuid() },
  { content: "اتمام پروژه", dateOfRegistration: 0, deadline: 0, id: uuid() },
  {
    content: "آب دادن به گل ها",
    dateOfRegistration: 0,
    deadline: 0,
    id: uuid(),
  },
];

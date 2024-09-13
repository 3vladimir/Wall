export type Date = {
  year: number;
  month: number;
  day: number;
};

export type Note = {
  content: string;
  dateOfRegistration: Date;
  deadline: Date;
  id: string;
};

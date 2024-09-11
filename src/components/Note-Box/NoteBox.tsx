/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import * as React from "react";

type Props = {
  content: string;
  dateOfRegistration: number;
  deadline: number;
};

function App({ content, dateOfRegistration, deadline }: Props) {
  return (
    <>
      <div
        className="w-40 min-h-40 border-2 text-center p-3 rounded-md text-sm 
      hover:shadow-md bg-lime-400"
      >
        {content}
        <div className="fontIransnasLight text-xs">
          تاریخ ثبت یادداشت : {dateOfRegistration}
        </div>
        <div className="fontIransnasLight text-xs">
          ددلاین یادداشت : {deadline}
        </div>
      </div>
    </>
  );
}

export default App;

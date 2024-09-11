/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { FaUser } from "react-icons/fa";

function App() {
  return (
    <>
      <header>
        <div aria-label="whole-container" className="bg-green-600 py-5">
          <div className="w-11/12 mx-auto">
            <FaUser className="text-xl" />
          </div>
        </div>
      </header>
    </>
  );
}

export default App;

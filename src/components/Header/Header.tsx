/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { FaUser } from "react-icons/fa";

function Header() {
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

export default Header;

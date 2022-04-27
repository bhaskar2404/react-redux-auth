import React from "react";
import "./Loder.css";
export const Loder = () => {
  return (
    <div>
      <div className="absolute w-1 text-center top-50 left-50 broder broder-gray-400">
        <div className="overlay">
          <div class="lds-ripple">
            <div></div>
            <div></div>
            <div>Loading..</div>
          </div>
        </div>
      </div>
    </div>
  );
};

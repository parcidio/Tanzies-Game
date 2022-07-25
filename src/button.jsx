import React from "react";
export default function Button(props) {
  // let status = props.status ? "complete-status" : "continuorus-status";
  return (
    <button
      className={`number-button ${
        props.isHeld ? "complete-status" : "continuorus-status"
      }`}
      onClick={() => props.holdFunction(props.id)}
    >
      {props.number}
    </button>
  );
}

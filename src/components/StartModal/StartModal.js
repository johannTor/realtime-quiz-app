import React from "react";
import "./startModal.css";

export default function StartModal({ startQuiz, setStartModal }) {
  const handleStart = () => {
    setStartModal(false);
    startQuiz();
  };

  return (
    <div className="modalContainer">
      <div className="startModal">
        <h2>Has everyone joined?</h2>
        <h4>Participants can't join while quiz is in progress</h4>
        <div className="startButtons">
          <button type="button" onClick={() => handleStart()}>
            Start
          </button>
          <button type="button" onClick={() => setStartModal(false)}>
            Wait
          </button>
        </div>
      </div>
    </div>
  );
}

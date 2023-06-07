import React from "react";
import { useNavigate } from "react-router-dom";

const Congratulation = () => {
  const navigate = useNavigate();

  const storeQuestions =
    JSON.parse(localStorage.getItem("dataQuestions")) || [];

  const storeTime = Number(localStorage.getItem("totalTime"));

  const secondsToHms = (duration) => {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
      ret += `${hrs} hours `;
    }

    if (mins > 0) {
      ret += secs < 10 ? "0" : "";
      ret += `${mins} minutes `;
    }

    if (secs > 0) {
      ret += secs < 10 ? "0" : "";
      ret += `${secs} seconds`;
    }

    return ret;
  };

  return (
    <div>
      Congratulation
      <h1>
        Total: {storeQuestions.filter((item) => item.correctAnswer).length}/
        {storeQuestions.length} correct answer in {secondsToHms(storeTime)}
      </h1>
      <button onClick={() => navigate("/replayQuestion")}>Xem lai</button>
      <button
        onClick={() => {
          navigate("/");
          localStorage.clear();
        }}>
        Play again
      </button>
    </div>
  );
};

export default Congratulation;

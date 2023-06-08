import React from "react";
import { useNavigate } from "react-router-dom";
import completed from '../.././images/completed.webp'
import './congratulation.scss'

const Completed = () => {
  const navigate = useNavigate();

  const storeQuestions =
    JSON.parse(localStorage.getItem("dataQuestions")) || [];
    const listQuestions =
    JSON.parse(localStorage.getItem("listQuestions")) || [];

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
    <div className="container">
      <div className="notification-box">
        <img src={completed}/>
        <h1>Completed</h1>
        <h2>
          Total: {storeQuestions.filter((item) => item.correctAnswer).length}/
          {listQuestions.length} correct answer in {secondsToHms(storeTime)}
        </h2>
        <button onClick={() => navigate("/replayQuestion")}>Review</button>
        <button
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Completed;

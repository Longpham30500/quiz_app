import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./replayquestion.scss";

const ReplayQuestion = () => {
  const navigate = useNavigate();

  const listQuestions = JSON.parse(localStorage.getItem("listQuestions")) || [];
  const storeQuestions =
    JSON.parse(localStorage.getItem("dataQuestions")) || [];

  const [numQuestion, setNumQuestion] = useState(0);

  const handleClickNext = () => {
    if (numQuestion === 9) {
      navigate("/congratulation");
    } else {
      setNumQuestion((prev) => ++prev);
    }
  };

  return (
    <div className="body">
      {listQuestions?.length > 0 &&
        [listQuestions.at(numQuestion)].map((item, i) => {
          return (
            <div key={i} className="replay-content">
              <h1>{item.question}</h1>
              <div className='replay-answer'>
                <h2
                  style={{
                    color:
                      listQuestions.at(numQuestion).correct_answer ===
                        storeQuestions.at(numQuestion).questionChoose &&
                      "green",
                  }}>
                  {item.correct_answer}
                </h2>

                {item.incorrect_answers.map((data, index) => (
                  <h2
                    key={index}
                    style={{
                      color:
                        storeQuestions.at(numQuestion).incorrectAnswer ===
                          index && "red",
                    }}>
                    {data}
                  </h2>
                ))}
              </div>
            </div>
          );
        })}
      <div className='move-button'>
        <button className="button back-button"
          onClick={() => {
            if (numQuestion > 0) setNumQuestion((prev) => --prev);
          }}>
          back
        </button>
        <button onClick={handleClickNext} className='button next-button'>next</button>
      </div>
    </div>
  );
};

export default ReplayQuestion;

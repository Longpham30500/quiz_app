import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      {listQuestions?.length > 0 &&
        [listQuestions.at(numQuestion)].map((item, i) => {
          return (
            <div key={i}>
              <h1>{item.question}</h1>
              <h1
                style={{
                  color:
                    listQuestions.at(numQuestion).correct_answer ===
                      storeQuestions.at(numQuestion).questionChoose && "green",
                }}>
                {item.correct_answer}
              </h1>

              {item.incorrect_answers.map((data, index) => (
                <h1
                  key={index}
                  style={{
                    color:
                      storeQuestions.at(numQuestion).incorrectAnswer ===
                        index && "red",
                  }}>
                  {data}
                </h1>
              ))}
            </div>
          );
        })}
      <button
        onClick={() => {
          if (numQuestion > 0) setNumQuestion((prev) => --prev);
        }}>
        back
      </button>
      <button onClick={handleClickNext}>next</button>
    </div>
  );
};

export default ReplayQuestion;

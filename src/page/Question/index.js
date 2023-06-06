import axios from "axios";
import React, { useEffect, useState } from "react";

const Question = () => {
  const storeQuestions =
    JSON.parse(localStorage.getItem("dataQuestions")) || [];

  const [dataQuestions, setDataQuestions] = useState([]);
  const [numQuestion, setNumQuestion] = useState(0);
  const [color, setColor] = useState({});

  const getQuestion = async () => {
    try {
      const { data } = await axios.get("https://opentdb.com/api.php?amount=10");

      setDataQuestions(data.results);
    } catch (error) {}
  };

  const handleClickColor = ({ correctAnswer, index }) => {
    if (!Object.values(color).length) {
      setColor(
        correctAnswer
          ? { correctAnswer }
          : { correctAnswer, incorrectAnswer: index }
      );

      localStorage.setItem(
        "dataQuestions",
        JSON.stringify([
          ...storeQuestions,
          { correctAnswer, incorrectAnswer: index },
        ])
      );
    }
  };

  const handleClickNext = () => {
    setNumQuestion((prev) => ++prev);
    setColor({});
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      {dataQuestions?.length > 0 &&
        [dataQuestions.at(numQuestion)].map((item, i) => {
          return (
            <div key={i}>
              <h1>{item.question}</h1>
              <h1
                style={{ color: color.correctAnswer && "green" }}
                onClick={() => handleClickColor({ correctAnswer: true })}>
                {item.correct_answer}
              </h1>

              {item.incorrect_answers.map((data, index) => (
                <h1
                  key={index}
                  style={{ color: color.incorrectAnswer === index && "red" }}
                  onClick={() =>
                    handleClickColor({ correctAnswer: false, index })
                  }>
                  {data}
                </h1>
              ))}
            </div>
          );
        })}
      Question
      <button onClick={handleClickNext}>click</button>
    </div>
  );
};

export default Question;

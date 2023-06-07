import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const navigate = useNavigate();
  const storeQuestions =
    JSON.parse(localStorage.getItem("dataQuestions")) || [];

  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numQuestion, setNumQuestion] = useState(0);
  const [color, setColor] = useState({});

  const getQuestion = async () => {
    try {
      const { data } = await axios.get("https://opentdb.com/api.php?amount=10");
      setDataQuestions(data.results);
      setIsLoading(true);
    } catch (error) {}
  };

  const handleClickColor = ({ data, correctAnswer, index }) => {
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
          {
            correctAnswer,
            incorrectAnswer: index,
            questionChoose: data.correct_answer,
          },
        ])
      );
    }
  };

  const handleClickNext = () => {
    if (Object.values(color).length) {
      if (numQuestion === 9) {
        localStorage.setItem("totalTime", timeSpentOnPage);
        localStorage.setItem("listQuestions", JSON.stringify(dataQuestions));
        navigate("/congratulation");
      } else {
        setNumQuestion((prev) => ++prev);
      }
      setColor({});
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLoading) {
        setTimeSpentOnPage((prevTime) => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isLoading]);

  return !isLoading ? (
    <h1>isLoading...</h1>
  ) : (
    <div>
      {dataQuestions?.length > 0 &&
        [dataQuestions.at(numQuestion)].map((item, i) => {
          return (
            <div key={i}>
              <h1>{item.question}</h1>
              <h1
                style={{ color: color.correctAnswer && "green" }}
                onClick={() =>
                  handleClickColor({ data: item, correctAnswer: true })
                }>
                {item.correct_answer}
              </h1>

              {item.incorrect_answers.map((data, index) => (
                <h1
                  key={index}
                  style={{ color: color.incorrectAnswer === index && "red" }}
                  onClick={() =>
                    handleClickColor({
                      data: item,
                      correctAnswer: false,
                      index,
                    })
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

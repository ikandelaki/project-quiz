import { useEffect, useState } from "react";
import "../styles/App.css";
import StartMenu from "./StartMenu";
import ScoreBoard from "./ScoreBoard";
import Test from "./Test";
import JumpToQuestion from "./JumpToQuestion";
import questions from "../data/questions.json";

const App = () => {
  const [start, setStart] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [finish, setFinish] = useState(false);
  const [choice, setActiveChoice] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChoice = (possibleAnswer) => {
    let answerToSave;
    let extendChosenAnswers;

    if (choice === possibleAnswer) {
      setActiveChoice();
      answerToSave = null;
    } else {
      setActiveChoice(possibleAnswer);
      answerToSave = possibleAnswer;
    }

    if (!chosenAnswers)
      return setChosenAnswers({ [currentQuestion]: answerToSave });
    extendChosenAnswers = {
      ...chosenAnswers,
      [currentQuestion]: answerToSave,
    };
    setChosenAnswers(extendChosenAnswers);
  };

  useEffect(() => {
    const CURRENT_QUESTION = JSON.parse(
      localStorage.getItem("currentQuestion")
    );
    const START = JSON.parse(localStorage.getItem("start"));
    const FINISH = JSON.parse(localStorage.getItem("finish"));
    const CHOICE = JSON.parse(localStorage.getItem("choice"));
    const CHOSEN_ANSWERS = JSON.parse(localStorage.getItem("chosenAnswers"));

    if (CURRENT_QUESTION) {
      setCurrentQuestion(CURRENT_QUESTION);
    }

    if (START) {
      setStart(START);
    }

    if (FINISH) {
      setFinish(FINISH);
    }

    if (CHOICE) {
      setActiveChoice(CHOICE);
    }

    if (JSON.stringify(CHOSEN_ANSWERS) !== "{}") {
      setChosenAnswers(CHOSEN_ANSWERS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("start", start);
    localStorage.setItem("finish", finish);
    if (choice !== undefined) {
      localStorage.setItem("choice", choice);
    }
    localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
  });

  const renderQuestion = (question, clickable) => {
    return (
      <div className="question-container">
        <div>
          <h1 className="question-title">{questions[question]["question"]}</h1>
          {questions[question].hasOptions ? (
            <div className="question-options">
              {questions[question].hasOptions.map((option) => {
                return <h1 key={option}>{option}</h1>;
              })}
            </div>
          ) : null}
          <ul className="question-answers">
            {questions[question]["answers"].map((possibleAnswer, i) => {
              return (
                <div
                  key={possibleAnswer}
                  className={`question-answer-container ${
                    choice ===
                    questions[question]["answers"].indexOf(possibleAnswer)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (!clickable) return;
                    handleAnswerChoice(
                      questions[question]["answers"].indexOf(possibleAnswer)
                    );
                  }}
                >
                  <div className="question-checkbox"></div>
                  <div className="question-answer">{possibleAnswer}</div>
                </div>
              );
            })}
          </ul>
        </div>
        {start && !finish ? (
          <JumpToQuestion
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            chosenAnswers={chosenAnswers}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="App">
      {start && !finish ? (
        <Test
          start={start}
          chosenAnswers={chosenAnswers}
          setFinish={setFinish}
          setChosenAnswers={setChosenAnswers}
          choice={choice}
          setActiveChoice={setActiveChoice}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          renderQuestion={renderQuestion}
        />
      ) : (
        <StartMenu start={start} setStart={setStart} />
      )}
      {finish ? (
        <ScoreBoard
          chosenAnswers={chosenAnswers}
          renderQuestion={renderQuestion}
          setStart={setStart}
          setFinish={setFinish}
          setChosenAnswers={setChosenAnswers}
          setActiveChoice={setActiveChoice}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : null}
    </div>
  );
};

export default App;

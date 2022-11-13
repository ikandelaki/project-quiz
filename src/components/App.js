import { useState } from "react";
import "../styles/App.css";
import StartMenu from "./StartMenu";
import ScoreBoard from "./ScoreBoard";
import Test from "./Test";
import questions from "../data/questions.json";

const App = () => {
  const [start, setStart] = useState(false);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [finish, setFinish] = useState(false);
  const [choice, setActiveChoice] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerChoice = (possibleAnswer) => {
    if (choice === possibleAnswer) {
      setActiveChoice();
    } else {
      setActiveChoice(possibleAnswer);
      if (!Object.keys(chosenAnswers).length)
        return setChosenAnswers({ [currentQuestion]: possibleAnswer });
      const extendChosenAnswers = {
        ...chosenAnswers,
        [currentQuestion]: possibleAnswer,
      };
      setChosenAnswers(extendChosenAnswers);
    }
  };

  const renderQuestion = (question, clickable) => {
    return (
      <div className='question-container'>
        <h1 className='question-title'>{questions[question]["question"]}</h1>
        {questions[question].hasOptions ? (
          <div className='question-options'>
            {questions[question].hasOptions.map((option) => {
              return <h1 key={option}>{option}</h1>;
            })}
          </div>
        ) : null}
        <ul className='question-answers'>
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
                <div className='question-checkbox'></div>
                <div className='question-answer'>{possibleAnswer}</div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className='App'>
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

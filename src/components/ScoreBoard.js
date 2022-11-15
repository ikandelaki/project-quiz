import { useState } from "react";
import questions from "../data/questions.json";
import "../styles/ScoreBoard.css";

const ScoreBoard = ({
  chosenAnswers,
  renderQuestion,
  setStart,
  setFinish,
  setChosenAnswers,
  setActiveChoice,
  setCurrentQuestion,
}) => {
  const [displayWrongAnswers, toggleDisplayWrongAnswers] = useState(false);

  const calculateCorrectAnswers = () => {
    return questions.reduce((acc, question, i) => {
      if (chosenAnswers && question.correct === chosenAnswers[i]) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const renderCorrectAnswer = (wrongAnswer) => {
    return questions[questions.indexOf(wrongAnswer)].answers[
      questions[questions.indexOf(wrongAnswer)].correct
    ];
  };

  const renderWrongAnswers = () => {
    if (!chosenAnswers) return;
    const wrongAnswersArray = questions.filter(
      (question, i) => question.correct !== chosenAnswers[i]
    );

    return (
      <>
        {wrongAnswersArray.map((wrongAnswer, i) => {
          return (
            <div key={i}>
              {renderQuestion(questions.indexOf(wrongAnswer))}
              <div className='correct-answer'>
                Correct answer: {renderCorrectAnswer(wrongAnswer)}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className='menu-container scoreboard-container'>
      <div className='scoreboard-top-description'>
        <h1>
          You got {calculateCorrectAnswers()} correct out of {questions.length}
        </h1>
        <div className='finish-btns-container'>
          {calculateCorrectAnswers() < questions.length ? (
            <div
              className='btn btn-mistakes no-highlight'
              onClick={() => toggleDisplayWrongAnswers(!displayWrongAnswers)}
            >
              Check mistakes
            </div>
          ) : null}
          <div
            className='btn test-btn--next'
            onClick={() => {
              setStart(false);
              setFinish(false);
              setChosenAnswers({});
              setActiveChoice();
              setCurrentQuestion(0);
            }}
          >
            Start over
          </div>
        </div>
      </div>
      <div
        className={`wrong-answers-container ${
          displayWrongAnswers ? "active" : ""
        }`}
      >
        {displayWrongAnswers ? renderWrongAnswers() : null}
      </div>
    </div>
  );
};

export default ScoreBoard;

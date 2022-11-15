import { useEffect } from "react";
import questions from "../data/questions.json";
import "../styles/Test.css";

const Test = ({
  start,
  chosenAnswers,
  setFinish,
  setActiveChoice,
  currentQuestion,
  setCurrentQuestion,
  renderQuestion,
}) => {
  useEffect(() => {
    if (chosenAnswers && chosenAnswers[currentQuestion] !== null)
      return setActiveChoice(chosenAnswers[currentQuestion]);

    setActiveChoice();
  });

  return (
    <div className={`menu-container test-container ${start ? "active" : ""}`}>
      <div className='test-top-content'>
        <div className='btn end-btn' onClick={() => setFinish(true)}>
          End test
        </div>
        <div className='question-number'>
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>
      {renderQuestion(currentQuestion, true)}
      <div className='test-btn--container'>
        {currentQuestion > 0 ? (
          <div
            className='btn test-btn--prev no-highlight'
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </div>
        ) : null}
        {currentQuestion < questions.length - 1 ? (
          <div
            className='btn test-btn--next no-highlight'
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </div>
        ) : (
          <div
            className='btn test-btn--next no-highlight'
            onClick={() => setFinish(true)}
          >
            Finish test
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;

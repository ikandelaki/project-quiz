import questions from "../data/questions.json";
import "../styles/JumpToQuestion.css";

const JumpToQuestion = ({
  currentQuestion,
  setCurrentQuestion,
  chosenAnswers,
}) => {
  return (
    <div className="jump-to-question-section">
      {questions.map((question, i) => {
        return (
          <div
            key={question + i}
            className={`question-box ${currentQuestion === i ? "active" : ""} ${
              chosenAnswers && (chosenAnswers[i] || chosenAnswers[i] === 0)
                ? "filled"
                : ""
            }`}
            onClick={() => setCurrentQuestion(i)}
          >
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};

export default JumpToQuestion;

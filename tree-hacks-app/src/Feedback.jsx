import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function Feedback({
  response,
  feedbackResponse,
  helperAPICaller,
  setFeedbackResponse,
  feedbackPrompt,
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    const askPrompt = `Next, explain the differences between this statement: ${feedbackPrompt} and the definition of an integral.`;

    setIsLoading(true);
    helperAPICaller(askPrompt, setFeedbackResponse, setIsLoading);
  }

  return (
    <div className={`${response ? "Content-box" : "dissapear"}`}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <p className="Content-response">{feedbackResponse}</p>
      )}
      <button
        className={!feedbackResponse ? "button" : "button disabled"}
        onClick={handleClick}
      >
        Ask for a feedback
      </button>
    </div>
  );
}

export default Feedback;

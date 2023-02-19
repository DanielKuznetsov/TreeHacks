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
    console.log(feedbackPrompt);
    const askPrompt = `Explain why the following input is right or wrong: ${feedbackPrompt} according to the definition of an integral. Check if the provided input explained fully, if not, tell me what's missing.`;

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
        disabled={feedbackResponse}
      >
        Explain the rating
      </button>
    </div>
  );
}

export default Feedback;

import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

function Suggestions({
  suggestResponse,
  feedbackResponse,
  helperAPICaller,
  setSuggestResponse,
  feedbackPrompt,
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleConceptsClick() {
    const askPrompt = `Act as a very well spoken individual who can explain complicated concepts very well. Now, give me specific definition of an integral with its use cases so that a 7 year-old can understand.`;

    setIsLoading(true);
    helperAPICaller(askPrompt, setSuggestResponse, setIsLoading);
  }

  return (
    <div
      className={`${
        feedbackResponse ? "Content-box list" : " button dissapear"
      }`}
    >
      {isLoading ? <LoadingSpinner /> : <p>{suggestResponse}</p>}
      <button
        className={!suggestResponse ? "button" : "button disabled"}
        onClick={handleConceptsClick}
        disabled={suggestResponse}
      >
        Explain the concept
      </button>
    </div>
  );
}

export default Suggestions;

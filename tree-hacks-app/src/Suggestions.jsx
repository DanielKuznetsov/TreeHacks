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
    const askPrompt = `Suggest a list of 5 theoretical concepts that are covered before the definition of integral that would help me prepare understand what an integral is based on my initial response which was this ${feedbackPrompt}. Output this list as an array.`;

    setIsLoading(true);
    helperAPICaller(askPrompt, setSuggestResponse, setIsLoading);
  }

  return (
    <div
      className={`${
        feedbackResponse ? "Content-box list" : " button dissapear"
      }`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul className="Content-list">
          {suggestResponse
            ? suggestResponse.map((el, index) => (
                <li key={index * 12}>
                  {index + 1}. {el}
                </li>
              ))
            : ""}
        </ul>
      )}
      <button
        className={!suggestResponse ? "button" : "button disabled"}
        onClick={handleConceptsClick}
      >
        Suggest what concepts to review
      </button>
    </div>
  );
}

export default Suggestions;

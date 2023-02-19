import { useState } from "react";
import axios from "axios";
import "./App.scss";
import LoadingSpinner from "./LoadingSpinner";
import Feedback from "./Feedback";
import Suggestions from "./Suggestions";

const helperAPICaller = (filteredPrompt, stateUpdate, setIsLoading) => {
  axios
    .post("http://localhost:4000/chat", { prompt: filteredPrompt })
    .then((res) => {
      setIsLoading(false);
      stateUpdate(res.data);
    })
    .catch((err) => console.log(err));
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [feedbackResponse, setFeedbackResponse] = useState("");
  const [feedbackPrompt, setFeedbackPrompt] = useState("");
  const [suggestResponse, setSuggestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    console.log(isLoading);

    const askPrompt = `Rate how similar these statements are: ${prompt} with this: a function of which a given function is the derivative, i.e. which yields that function when differentiated, and which may express the area under the curve of a graph of the function. Make sure to rate on a scale of 1 to 10. I only want a numerical rating. `;
    helperAPICaller(askPrompt, setResponse, setIsLoading);

    setFeedbackPrompt(prompt);
    setPrompt("");
  }

  return (
    <div className="App">
      <form className="Form" onSubmit={handleSubmit}>
        <label className="Form-label">
          What is the definition of an Integral?
        </label>
        <textarea
          minLength={10}
          maxLength={250}
          rows={4}
          cols={30}
          placeholder="Answer the above question!"
          className="Form-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p>{response ? `The rating is: ${response}` : ""}</p>
        )}
        <button
          className={`${!response ? "button" : "button disabled"}`}
          disabled={response}
        >
          Get the relevance rating
        </button>
      </form>

      <div className="Content">
        <Feedback
          response={response}
          feedbackResponse={feedbackResponse}
          helperAPICaller={helperAPICaller}
          isLoading={isLoading}
          setFeedbackResponse={setFeedbackResponse}
          feedbackPrompt={feedbackPrompt}
        />
        <Suggestions
          feedbackPrompt={feedbackPrompt}
          setSuggestResponse={setSuggestResponse}
          helperAPICaller={helperAPICaller}
          feedbackResponse={feedbackResponse}
          suggestResponse={suggestResponse}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;

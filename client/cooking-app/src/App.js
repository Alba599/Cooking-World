// Don't forget to import useState and useEffect
import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.css";

function App() {
  // Create state for both API fields one by one using useState
  // const [status, setStatus] = useState(null);
  // const [version, setVersion] = useState(null);

  const [question, setQuestion] = useState("");

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const saveQuestion = async () => {
    const response = await $.post("http://localhost:8000/savequestion", {
      question_text: question,
      question_created: new Date(),
    });
    console.log(response);
  };

  // useEffect replaces componentDidMount and componentDidUpdate
  useEffect(() => {
    // fetch("http://localhost:8000")
    //   .then((data) => data.json())
    //   .then((response) => {
    //     console.log(response);
    // setStatus(response.status);
    //   // setVersion(response.version);
    // });
  });

  // Render the two API fields
  // const statusText = status
  //   ? "The server is working"
  //   : "The server is not working";
  return (
    <div className="App">
      <form>
        <label>
          Question:
          <input type="text" onChange={handleQuestion} />
        </label>
      </form>
      <br></br>
      <button onClick={saveQuestion}>Save</button>
    </div>
  );
}

export default App;

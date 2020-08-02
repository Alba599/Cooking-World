import React, { useState, useEffect } from "react";
import $ from "jquery";

function Question({ match }) {
  useEffect(() => {
    fetchQuestion();
    fetchPastAnswers();
    // console.log(match);
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pastAnswers, setPastAnswers] = useState([]);

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const saveAnswer = async () => {
    const response = await $.post("http://localhost:8000/saveanswer", {
      question_id: match.params.id,
      answer_text: answer,
      answer_created: new Date(),
    });
    console.log(response);
    fetchPastAnswers();
  };

  const fetchQuestion = async () => {
    const response = await fetch(
      `http://localhost:8000/question/${match.params.id}`
    )
      .then((data) => data.json())
      .then((response) => {
        setQuestion(response.question_text);
      });
  };

  const fetchPastAnswers = async () => {
    const response = await fetch(
      `http://localhost:8000/getanswers/${match.params.id}`
    )
      .then((data) => data.json())
      .then((response) => {
        setPastAnswers(response);
      });
  };

  return (
    <div>
      <h1>{question}</h1>
      <form>
        <label>
          Answers:
          <input type="text" onChange={handleAnswer} />
        </label>
      </form>
      <br></br>
      <button onClick={saveAnswer}>Save Answer</button>
      <br></br>
      <div>
        {pastAnswers.map((a) => (
          <p key={a.answer_id}>{a.answer_text}</p>
        ))}
      </div>
    </div>
  );
}

export default Question;

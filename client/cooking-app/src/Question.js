import React, { useState, useEffect } from "react";
import $ from "jquery";

function Question({ match }) {
  useEffect(() => {
    fetchQuestion();
    console.log(match);
  }, []);

  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState('');

  const fetchQuestion = async () => {
    const response = await fetch(
      `http://localhost:8000/question/${match.params.id}`
    )
      .then((data) => data.json())
      .then((response) => {
        setQuestion(response.question_text);
      });
  };

  return (
    <div>
      <h1>{question}</h1>
    </div>
  );
}

export default Question;

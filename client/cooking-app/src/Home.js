import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState("");

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const saveQuestion = async () => {
    const response = await $.post("http://localhost:8000/savequestion", {
      question_text: question,
      question_created: new Date(),
      user: user,
    });
    console.log(response);
    fetchQuestions();
  };

  const fetchQuestions = () => {
    const resp = fetch("http://localhost:8000/getallquestions")
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        setQuestions(response);
      });
  };

  return (
    <div className="App">
      <form>
        <label>
          Question:
          <input type="text" onChange={handleQuestion} />
        </label>
        <label>
          Username:
          <input type="text" onChange={handleUser}></input>
        </label>
      </form>
      <br></br>
      <button onClick={saveQuestion}>Save</button>
      <br></br>
      <div>
        {questions.map((q) => (
          <p key={q.question_id}>
            <Link to={`/question/${q.question_id}`}>{q.question_text}</Link>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Home;

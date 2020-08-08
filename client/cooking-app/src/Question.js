import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import App from "./App";
import { Button, Nav } from "react-bootstrap";

function Question({ match }) {
  useEffect(() => {
    fetchQuestion();
    fetchPastAnswers();
    // console.log(match);
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pastAnswers, setPastAnswers] = useState([]);
  const [user, setUser] = useState("");
  const [questionUser, setQuestionUser] = useState("");
  // const [users, setUsers] = useState("");

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const handleUser = (event) => {
    setUser(event.target.value);
  };
  const saveAnswer = async () => {
    const response = await $.post("http://localhost:8000/saveanswer", {
      question_id: match.params.id,
      answer_text: answer,
      answer_created: new Date(),
      user: user,
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
        setQuestionUser(response.user);
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
      <div className="nav-menu">
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <h1>{question}</h1>
      <h3>{questionUser}</h3>
      <form>
        <label>
          Answers:
          <input type="text" onChange={handleAnswer} />
        </label>
        <label>
          Username:
          <input type="text" onChange={handleUser}></input>
        </label>
      </form>
      <br></br>
      <button onClick={saveAnswer}>Save Answer</button>
      <br></br>
      <div>
        {pastAnswers.map((a) => (
          <div key={a.answer_id}>
            <div>{a.answer_text}</div>
            <div>{a.user}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;

import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import App from "./App";
import "./Questions.css";
import {
  Button,
  Nav,
  InputGroup,
  FormControl,
  Container,
  Image,
  Row,
  Col,
  Jumbotron,
  ListGroup,
} from "react-bootstrap";

function Question({ match }) {
  useEffect(() => {
    fetchQuestion();
    fetchPastAnswers();
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pastAnswers, setPastAnswers] = useState([]);
  const [user, setUser] = useState("");
  const [questionUser, setQuestionUser] = useState("");
  const [canSave, setCanSave] = useState(false);

  const handleAnswer = (event) => {
    if (event.target.value.length > 0) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
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
            <Nav.Link href="/">
              <Button variant="light">Home</Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <h1 className="questionTitle">{question}</h1>
      <InputGroup
        className="smaller-input"
        size="sm"
        Col
        xs={7}
        class="col-xs-4"
      >
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          onChange={handleUser}
        />
      </InputGroup>
      <form>
        <InputGroup className="mb-4" className="smaller-input">
          <InputGroup.Prepend>
            <InputGroup.Text>Answers</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            type="text"
            onChange={handleAnswer}
          />
        </InputGroup>
      </form>
      <br></br>
      <Button
        disabled={!canSave}
        variant="light"
        onClick={saveAnswer}
        className="saveAnswers"
      >
        Save Answer
      </Button>
      <br></br>
      <div>
        {pastAnswers.map((a) => (
          <div key={a.answer_id} className="answers">
            <span>{a.answer_text}</span>
            <br></br>
            <span>{a.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;

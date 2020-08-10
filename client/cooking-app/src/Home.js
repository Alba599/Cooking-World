import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.css";
import "./Home.css";
import { Link } from "react-router-dom";
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
    <div>
      <form>
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
        {/* <label>
          Username:
          <input type="text" onChange={handleUser}></input>
        </label> */}
        {/* <label>
          Question:
          <input type="text" onChange={handleQuestion} />
        </label> */}
        <InputGroup className="mb-4" className="smaller-input">
          <InputGroup.Prepend>
            <InputGroup.Text>Enter Question</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            type="text"
            onChange={handleQuestion}
          />
        </InputGroup>
      </form>
      <br></br>
      <div className="saveQuestions">
        <Button variant="light" onClick={saveQuestion}>
          Save
        </Button>
        {/* <button onClick={saveQuestion}>Save</button> */}
      </div>
      <br></br>
      <div>
        {questions.map((q) => (
          <p key={q.question_id} className="questions">
            <ListGroup>
              <ListGroup.Item>
                <Link to={`/question/${q.question_id}`}>{q.question_text}</Link>
              </ListGroup.Item>
            </ListGroup>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Home;

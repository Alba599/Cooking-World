import React, { useState, useEffect } from "react";
import $ from "jquery";
import Home from "./Home";
import Question from "./Question";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
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
} from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Jumbotron fluid>
          <Container>
            <h1 className="title">Cooking World</h1>
          </Container>
        </Jumbotron>
        <Router>
          <Route path="/" exact component={Home} />
          {/* <Route path="/login" exact component={Login} /> */}
          {/* <Route path="/register" exact component={Register} /> */}
          <Route
            className="saveAnswers"
            path="/question/:id"
            exact
            component={Question}
          />
        </Router>
      </div>
    );
  }
}

export default App;

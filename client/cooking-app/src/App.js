// Don't forget to import useState and useEffect
import React, { useState, useEffect } from "react";
import $ from "jquery";
import Home from "./Home";
// import Nav from "./Nav";
import Question from "./Question";
// import Register from "./Register";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
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
            <h1>Cooking World</h1>
          </Container>
        </Jumbotron>
        <Router>
          <Route path="/" exact component={Home} />
          {/* <Route path="/login" exact component={Login} /> */}
          {/* <Route path="/register" exact component={Register} /> */}
          <Route path="/question/:id" exact component={Question} />
        </Router>
      </div>
    );
  }
}

export default App;

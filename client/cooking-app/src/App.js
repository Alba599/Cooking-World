// Don't forget to import useState and useEffect
import React, { useState, useEffect } from "react";
import $ from "jquery";
import Home from "./Home";
import Nav from "./Nav";
import Question from "./Question";
// import Register from "./Register";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Nav />
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

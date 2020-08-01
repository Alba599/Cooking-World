// Don't forget to import useState and useEffect
import React, { useState, useEffect } from "react";
import $ from "jquery";
import Home from "./Home";
import Question from "./Question";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/question" exact component={Question} />
        </Router>
      </div>
    );
  }
}

export default App;

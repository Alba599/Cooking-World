// Don't forget to import useState and useEffect
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Create state for both API fields one by one using useState
  const [status, setStatus] = useState(null);
  const [version, setVersion] = useState(null);

  // useEffect replaces componentDidMount and componentDidUpdate
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        setStatus(response.status);
        setVersion(response.version);
      });
  });

  // Render the two API fields
  const statusText = status
    ? "The server is working"
    : "The server is not working";
  return (
    <div className="App">
      <p>Status: {statusText}</p>
      <p>Version: {version}</p>
    </div>
  );
}

export default App;

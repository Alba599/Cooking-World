import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const history = useHistory();

  const register = () => {
    console.log("Inside the button");
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:8000/register",
    }).then((res) => {
      if (res.status == 200) {
        console.log("User created");
        history.push("/");
      }
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
// import "./Nav.css";

function Nav() {
  return (
    <div className="nav-menu">
      <Link to="/">Home</Link>
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/register">Sign Up</Link> */}
    </div>
  );
}

export default Nav;

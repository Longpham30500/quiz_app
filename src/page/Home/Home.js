import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const logo = require("../../images/logo.jpg");

const Home = () => {
  
  return (
    <div className="box-center">
      <div>
        <img src={logo} alt="logo" />
        <Link to='/question'>Start Quizz</Link>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import logo from '../.././images/logo.png'

const Home = () => {
  return (
    <div className="contain">
      <div className="box-center">
        <div>
          <img src={logo} alt="logo" />
          <div>
            <Link to="/question">Start Quiz</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

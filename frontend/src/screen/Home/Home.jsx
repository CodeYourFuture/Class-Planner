import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import users from "../../data/users.json";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home_container">
      <Header component={"home"} />
      <div className="home-main">
        <div>
          <img className="home-image" src="../files/Home.png" alt="CYF" />
        </div>
        <div className="home-main-buttons-container">
          <Link className="home-button" to={`/${users[0].id}/cities`}>
            <p>
              <i className="fas fa-user"></i>Admin
            </p>
          </Link>

          <Link className="home-button" to={`/${users[1].id}/cities`}>
            <p>
              <i className="fas fa-user"></i>Volunteer
            </p>
          </Link>

          <Link className="home-button" to={`/${users[2].id}/cities`}>
            <p>
              <i className="fas fa-user"></i>Student
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Send_PageData } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = ({ Send_PageData }) => {
  useEffect(() => {
    Send_PageData("None", "Home", "None");
  }, [Send_PageData]);

  return (
    <div className="home_container">
      <Header />
      <div className="home-main">
        <div>
          <img className="home-image" src="../files/Home.png" alt="CYF" />
        </div>
        <div className="home-main-buttons-container">
          <Link
            onClick={() => Send_PageData("admin", "Cities", "None")}
            className="home-button"
            to="/Cities/"
          >
            <p>
              <i className="fas fa-user"></i>Admin
            </p>
          </Link>

          <Link
            className="home-button"
            to="/Cities/"
            onClick={() => Send_PageData("volunteer", "Cities", "None")}
          >
            <p>
              <i className="fas fa-user"></i>Volunteer
            </p>
          </Link>

          <Link
            className="home-button"
            to="/Cities/"
            onClick={() => Send_PageData("student", "Cities", "None")}
          >
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

export default connect(null, { Send_PageData })(Home);

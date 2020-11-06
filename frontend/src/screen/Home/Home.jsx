import React, { useState } from "react";
import Alert from "../../components/Alert/Alarm";
import AdminLogin from "./AdminLogin";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import users from "../../data/users.json";
import "./Home.scss";

const Home = () => {
  const [ConfirmationStatus, setConfirmationStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("message");

  function cancelBookingHandler() { 
    setConfirmationStatus(true);
  }

  function closeConfirmationAlert() {
    setConfirmationStatus(false);
  }

  function showAlert(type, message) {
    setAlertStatus(true);
    setAlertType(type);
    setAlertMessage(message);
  }
  return (
    <div className="home_container">
      <Header component={"home"} />
      <div className="home-main">
        {ConfirmationStatus && (
          <AdminLogin
            closeHandler={closeConfirmationAlert}
            showAlert={showAlert}
          />
        )}
        {alertStatus && <Alert type={alertType}> {alertMessage} </Alert>}
        <div>
          <img className="home-image" src="../files/Home.png" alt="CYF" />
        </div>
        <div className="home-main-buttons-container">
          <button
            className="home-button"
            onClick={(e) => {
              setAlertStatus(false);
              cancelBookingHandler();
            }}
          >
            <p>
              <i className="fas fa-user"></i>Admin
            </p>
          </button>

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

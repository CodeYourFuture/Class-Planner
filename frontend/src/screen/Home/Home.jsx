import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Send_PageData } from "../../redux/actions";
import { Get_Courses } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Home.scss";

const mapStateToProps = (state) => {
  return { courses: state.CourseReducer.courses };
};

const Home = ({ Send_PageData, courses, Get_Courses }) => {
  useEffect(() => {
    Send_PageData("None", "Home", "None");
    Get_Courses();
  }, [Send_PageData, Get_Courses]);
  const passData = (user, title) => {
    Send_PageData(user, title, "None");
  };
  return (
    <div className="home_container">
      <Header />
      <div className="home-main">
        <div>
          <img className="home-image" src="../files/Home.png" alt="CYF" />
        </div>
        {/* <div className="control-container">
          <i className="fas fa-map-marker-alt"></i>
          <select id="city">
            {courses &&
              courses.map((course, index) => {
                return (
                  <option
                    value={`${course.cityName}`}
                    key={index}
                  >
                    {" "}
                    {course.cityName}
                  </option>
                );
              })}
          </select>
        </div> */}
        <div>
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

export default connect(mapStateToProps, { Send_PageData, Get_Courses })(Home);

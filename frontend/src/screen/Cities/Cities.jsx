import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Send_PageData } from "../../redux/actions";
import { Get_Courses } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Cities.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
    courses: state.CourseReducer.courses,
  };
};

const Cities = ({ pageData, Send_PageData, courses, Get_Courses }) => {
  const [allCities, setAllCities] = useState(null);
  const showCities = useCallback(() => {
    if (courses) {
      let cityName = courses.map((course) => course.cityName);
      cityName = cityName.filter((a, b) => cityName.indexOf(a) === b);
      setAllCities(cityName);
    }
  }, [courses]);
  useEffect(() => {
    Get_Courses();
  }, [Get_Courses]);
  useEffect(() => {
    showCities();
  }, [showCities]);
  return (
    <div className="home_container">
      <Header />
      <div className="course-card-container">
        {allCities &&
          allCities.map((city, index) => {
            return (
              <Link
                className="course-card"
                key={index}
                to="/coursecalendar/"
                onClick={() => {
                  Send_PageData(pageData.user, "Course Calendar", city);
                }}
              >
                <div>
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div>
                  <p>{city}</p>
                </div>
              </Link>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, { Send_PageData, Get_Courses })(Cities);

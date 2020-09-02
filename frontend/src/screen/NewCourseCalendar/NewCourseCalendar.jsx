import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Send_PageData } from "../../redux/actions";
import { Get_Courses } from "../../redux/actions";
import { Link } from "react-router-dom";
// import "./Home.scss";

const mapStateToProps = (state) => {
  return { courses: state.CourseReducer.courses };
};

const NewCourseCalendar = ({ Send_PageData, courses, Get_Courses }) => {
//   useEffect(() => {
//     Send_PageData("None", "Home", "None");
//     Get_Courses();
//   }, [Send_PageData, Get_Courses]);
//   const passData = (user, title) => {
//     const city = document.getElementById("city").value;
//     Send_PageData(user, title, city);
//   };
  return (
    <div className="home_container">
      <Header />
      <div className="home-main">New Course Calendar</div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, { Send_PageData })(NewCourseCalendar);

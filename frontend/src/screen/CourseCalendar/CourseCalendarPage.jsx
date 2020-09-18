import React from "react";
import Header from "../../components/Header/Header.jsx";
import CourseCalendar from "../../components/CourseCalendar/CourseCalendar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./CourseCalendar.scss";

const CourseCalendarPage = ({ user, city, component }) => {
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="coursecalendar-container">
      <CourseCalendar user={user} city={city} component={component} />
      </div>
      <Footer />
    </div>
  );
};

export default CourseCalendarPage;

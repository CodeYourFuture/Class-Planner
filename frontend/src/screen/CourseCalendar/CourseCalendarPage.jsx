import React from "react";
import Header from "../../components/Header/Header.jsx";
import CourseCalendar from "../../components/CourseCalendar/CourseCalendar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const CourseCalendarPage = ({ user, city, component }) => {
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <CourseCalendar user={user} city={city} component={component} />
      <Footer />
    </div>
  );
};

export default CourseCalendarPage;

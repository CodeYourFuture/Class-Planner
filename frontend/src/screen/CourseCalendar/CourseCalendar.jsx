import React from "react";
import Header from "../../components/Header/Header.jsx";
import CourseCalendarForm from "../../components/CourseCalendarForm/CourseCalendarForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const CourseCalendar = ({ match }) => {
  const { params } = match;
  return (
    <div>
      <Header param={params} NavState="courseCalendar" />
      <CourseCalendarForm />
      <Footer />
    </div>
  );
};

export default CourseCalendar;

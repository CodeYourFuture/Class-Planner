import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import CourseCalendarForm from "../../components/CourseCalendarForm/CourseCalendarForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Get_Courses } from "../../redux/actions";

const mapStateToProps = (state) => {
  return {
    courses: state.CourseReducer.courses,
    pageData: state.PageReducer.pageData,
  };
};

const CourseCalendar = ({ courses, Get_Courses, pageData }) => {
  useEffect(() => {
    Get_Courses(pageData.city);
  }, [Get_Courses, pageData]);
  return (
    <div>
      <Header />
      <CourseCalendarForm courses={courses} pageData={pageData} />
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, { Get_Courses })(CourseCalendar);

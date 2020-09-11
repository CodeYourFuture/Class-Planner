import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NewCourse from "../../components/NewCourse/NewCourse.jsx";
import { connect } from "react-redux";
import "./NewCoursePage.scss";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const NewCoursePage = ({ pageData }) => {
  return (
    <div>
      <Header />
      <div className="NewCourseCalendar">
        {pageData.user === "admin" ? <NewCourse /> : null}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(NewCoursePage);
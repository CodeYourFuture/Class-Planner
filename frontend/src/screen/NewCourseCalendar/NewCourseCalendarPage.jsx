import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NewCourseCalendar from "../../components/NewCourseCalendar/NewCourseCalendar.jsx";
import { connect } from "react-redux";
import "./NewCourseCalendarPage.scss";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const NewCourseCalendarPage = ({ pageData }) => {
  return (
    <div>
      <Header />
      <div className="NewCourseCalendar">
        {pageData.user === "admin" ? <NewCourseCalendar /> : null}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(NewCourseCalendarPage);
import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const NewCourseCalendar = ({ pageData }) => {
  return (
    <div className="home_container">
      <Header />
      <div className="upcoming-class-container">
        <p className="upcoming-class-title">{pageData.title}</p>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(NewCourseCalendar);

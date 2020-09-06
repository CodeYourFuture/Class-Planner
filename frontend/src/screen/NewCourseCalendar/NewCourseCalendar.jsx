import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NewCourseCalendarForm from "../../components/NewCourseCalendarForm/NewCourseCalendarForm.jsx";
import { connect } from "react-redux";
import "./NewCourseCalendar.scss";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const NewCourseCalendar = ({ pageData }) => {
  return (
    <div>
      <Header />
      <div className="NewCourseCalendar">
        {pageData.user === "admin" ? <NewCourseCalendarForm /> : null}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(NewCourseCalendar);

// {
/* <div className="home_container">
<Header />
<div className="upcoming-class-container">
  <p className="upcoming-class-title">{pageData.title}</p>
  <NewCourseCalendarForm />
</div>
<Footer />
</div> */
// }

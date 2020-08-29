import React from "react";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
  };
};

const ClassVolunteers = ({ pageData }) => {
  return (
    <div>
      <Header />
      <div className="upcoming-class-container">
        <p className="upcoming-class-title">
          {pageData.city} <i className="fas fa-angle-right"></i>{" "}
          {pageData.title}
        </p>
        <ClassCard />
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(ClassVolunteers);

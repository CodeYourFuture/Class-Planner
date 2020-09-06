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
      <div className="upcoming-class-title">
          <p>{pageData.city}</p> <i className="fas fa-chevron-right"></i>
          <p>{pageData.title}</p>
        </div>
        <ClassCard />
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(ClassVolunteers);

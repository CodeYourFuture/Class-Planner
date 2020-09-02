import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Get_UpcomingClass } from "../../redux/actions";
import "./UpcomingClass.scss";

const mapStateToProps = (state) => {
  return {
    Class: state.ClassReducer.Class,
    pageData: state.PageReducer.pageData,
  };
};

const UpcomingClass = ({ Class, Get_UpcomingClass, pageData }) => {
  useEffect(() => {
    Get_UpcomingClass(pageData.city);
  }, [Get_UpcomingClass, pageData.city]);
  return (
    <div>
      <Header />
      <div className="upcoming-class-container">
        <p className="upcoming-class-title">
          <p>{pageData.city}</p> <i class="fas fa-chevron-right"></i>
          <p>{pageData.title}</p>
        </p>
        {Class ? (
          <ClassCard
            Title={"Upcoming Class"}
            Child={null}
            Class={Class}
            pageData={pageData}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, { Get_UpcomingClass })(UpcomingClass);

import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { Get_UpcomingClass } from "../../redux/actions";

const mapStateToProps = (state) => {
  console.log(state)
  return { Class: state.ClassReducer.Class };
};

const UpcomingClass = ({ Class, Get_UpcomingClass, match }) => {
  const { params } = match;

  useEffect(() => {
    Get_UpcomingClass();
  }, [Get_UpcomingClass]);
  return (
    <div>
      <Header param={params} NavState="upcomingClass" />
      {Class ? (
        <ClassCard
          Title={"Upcoming Class"}
          Child={null}
          Class={Class}
          param={params}
        />
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, { Get_UpcomingClass })(UpcomingClass);

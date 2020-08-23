import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_UpcomingClass } from "../../redux/actions";
import { Header, Loading, ClassCard, Footer } from "../../components/";

const mapStateToProps = (state) => {
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

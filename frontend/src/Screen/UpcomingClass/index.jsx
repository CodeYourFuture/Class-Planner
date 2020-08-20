import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../redux/actions";
import Header from "../../components/Header";
import ClassCard from "../../components/ClassCard";
import Footer from "../../components/Footer";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

const UpcomingClass = ({ classes, Get_Classes, match }) => {
  const { params } = match;

  useEffect(() => {
    Get_Classes();
  }, [Get_Classes]);

  return (
    <div>
      <Header parm={params} NavState="upcoming class" />
      <ClassCard Classes={classes} />
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, { Get_Classes })(UpcomingClass);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../Redux/Actions";
import Header from "../../Components/Header/Header";
import ClassCard from "../../Components/ClassCard/ClassCard";
import Footer from "../../Components/Footer/Footer";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

export default connect(mapStateToProps, { Get_Classes })(
  ({ classes, Get_Classes, match }) => {
    const { params } = match;

    useEffect(() => {
      Get_Classes();
    }, [Get_Classes]);

    return (
      <React.Fragment>
        <Header parm={params} NavState="new booking" />
        <ClassCard Classes={classes} Child="newbooking" />
        <Footer />
      </React.Fragment>
    );
  }
);

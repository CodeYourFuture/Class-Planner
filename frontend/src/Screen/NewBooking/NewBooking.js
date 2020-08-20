import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../redux/actions";
import { Header, ClassCard, Footer } from "../../components";

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

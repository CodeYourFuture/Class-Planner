import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../redux/actions";
import { Header, ClassCard, Footer } from "../../components";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

const NewBooking = ({ classes, Get_Classes, match }) => {
  const { params } = match;

  useEffect(() => {
    Get_Classes();
  }, [Get_Classes]);

  return (
    <React.Fragment>
      <Header param={params} NavState="newBooking" />
      <ClassCard
        Class={params.Class}
        Title={"New Booking"}
        Child="newBooking"
        param={params}
      />
      <Footer />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, { Get_Classes })(NewBooking);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../redux/actions";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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

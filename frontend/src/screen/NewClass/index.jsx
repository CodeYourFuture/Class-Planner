import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Get_Classes } from "../../redux/actions";
import { Header, NewClassForm, Footer } from "../../components/";

const mapStateToProps = (state) => {
  return { classes: state.ClassReducer.classes };
};

const NewClass = ({ classes, Get_Classes, match }) => {
  const { params } = match;

  useEffect(() => {
    Get_Classes();
  }, [Get_Classes]);

  return (
    <div>
      <Header param={params} NavState="newClass" />
      {params.user === "admin" ? <NewClassForm /> : null}
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps, { Get_Classes })(NewClass);

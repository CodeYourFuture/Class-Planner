import React from "react";
import Header from "../../components/Header/Header.jsx";
import NewClassForm from "../../components/NewClassForm/NewClassForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const NewClass = ({ pageData }) => {
  return (
    <div>
      <Header />
      {pageData.user === "admin" ? (
        <NewClassForm pageData={pageData} />
      ) : null}
      <Footer />
    </div>
  );
};
export default connect(mapStateToProps)(NewClass);

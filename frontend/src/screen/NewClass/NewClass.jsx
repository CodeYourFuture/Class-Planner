import React from "react";
import Header from "../../components/Header/Header.jsx";
import NewClassForm from "../../components/NewClassForm/NewClassForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const NewClass = ({ match }) => {
  const { params } = match;
  return (
    <div>
      <Header param={params} NavState="newClass" />
      {params.user === "admin" ? <NewClassForm /> : null}
      <Footer />
    </div>
  );
};
export default NewClass;

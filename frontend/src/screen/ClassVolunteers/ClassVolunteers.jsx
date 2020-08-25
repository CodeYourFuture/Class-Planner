import React from "react";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const ClassVolunteers = ({ match }) => {
  const { params } = match;
  return (
    <div>
      <Header param={params} NavState="classVolunteers" />
      <ClassCard
        Class={params.Class}
        Title={"Atended Volunteers"}
        Child="volunteersList"
        param={params}
      />
      <Footer />
    </div>
  );
};

export default ClassVolunteers;

import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";

const NewBooking = ({ user, city, component, id, WeekNumber }) => {
  const [Class, setClass] = useState(null);
  const getClass = useCallback(async () => {
    await axios.get(`/api/v1/classes/`).then((response) => {
      setClass(response.data.data.find((_Class) => _Class._id === id));
    });
  }, [id]);
  useEffect(() => {
    getClass();
  }, [getClass]);
  return (
    <React.Fragment>
      <Header user={user} city={city} component={component} />
      <div className="upcoming-class-container">
        <div className="page-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>New Booking</p>
        </div>
        {Class ? (
          <ClassCard
            user={user}
            city={city}
            component={component}
            Class={Class}
            WeekNumber={WeekNumber}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NewBooking;

import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";

const ClassVolunteers = ({ user, city, component, id, WeekNumber }) => {
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
    <div>
      <Header user={user} city={city} component={component} />
      <div className="upcoming-class-container">
        <div className="page-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>Atended Volunteers</p>
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
    </div>
  );
};

export default ClassVolunteers;

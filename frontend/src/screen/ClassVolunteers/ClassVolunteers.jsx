import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { useHistory } from "react-router";
import axios from "axios";

const ClassVolunteers = ({ user, city, component, id, WeekNumber }) => {
  const [Class, setClass] = useState(null);
  const history = useHistory();
  const getClass = useCallback(async () => {
    await axios.get(`/api/v1/classes/`).then((response) => {
      if (response.data.data.length > 0) {
        let classFound = response.data.data.find((Class) => Class._id === id);
        if (classFound) {
          setClass(classFound);
        } else {
          history.push(`/`);
        }
      } else {
        history.push(`/`);
      }
    });
  }, [id, history]);
  useEffect(() => {
    getClass();
  }, [getClass]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="upcoming-class-container">
        <div className="page-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>Attending Volunteers</p>
        </div>
        {Class ? (
          <ClassCard
            user={user}
            id={id}
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

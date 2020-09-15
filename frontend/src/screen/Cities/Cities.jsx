import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cities.scss";

const Cities = ({ user, component }) => {
  const [citiesName, setCitiesName] = useState(null);
  const getCityName = useCallback(async () => {
    try {
      await axios.get(`/api/v1/courses`).then((response) => {
        let cities = response.data.data.map((course) => course.cityName);
        cities = cities.filter((a, b) => cities.indexOf(a) === b);
        if (cities.length > 0) {
          setCitiesName(cities);
        } else {
          setCitiesName(null);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getCityName();
  }, [getCityName]);
  return (
    <div>
      <Header user={user} component={component} />
      {citiesName ? (
        <div className="upcoming-class-container">
          <p className="page-title">Cities</p>
          <div className="course-card-container">
            {citiesName.map((city, index) => {
              return (
                <Link
                  className="course-card"
                  key={index}
                  to={`/${user}/${city}/coursecalendar`}
                >
                  <div>
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <div>
                    <p>{city}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

export default Cities;

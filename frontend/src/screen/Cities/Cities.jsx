import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cities.scss";

const Cities = ({ user, component }) => {
  const [citiesName, setCitiesName] = useState({
    citiesName: [],
    searchResult: [],
  });
  const search = (e) => {
    try {
      setCitiesName({
        citiesName: citiesName.citiesName,
        searchResult: citiesName.citiesName.filter(
          (city) =>
            city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
        ),
      });
    } catch (err) {
      setCitiesName({
        citiesName: [],
        searchResult: [],
      });
    }
  };
  const getCityName = useCallback(async () => {
    try {
      await axios.get(`/api/v1/courses`).then((response) => {
        let cities = response.data.data.map((course) => course.cityName);
        cities = cities.filter((a, b) => cities.indexOf(a) === b);
        if (cities.length > 0) {
          setCitiesName({
            citiesName: cities,
            searchResult: cities,
          });
        }
      });
    } catch (err) {
      setCitiesName({
        citiesName: [],
        searchResult: [],
      });
    }
  }, []);
  useEffect(() => {
    getCityName();
  }, [getCityName]);
  return (
    <div>
      <Header user={user} component={component} />
      <div className="upcoming-class-container">
        <div className="city-searchbar">
          <input
            type="text"
            className="form-control"
            placeholder="search . . ."
            onChange={(e) => search(e)}
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="course-card-container">
          {citiesName.searchResult && citiesName.searchResult.length > 0 ? (
            citiesName.searchResult.map((city, index) => {
              return (
                <Link
                  className="course-card animate__animated animate__fadeIn"
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
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cities;

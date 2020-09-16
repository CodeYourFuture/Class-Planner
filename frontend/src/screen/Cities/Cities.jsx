import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cities.scss";

const Cities = ({ user, component }) => {
  const [citiesName, setCitiesName] = useState(null);
  const [searchResault, setSearchResault] = useState([]);
  const search = useCallback((e) => {
    setSearchResault(
      citiesName.filter((city) => city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0)
    );
  }, [citiesName]);
  const getCityName = useCallback(async () => {
    try {
      await axios.get(`/api/v1/courses`).then((response) => {
        let cities = response.data.data.map((course) => course.cityName);
        cities = cities.filter((a, b) => cities.indexOf(a) === b);
        if (cities.length > 0) {
          setCitiesName(cities);
          setSearchResault(cities);
        } else {
          setCitiesName(null);
          setSearchResault(null);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getCityName();
  }, [getCityName]);
  console.log("000")
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
          {searchResault.length > 0 ? (
            searchResault.map((city, index) => {
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

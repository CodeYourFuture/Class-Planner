import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./UpcomingClass.scss";
import { useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

const UpcomingClass = ({ user, city, component }) => {
  const [Class, setClass] = useState(null);
  const [intakeName, setIntakeName] = useState(null);
  const getUpcomingClass = useCallback(async () => {
    let filtredCourses = null;
    let courses = null;
    let classFound = null;
    await axios.get(`/api/v1/courses/`).then(async (response) => {
      courses = response.data.data.filter((course) => course.cityName === city);
      filtredCourses = courses.map((course) => course._id);
      await axios.get(`/api/v1/classes`).then((res) => {
        classFound = res.data.data
          .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
          .find(
            (Class) =>
              filtredCourses.includes(Class.courseCalendar_Id) &&
              Class.status &&
              dayjs(Class.date) > dayjs(new Date())
          );
        setClass(classFound);
        console.log(classFound);
        setIntakeName(
          courses.find((course) => course._id === classFound.courseCalendar_Id)
            .intakeName
        );
      });
    });
  }, [city]);

  useEffect(() => {
    getUpcomingClass();
  }, [getUpcomingClass]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="upcoming-class-container">
        <div className="upcoming-class-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          <p>{intakeName}</p>
          <i className="fas fa-chevron-right"></i>
          <p>Upcoming Class</p>          
        </div>
        {Class ? (
          <ClassCard
            user={user}
            city={city}
            component={component}
            Class={Class}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default UpcomingClass;

import React, { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import ClassCard from "../../components/ClassCard/ClassCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./UpcomingClass.scss";
import { useCallback } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import { useState } from "react";

const UpcomingClass = ({ user, city, component }) => {
  const [Class, setClass] = useState(null);
  const [intakeName, setIntakeName] = useState(null);
  const history = useHistory();
  const getUpcomingClass = useCallback(async () => {
    let filteredCourses = null;
    let courses = null;
    let classes = null;
    let classFound = null;
    try {
      await axios.get(`/api/v1/courses/`).then(async (response) => {
        if (response.data.data.length > 0) {
          courses = response.data.data.filter(
            (course) => course.cityName === city
          );
          if (courses.length > 0) {
            filteredCourses = courses.map((course) => course._id);
            await axios.get(`/api/v1/classes`).then((res) => {
              if (res.data.data.length > 0) {
                classes = res.data.data;
                classFound = res.data.data
                  .sort((a, b) =>
                    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
                  )
                  .find(
                    (Class) =>
                      filteredCourses.includes(Class.courseCalendar_Id) &&
                      Class.status &&
                      dayjs(Class.date) > dayjs(new Date())
                  );
                let counter = 0;
                if (classFound) {
                  classes
                    .filter(
                      (_Class) =>
                        _Class.courseCalendar_Id ===
                        classFound.courseCalendar_Id
                    )
                    .sort((a, b) =>
                      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
                    )
                    .map((Class) =>
                      Class.status
                        ? (Class.weekNumber = ++counter)
                        : (Class.weekNumber = "-")
                    );
                  setClass(
                    classes.find((_Class) => _Class._id === classFound._id)
                  );
                  setIntakeName(
                    courses.find(
                      (course) => course._id === classFound.courseCalendar_Id
                    ).intakeName
                  );
                }
              }
            });
          } else {
            history.push("/");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [city, history]);
  useEffect(() => {
    getUpcomingClass();
  }, [getUpcomingClass]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="upcoming-class-container">
        <div className="page-title">
          <p>{city}</p> <i className="fas fa-chevron-right"></i>
          {Class ? (
            <React.Fragment>
              <p>{intakeName}</p>
              <i className="fas fa-chevron-right"></i>
            </React.Fragment>
          ) : null}
          <p>Upcoming Class</p>
        </div>
        {Class ? (
          <ClassCard
            user={user}
            city={city}
            component={component}
            Class={Class}
            WeekNumber={Class.weekNumber}
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

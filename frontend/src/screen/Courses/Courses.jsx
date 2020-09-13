import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import dayjs from "dayjs";
import "./Courses.scss";

const NewCoursePage = ({ user, city, component }) => {
  const [courses, setCourses] = useState(null);
  const getCourses = useCallback(async () => {
    let allCourses = await axios.get(`/api/v1/courses`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === "London"
    );
    setCourses(allCourses);
  }, []);
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      {courses ? (
        <div className="courses-container">
          <div className="upcoming-class-title">
            <p>{city}</p> <i className="fas fa-chevron-right"></i>
            <p>Courses</p>
          </div>
          <div className="table-responsive">
          <table className="table" cellSpacing="0" cellPadding="0">
            <thead>
              <tr className="header-tr">
                <th scope="col">Course</th>
                <th scope="col" className="hide-city-col">City</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {courses.map((course, index) => {
                return (
                  <tr key={index}>
                    <td>{course.intakeName}</td>
                    <td className="hide-city-col">{course.cityName}</td>
                    <td>{dayjs(course.startDate).format("DD - MM - YYYY")}</td>
                    <td>{dayjs(course.endDate).format("DD - MM - YYYY")}</td>
                    <td>
                    <button className="btn-edit-course">
                    <i className="fas fa-pencil-alt"></i></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

export default NewCoursePage;

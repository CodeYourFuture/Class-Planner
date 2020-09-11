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
          <table className="Course-table" cellSpacing="0" cellPadding="0">
            <thead>
              <tr className="header-tr">
                <th>Course</th>
                <th>City</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {courses.map((course, index) => {
                return (
                  <tr key={index}>
                    <td>{course.intakeName}</td>
                    <td>{course.cityName}</td>
                    <td>{dayjs(course.startDate).format("DD - MM - YYYY")}</td>
                    <td>{dayjs(course.endDate).format("DD - MM - YYYY")}</td>
                    <td>
                      <i className="fas fa-pencil-alt"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
      <Footer />
    </div>
  );
};

export default NewCoursePage;

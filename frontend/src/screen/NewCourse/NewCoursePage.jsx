import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import NewCourse from "../../components/NewCourse/NewCourse.jsx";
import users from "../../data/users.json";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import "./NewCoursePage.scss";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

const NewCoursePage = ({ user, city, component }) => {
  const [courses, setCourses] = useState(null);
  const getCourses = useCallback(async () => {
    await axios.get(`/api/v1/courses/`).then((response) => {
      setCourses(response.data.data);
    });
  },[]);
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="NewCourseCalendar">
        {user === users[0].id && courses ? (
          <NewCourse
            user={user}
            city={city}
            component={component}
            courses={courses}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewCoursePage;

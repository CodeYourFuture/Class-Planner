import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import NewClassForm from "../../components/NewClassForm/NewClassForm.jsx";
import users from "../../data/users.json";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";

const NewClass = ({ user, city, component }) => {
  const [courses, setCourses] = useState(null);
  const getCourses = useCallback(async () => {
    await axios.get(`/api/v1/courses/`).then((response) => {
      setCourses(
        response.data.data.filter((course) => course.cityName === city)
      );
    });
  }, [city]);
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      {user === users[0].id ? (
        <NewClassForm
          user={user}
          city={city}
          component={component}
          courses={courses}
        />
      ) : null}
      <Footer />
    </div>
  );
};
export default NewClass;

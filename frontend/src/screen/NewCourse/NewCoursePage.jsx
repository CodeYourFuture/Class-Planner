import React from "react";
import { useForm } from "../../hooks/useForm.jsx";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CourseForm from "../../components/CourseForm/CourseForm.jsx";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Loading from "../../components/Loading/Loading.jsx";
import "./NewCoursePage.scss";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const NewCoursePage = ({ user, city, component }) => {
  const [citiesName, setCitiesName] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const history = useHistory();
  dayjs.extend(isBetween);
  const getCourses = async () => {
    const _Courses = await axios.get(`/api/v1/courses/`);
    if (_Courses.data.data) {
      return _Courses.data.data;
    } else {
      return false;
    }
  };
  const getCitiesName = useCallback(async () => {
    let _Courses = await getCourses();
    if (_Courses) {
      let _citiesName = _Courses.map((course) => course.cityName);
      _citiesName = _citiesName.filter((a, b) => _citiesName.indexOf(a) === b);
      setCitiesName(_citiesName);
    } else {
      setCitiesName("Nothing");
    }
  }, []);
  const newCourseCalendar = async (values) => {
    if (
      dayjs(values.startDate).isAfter(dayjs(values.endDate)) ||
      dayjs(values.startDate) === dayjs(values.endDate) ||
      dayjs(values.startDate).diff(dayjs(values.endDate), "month", true) * -1 <
        1
    ) {
      setAlertMessage({
        type: "danger",
        message:
          "End Date must be after Start Date and the Course must be more than 1 month!",
      });
    } else {
      let _Courses = await getCourses();
      if (_Courses) {
        _Courses = _Courses.find(
          (course) =>
            (dayjs(values.startDate).isBetween(
              dayjs(course.startDate),
              dayjs(course.endDate),
              "day"
            ) ||
              dayjs(values.endDate).isBetween(
                dayjs(course.startDate),
                dayjs(course.endDate),
                "day"
              ) ||
              course.intakeName === values.intakeName) &&
            course.cityName === values.cityName
        );
      }

      if (_Courses) {
        setAlertMessage({
          type: "danger",
          message: "Your Data has conflict with other courses!",
        });
      } else {
        await axios
          .post(`/api/v1/courses`, {
            ...values,
          })
          .then((response) => {
            if (response.data.success) {
              setAlertMessage({
                type: "success",
                message: "New Course added successfully !",
              });
              setTimeout(() => {
                if (city) {
                  history.push(`/${user}/${city}/courses/`);
                } else {
                  history.push(`/${user}/cities/`);
                }
              }, 2000);
            } else {
              setAlertMessage({
                type: "danger",
                message: "New Course Calendar was not added !",
              });
            }
          });
      }
    }
  };
  const { entryData, error, onChange, onSubmit } = useForm(newCourseCalendar);
  useEffect(() => {
    if (!city) {
      getCitiesName();
    }
  }, [getCitiesName, city]);

  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="newcourse-container">
        {city || citiesName ? (
          <CourseForm
            city={city}
            component={component}
            citiesName={citiesName}
            alertMessage={alertMessage}
            entryData={entryData}
            error={error}
            _onChange={onChange}
            _onSubmit={onSubmit}
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

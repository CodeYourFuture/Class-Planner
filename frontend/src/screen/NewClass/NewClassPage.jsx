import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { useHistory } from "react-router";
import Header from "../../components/Header/Header.jsx";
import ClassForm from "../../components/ClassForm/ClassForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import axios from "axios";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import "./NewClassPage.scss";

const NewClassPage = ({ user, city, component }) => {
  const [courses, setCourses] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const history = useHistory();
  dayjs.extend(isBetween);

  const getCourses = useCallback(async () => {
    await axios.get(`/api/v1/courses/`).then((response) => {
      if (response.data.data.length > 0) {
        let courseFound = response.data.data.filter(
          (course) => course.cityName === city
        );
        if (courseFound.length > 0) {
          setCourses(courseFound);
        } else {
          history.push(`/nothing`);
        }
      } else {
        history.push(`/nothing`);
      }
    });
  }, [city, history]);
  const getClasses = async () => {
    const allClasses = await axios.get(`/api/v1/classes/`);
    if (allClasses.data.data.length > 0) {
      return allClasses.data.data;
    } else {
      return [];
    }
  };
  const newClass = async (values) => {
    if (
      Date.parse(`01/01/2020 ${values.startTime}:00`) >=
      Date.parse(`01/01/2020 ${values.endTime}`)
    ) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "End Time must be after Start Time!",
      });
    } else if (dayjs(values.date) <= dayjs(new Date())) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "Date is not valid!",
      });
    } else {
      let allClasses = await getClasses();
      let conflictClass = null;
      if (allClasses.length > 0) {
        conflictClass = allClasses.find(
          (Class) =>
            Date.parse(Class.date) === Date.parse(values.date) &&
            Class.courseCalendar_Id === values.courseCalendar_Id
        );
      }
      const outOfDate = courses.find(
        (course) =>
          dayjs(values.date).isBetween(
            dayjs(course.startDate),
            dayjs(course.endDate),
            "day"
          ) && course._id === values.courseCalendar_Id
      );
      if (conflictClass) {
        setSubmit_F(true);
        setAlertMessage({
          type: "danger",
          message: "This Date is Already taken by another Class!",
        });
      } else if (!outOfDate) {
        setSubmit_F(true);
        setAlertMessage({
          type: "danger",
          message: "This Date is out of the course period!",
        });
      } else {
        await axios
          .post(`/api/v1/classes`, {
            ...values,
          })
          .then((response) => {
            if (response.data.success) {
              setAlertMessage({
                type: "success",
                message: "New Class added successfully !",
              });
              setTimeout(() => {
                history.push(`/${user}/${city}/coursecalendar/`);
              }, 2000);
            } else {
              setSubmit_F(true);
              setAlertMessage({
                type: "danger",
                message: "New Course Calendar is not added !",
              });
            }
          });
      }
    }
  };
  const { entryData, error, onChange, onSubmit, setSubmit_F } = useForm(
    newClass
  );
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="newclass-container">
        {courses && (
          <ClassForm
            city={city}
            component={component}
            courses={courses}
            entryData={entryData}
            alertMessage={alertMessage}
            error={error}
            _onChange={onChange}
            _onSubmit={onSubmit}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default NewClassPage;

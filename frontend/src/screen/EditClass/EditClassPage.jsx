import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { useHistory } from "react-router";
import Header from "../../components/Header/Header.jsx";
import ClassForm from "../../components/ClassForm/ClassForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./EditClassPage.scss";

const EditClassPage = ({ user, city, component, id }) => {
  const [courses, setCourses] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const history = useHistory();
  dayjs.extend(isBetween);

  const getClass = useCallback(async () => {
    await axios.get(`/api/v1/classes/`).then((response) => {
      if (response.data.data.length > 0) {
        let classFound = response.data.data.find((Class) => Class._id === id);
        if (classFound) {
          setCurrentClass(classFound);
        } else {
          history.push(`/`);
        }
      } else {
        history.push(`/`);
      }
    });
  }, [id, history]);
  const getCourses = useCallback(async () => {
    await axios.get(`/api/v1/courses/`).then((response) => {
      if (response.data.data.length > 0) {
        let courseFound = response.data.data.filter(
          (course) => course.cityName === city
        );
        if (courseFound) {
          setCourses(courseFound);
        } else {
          history.push(`/`);
        }
      } else {
        history.push(`/`);
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
  const editClass = async (values) => {
    let duplicate = false;
    if (values.status === currentClass.status) {
      if (values.status) {
        if (
          values.courseCalendar_Id === currentClass.courseCalendar_Id &&
          dayjs(currentClass.date).format("MM-DD-YYYY") ===
            dayjs(values.date).format("MM-DD-YYYY") &&
          values.className === currentClass.className &&
          values.startTime === currentClass.startTime &&
          values.endTime === currentClass.endTime &&
          values.syllabusURL === currentClass.syllabusURL &&
          values.scheduleType === currentClass.scheduleType
        ) {
          duplicate = true;
        }
      } else {
        if (
          values.courseCalendar_Id === currentClass.courseCalendar_Id &&
          dayjs(currentClass.date).format("MM-DD-YYYY") ===
            dayjs(values.date).format("MM-DD-YYYY") &&
          values.className === currentClass.className
        ) {
          duplicate = true;
        }
      }
    }
    if (duplicate) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "There is no change to update !",
      });
    } else if (
      Date.parse(`01/01/2020 ${values.startTime}:00`) >=
      Date.parse(`01/01/2020 ${values.endTime}`)
    ) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "End Time must be after Start Time!",
      });
    } else if (
      dayjs(values.date) <= dayjs(new Date()) &&
      dayjs(currentClass.date).format("MM-DD-YYYY") !==
        dayjs(values.date).format("MM-DD-YYYY")
    ) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "Date is not valid!",
      });
    } else {
      let allClasses = await getClasses();
      if (allClasses.length > 0) {
        const conflictClass = allClasses.find(
          (Class) =>
            Date.parse(Class.date) === Date.parse(values.date) &&
            Class.courseCalendar_Id === values.courseCalendar_Id &&
            Class._id !== currentClass._id
        );
        const outOfDate = courses.find(
          (course) =>
            dayjs(values.date).isBetween(
              dayjs(course.startDate),
              dayjs(course.endDate),
              "day",
              "[]"
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
            .put(`/api/v1/classes/${id}`, {
              ...values,
            })
            .then((response) => {
              if (response.data.success) {
                setAlertMessage({
                  type: "success",
                  message: "Class updated successfully !",
                });
                setTimeout(() => {
                  history.push(`/${user}/${city}/coursecalendar/`);
                }, 1000);
              } else {
                setSubmit_F(true);
                setAlertMessage({
                  type: "danger",
                  message: "Class is not updated !",
                });
              }
            });
        }
      }
    }
  };
  const { entryData, error, onChange, onSubmit, setSubmit_F } = useForm(
    editClass
  );
  useEffect(() => {
    if (currentClass) {
      getCourses();
    }
  }, [getCourses, currentClass]);
  useEffect(() => {
    getClass();
  }, [getClass]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="editclass-container">
        {courses && currentClass ? (
          <ClassForm
            city={city}
            component={component}
            courses={courses}
            entryData={entryData}
            alertMessage={alertMessage}
            error={error}
            _onChange={onChange}
            _onSubmit={onSubmit}
            date={currentClass.date}
            courseCalendar_Id={currentClass.courseCalendar_Id}
            status={currentClass.status}
            className={currentClass.className}
            startTime={currentClass.startTime}
            endTime={currentClass.endTime}
            syllabusURL={currentClass.syllabusURL}
            scheduleType={currentClass.scheduleType}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default EditClassPage;

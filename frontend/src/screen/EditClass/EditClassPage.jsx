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
import "./EditClassPage.scss";

const EditClassPage = ({ user, city, component, id }) => {
  const [courses, setCourses] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const history = useHistory();

  const getClass = useCallback(async () => {
    await axios.get(`/api/v1/classes/`).then((response) => {
      if (response.data.data) {
        setCurrentClass(response.data.data.find((Class) => Class._id === id));
      }
    });
  }, [id]);
  const getCourses = useCallback(async () => {
    await axios.get(`/api/v1/courses/`).then((response) => {
      setCourses(
        response.data.data.filter((course) => course.cityName === city)
      );
    });
  }, [city]);
  const getClasses = useCallback(async () => {
    const allClasses = await axios.get(`/api/v1/classes/`);
    if (allClasses.data.data) {
      return allClasses.data.data;
    }
  }, []);
  const editClass = async (values) => { 
    if (
      Date.parse(`01/01/2020 ${values.startTime}:00`) >=
      Date.parse(`01/01/2020 ${values.endTime}`)
    ) {
      setAlertMessage({
        type: "danger",
        message: "End Time must be after Start Time!",
      });
    } else if (dayjs(values.date) <= dayjs(new Date())) {
      setAlertMessage({
        type: "danger",
        message: "Date is not valid!",
      });
    } else {
      let allClasses = await getClasses();
      if (allClasses) {
        const conflictClass = allClasses.find(
          (Class) =>
            Date.parse(Class.date) === Date.parse(values.date) &&
            Class.courseCalendar_Id === values.courseCalendar_Id &&
            Class._id !== currentClass._id
        );
        if (conflictClass) {
          setAlertMessage({
            type: "danger",
            message: "This Date is Already taken by another Class!",
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
                }, 2000);
              } else {
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
  const { entryData, error, onChange, onSubmit } = useForm(editClass);
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

import React, { useCallback } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CourseForm from "../../components/CourseForm/CourseForm.jsx";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./EditCoursePage.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const EditCoursePage = ({ user, city, component, id }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const history = useHistory();
  dayjs.extend(isBetween);
  const getCourses = useCallback(async () => {
    try {
      const _Courses = await axios.get(`/api/v1/courses/`);
      if (_Courses.data.data.length > 0) {
        let courseFound = _Courses.data.data.find(
          (Course) => Course._id === id
        );
        if (courseFound) {
          setCurrentCourse(courseFound);
        } else {
          history.push(`/nothing`);
        }
        return _Courses.data.data;
      } else {
        history.push(`/nothing`);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id, history]);
  const getClasses = async () => {
    let allClasses = await axios.get(`/api/v1/classes/`);
    if (allClasses.data.data.length > 0) {
      allClasses = allClasses.data.data.filter(
        (Class) => Class.courseCalendar_Id === id
      );
      return allClasses;
    } else {
      return [];
    }
  };
  const EditCourse = async (values) => {
    if (
      values.intakeName === currentCourse.intakeName &&
      dayjs(currentCourse.startDate).format("MM-DD-YYYY") ===
        dayjs(values.startDate).format("MM-DD-YYYY") &&
      dayjs(currentCourse.endDate).format("MM-DD-YYYY") ===
        dayjs(values.endDate).format("MM-DD-YYYY")
    ) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message: "Ther is no change to update !",
      });
    } else if (dayjs(values.startDate).isAfter(dayjs(values.endDate))) {
      setSubmit_F(true);
      setAlertMessage({
        type: "danger",
        message:
          "End Date must be after Start Date and the Course must be more than 1 month!",
      });
    } else {
      let _Courses = await getCourses();
      let _Classes = await getClasses();
      if (_Courses.length > 0) {
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
            course.cityName === values.cityName &&
            course._id !== id
        );
      }
      if (_Classes.length > 0) {
        _Classes = _Classes.filter(
          (Class) =>
            !dayjs(Class.date).isBetween(
              dayjs(values.startDate),
              dayjs(values.endDate),
              "day"
            )
        );
      }
      if (_Courses) {
        setSubmit_F(true);
        setAlertMessage({
          type: "danger",
          message: "Your Date has conflict with other courses!",
        });
      } else if (_Classes.length > 0) {
        setSubmit_F(true);
        setAlertMessage({
          type: "danger",
          message:
            "This course has some classes which is out of this date range !",
        });
      } else {
        try {
          await axios
            .put(`/api/v1/courses/${id}`, {
              ...values,
            })
            .then((response) => {
              if (response.data.success) {
                setAlertMessage({
                  type: "success",
                  message: "Course updated successfully !",
                });
                setTimeout(() => {
                  history.push(`/${user}/${city}/courses/`);
                }, 1000);
              } else {
                setSubmit_F(true);
                setAlertMessage({
                  type: "danger",
                  message: "Course not updated !",
                });
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const { entryData, error, onChange, onSubmit, setSubmit_F } = useForm(
    EditCourse
  );
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <div>
      <Header user={user} city={city} component={component} />
      <div className="NewCourseCalendar">
        {currentCourse && (
          <CourseForm
            city={city}
            component={component}
            alertMessage={alertMessage}
            entryData={entryData}
            error={error}
            _onChange={onChange}
            _onSubmit={onSubmit}
            intakeName={currentCourse.intakeName}
            cityName={currentCourse.cityName}
            startDate={currentCourse.startDate}
            endDate={currentCourse.endDate}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditCoursePage;

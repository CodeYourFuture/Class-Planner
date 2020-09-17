import { useState, useRef } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import axios from "axios";
import { useHistory } from "react-router";

export const useFilter = () => {
  const [data, setData] = useState(null);
  const entryData = useRef([]);
  const history = useHistory();
  dayjs.extend(isBetween);

  const filter = async () => {
    try {
      let classes = await get_Classes(entryData.current[1].value);
      if (classes.length > 0) {
        classes = classes.filter(
          (Class) =>
            (dayjs(Class.date).format("M") === entryData.current[2].value ||
              entryData.current[2].value === "All-Months") &&
            (Class.className
              .toLowerCase()
              .indexOf(entryData.current[0].value.toLowerCase()) >= 0 ||
              Class.scheduleType
                .toLowerCase()
                .indexOf(entryData.current[0].value.toLowerCase()) >= 0)
        );
      }
      setData({
        courseId: entryData.current[1].value,
        courses: data.courses,
        classes: classes,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const get_Classes = async (courseId) => {
    try {
      let allClasses = await axios.get(`/api/v1/classes/`);
      let counter = 0;
      if (allClasses.data.data.length > 0) {
        allClasses = allClasses.data.data.filter(
          (Class) => Class.courseCalendar_Id === courseId
        );
        allClasses
          .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
          .map((Class) =>
            Class.status
              ? (Class.weekNumber = ++counter)
              : (Class.weekNumber = "-")
          );
      } else {
        allClasses = [];
      }
      return allClasses;
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async (city) => {
    try {
      let allCourses = await axios.get(`/api/v1/courses/`);
      if (allCourses.data.data.length > 0) {
        allCourses = allCourses.data.data.filter(
          (course) => course.cityName === city
        );
        if (allCourses.length > 0) {
          let currentCourse = allCourses.find((course) =>
            dayjs(new Date()).isBetween(
              dayjs(course.startDate),
              dayjs(course.endDate),
              "day"
            )
          );
          if (!currentCourse) {
            currentCourse = allCourses[allCourses.length - 1];
          }
          let classes = await get_Classes(currentCourse._id);
          if (classes.length > 0) {
            classes = classes.filter(
              (Class) =>
                dayjs(Class.date).format("M") === dayjs(new Date()).format("M")
            );
          }
          setData({
            courseId: currentCourse._id,
            courses: allCourses,
            classes: classes,
          });
        } else {
          history.push("/nothing");
        }
      } else {
        history.push("/nothing");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    entryData,
    getData,
    filter,
    data,
  };
};

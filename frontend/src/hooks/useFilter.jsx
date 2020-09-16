import { useState, useRef } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import axios from "axios";

export const useFilter = () => {
  const [data, setData] = useState(null);
  const entryData = useRef([]);
  dayjs.extend(isBetween);

  const filter = async () => {
    let classes = await get_Classes(entryData.current[2].value);
    classes = classes.filter(
      (Class) =>
        (dayjs(Class.date).format("M") === entryData.current[3].value ||
          entryData.current[3].value === "All-Months") &&
        (Class.className
          .toLowerCase()
          .indexOf(entryData.current[1].value.toLowerCase()) >= 0 ||
          Class.scheduleType
            .toLowerCase()
            .indexOf(entryData.current[1].value.toLowerCase()) >= 0)
    );
    setData({
      courseId: data.courseId,
      courses: data.courses,
      classes: classes,
    });
  };
  const get_Classes = async (courseId) => {
    let allClasses = await axios.get(`/api/v1/classes/`);
    let counter = 0;
    allClasses = allClasses.data.data.filter(
      (Class) => Class.courseCalendar_Id === courseId
    );
    allClasses
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
      .map((Class) =>
        Class.status ? (Class.weekNumber = ++counter) : (Class.weekNumber = "-")
      );
    allClasses = JSON.parse(JSON.stringify(allClasses));

    if (allClasses.length > 0) {
      return allClasses;
    } else {
      return [];
    }
  };

  const getData = async (city) => {
    let allCourses = await axios.get(`/api/v1/courses/`);
    allCourses = allCourses.data.data.filter(
      (course) => course.cityName === city
    );
    let currentCourse = allCourses.find((course) =>
      dayjs(new Date()).isBetween(
        dayjs(course.startDate),
        dayjs(course.endDate),
        "day"
      )
    );
    let classes = await get_Classes(
      currentCourse._id || allCourses[allCourses.length - 1].id
    );
    classes = classes.filter(
      (Class) => dayjs(Class.date).format("M") === dayjs(new Date()).format("M")
    );
    setData({
      courseId: currentCourse._id || allCourses[allCourses.length - 1].id,
      courses: allCourses,
      classes: classes,
    });
  };

  return {
    entryData,
    getData,
    filter,
    data,
  };
};

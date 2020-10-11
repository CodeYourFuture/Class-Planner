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

  const search = async () => {
    try {
      if (data.classes.length > 0) {
        let classes = data.classes.filter(
          (Class) =>
            Class.className
              .toLowerCase()
              .indexOf(entryData.current[0].value.toLowerCase()) >= 0 ||
            Class.scheduleType
              .toLowerCase()
              .indexOf(entryData.current[0].value.toLowerCase()) >= 0
        );
        setData({
          cities: data.cities,
          filteredClasses: classes,
          classes: data.classes,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const filter = async () => {
    try {
      let allCourses = await axios.get(`/api/v1/courses/`);
      if (allCourses.data.data.length > 0) {
        allCourses = allCourses.data.data.filter(
          (course) => course.cityName === entryData.current[1].value
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
              (Class) => dayjs(Class.date) > dayjs(new Date())
            );
          }
          setData({
            cities: data.cities,
            filteredClasses:
              classes.length > 0
                ? classes.filter(
                    (Class) =>
                      Class.className
                        .toLowerCase()
                        .indexOf(entryData.current[0].value.toLowerCase()) >=
                        0 ||
                      Class.scheduleType
                        .toLowerCase()
                        .indexOf(entryData.current[0].value.toLowerCase()) >= 0
                  )
                : [],
            classes: classes,
          });
        }
      }
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
        let cities = allCourses.data.data.map((course) => course.cityName);
        cities = cities.filter((a, b) => cities.indexOf(a) === b);
        allCourses = allCourses.data.data.filter(
          (course) => course.cityName === cities[0]
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
              (Class) => dayjs(Class.date) > dayjs(new Date())
            );
          }
          setData({
            cities: cities,
            filteredClasses: classes,
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
    search,
    data,
  };
};

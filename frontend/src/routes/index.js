import React from "react";
import Home from "../screen/Home/Home.jsx";
import UpcomingClass from "../screen/UpcomingClass/UpcomingClass.jsx";
import NewClass from "../screen/NewClass/NewClass.jsx";
import NewBooking from "../screen/NewBooking/NewBooking.jsx";
import CourseCalendar from "../screen/CourseCalendar/CourseCalendar.jsx";
import ClassVolunteers from "../screen/ClassVolunteers/ClassVolunteers.jsx";
import NewCourseCalendar from "../screen/NewCourseCalendar/NewCourseCalendar.jsx";
import Cities from "../screen/Cities/Cities.jsx";
import { BrowserRouter as Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/coursecalendar/" component={CourseCalendar} />
      <Route exact path="/newcoursecalendar/" component={NewCourseCalendar} />
      <Route exact path="/classvolunteers/" component={ClassVolunteers} />
      <Route exact path="/upcomingclass/" component={UpcomingClass} />
      <Route exact path="/newclass/" component={NewClass} />
      <Route exact path="/newbooking/" component={NewBooking} />
      <Route exact path="/editclass/" component={NewClass} />
      <Route exact path="/cities/" component={Cities} />
    </Switch>
  );
};

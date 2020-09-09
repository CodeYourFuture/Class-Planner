import React from "react";
import Home from "../screen/Home/Home.jsx";
import UpcomingClass from "../screen/UpcomingClass/UpcomingClass.jsx";
import NewClass from "../screen/NewClass/NewClass.jsx";
import NewBooking from "../screen/NewBooking/NewBooking.jsx";
import CourseCalendarPage from "../screen/CourseCalendar/CourseCalendarPage.jsx";
import ClassVolunteers from "../screen/ClassVolunteers/ClassVolunteers.jsx";
import NewCoursePage from "../screen/NewCourse/NewCoursePage.jsx";
import Courses from "../screen/Courses/Courses.jsx";
import Cities from "../screen/Cities/Cities.jsx";
import { BrowserRouter as Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/coursecalendar/" component={CourseCalendarPage} />
      <Route exact path="/newcoursecalendar/" component={NewCoursePage} />
      <Route exact path="/classvolunteers/" component={ClassVolunteers} />
      <Route exact path="/upcomingclass/" component={UpcomingClass} />
      <Route exact path="/newclass/" component={NewClass} />
      <Route exact path="/newbooking/" component={NewBooking} />
      <Route exact path="/editclass/" component={NewClass} />
      <Route exact path="/cities/" component={Cities} />
      <Route exact path="/courses/" component={Courses} />
    </Switch>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import users from "../../data/users.json";
import "./Header.scss";

const Header = ({ user, city, component }) => {
  return (
    <div className="header">
      <div className="header-logo-container">
        <Link className="home-link header-logo" to="/">
          <div>
            <p> &lt;</p>
            <p>CODE</p>
            <p>&gt;&nbsp;</p>
            <br />
            <p>YOUR</p>
          </div>
          <p>FUTURE</p>
        </Link>
      </div>
      <div className="header-down-container">
        <nav className="header-nav-container">
          {component === "home" ? (
            <div className="home-app-title">
              <img src="../files/calendar.svg" alt="Calendar"></img>
              <p>Class Planner</p>
            </div>
          ) : component === "cities" ||
            (component === "newcourse" && user === users[0].id && !city) ? (
            <React.Fragment>
              <Link
                className={
                  component === "cities"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={`/${user}/cities/`}
              >
                <i className="fas fa-map-marked-alt"></i>
                <p>Cities</p>
              </Link>
              {user === users[0].id ? (
                <Link
                  className={
                    component === "newcourse"
                      ? "header-nav header-selected"
                      : "header-nav"
                  }
                  to={`/${user}/newcourse/`}
                >
                  <i className="far fa-calendar-alt"></i>
                  <p>New Course</p>
                </Link>
              ) : null}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className={
                  component === "cities"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={`/${user}/cities`}
              >
                <i className="fas fa-map-marked-alt"></i>
                <p>Cities</p>
              </Link>
              <Link
                className={
                  component === "coursecalendar"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={`/${user}/${city}/coursecalendar/`}
              >
                <i className="far fa-calendar-alt"></i>
                <p>Course Calendar</p>
              </Link>
              <Link
                className={
                  component === "upcomingclass"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={`/${user}/${city}/upcomingclass/`}
              >
                <i className="far fa-calendar-check"></i>
                <p>Upcoming Class</p>
              </Link>
              {user === users[0].id ? (
                <React.Fragment>
                  <Link
                    className={
                      component === "courses"
                        ? "header-nav header-selected"
                        : "header-nav"
                    }
                    to={`/${user}/${city}/courses/`}
                  >
                    <i className="far fa-list-alt"></i>
                    <p>Courses</p>
                  </Link>
                  <Link
                    className={
                      component === "newcourse"
                        ? "header-nav header-selected"
                        : "header-nav"
                    }
                    to={`/${user}/${city}/newcourse/`}
                  >
                    <i className="far fa-calendar-plus"></i>
                    <p>New Course</p>
                  </Link>
                  <Link
                    className={
                      component === "newclass"
                        ? "header-nav header-selected"
                        : "header-nav"
                    }
                    to={`/${user}/${city}/newclass/`}
                  >
                    <i className="fas fa-chalkboard-teacher"></i>
                    <p>New Class</p>
                  </Link>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Header;

import React from "react";
import { Link } from "react-router-dom";
import users from "../../data/users.json";

import "./BurgerMenu.scss";

const BurgerMenu = ({ user, city, component }) => {
  return (
    <nav role="navigation">
      <div id="burgerToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        {/* ---------- Menu Begin  ------- */}
        <ul id="menu">
          {component === "home" ? (
            <></>
          ) : component === "cities" ||
            (component === "newcourse" && user === users[0].id && !city) ? (
            <React.Fragment>
              <Link
                className={component === "cities" && "menu-item-selected"}
                to={`/${user}/cities/`}
              >
                <li>
                  <i className="fas fa-map-marked-alt"></i>
                  <p>Cities</p>
                </li>
              </Link>
              {user === users[0].id ? (
                <Link
                  className={component === "newcourse" && " menu-item-selected"}
                  to={`/${user}/newcourse/`}
                >
                  <li>
                    <i className="far fa-calendar-alt"></i>
                    <p>New Course</p>
                  </li>
                </Link>
              ) : null}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className={component === "cities" && "menu-item-selected"}
                to={`/${user}/cities`}
              >
                <li>
                  <i className="fas fa-map-marked-alt"></i>
                  <p>Cities</p>
                </li>
              </Link>
              <Link
                className={
                  component === "coursecalendar" && "menu-item-selected"
                }
                to={`/${user}/${city}/coursecalendar/`}
              >
                <li>
                  <i className="far fa-calendar-alt"></i>
                  <p>Course Calendar</p>
                </li>
              </Link>
              <Link
                className={
                  component === "upcomingclass" && "menu-item-selected"
                }
                to={`/${user}/${city}/upcomingclass/`}
              >
                <li>
                  <i className="far fa-calendar-check"></i>
                  <p>Upcoming Class</p>
                </li>
              </Link>
              {user === users[0].id ? (
                <React.Fragment>
                  <Link
                    className={component === "courses" && "menu-item-selected"}
                    to={`/${user}/${city}/courses/`}
                  >
                    <li>
                      <i className="far fa-list-alt"></i>
                      <p>Courses</p>
                    </li>
                  </Link>
                  <Link
                    className={
                      component === "newcourse" && "menu-item-selectedd"
                    }
                    to={`/${user}/${city}/newcourse/`}
                  >
                    <li>
                      <i className="far fa-calendar-plus"></i>
                      <p>New Course</p>
                    </li>
                  </Link>
                  <Link
                    className={component === "newclass" && "menu-item-selected"}
                    to={`/${user}/${city}/newclass/`}
                  >
                    <li>
                      <i className="fas fa-chalkboard-teacher"></i>
                      <p>New Class</p>
                    </li>
                  </Link>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </ul>

        {/* ---------------- menu-end --------------- */}
      </div>
    </nav>
  );
};

export default BurgerMenu;

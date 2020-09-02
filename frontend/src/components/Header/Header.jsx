import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Send_PageData } from "../../redux/actions";
import "./Header.scss";

const mapStateToProps = (state) => {
  return { pageData: state.PageReducer.pageData };
};

const Header = ({ pageData, Send_PageData }) => {
  const passData = (title) => {
    Send_PageData(pageData.user, title, pageData.city);
  };
  return (
    <div className="header">
      <div className="header-firtchild">
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
      <div className="header-secondchild">
        {pageData ? (
          pageData.title === "Home" ? (
            <div className="home-titel">
              <img src="../files/calendar.svg" alt="Calendar"></img>
              <p>Class Planner</p>
            </div>
          ) : ["Cities", "New Course Calendar"].includes(pageData.title) ? (
            <React.Fragment>
            <Link
            className={
              pageData.title === "Cities"
                ? "header-nav header-selected"
                : "header-nav"
            }
            to={"/cities/"}
            onClick={() => passData("Cities")}
          >
            <i className="fas fa-map-marked-alt"></i>
            <p>Cities</p>
          </Link>
            <Link
            className={
              pageData.title === "New Course Calendar"
                ? "header-nav header-selected"
                : "header-nav"
            }
            to={"/newcoursecalendar/"}
            onClick={() => passData("New Course Calendar")}
          >
            <i className="far fa-calendar-alt"></i>
            <p>New Course Calendar</p>
          </Link>
          </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                className={
                  pageData.title === "Course Calendar"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={"/coursecalendar/"}
                onClick={() => passData("Course Calendar")}
              >
                <i className="far fa-calendar-alt"></i>
                <p>Course Calendar</p>
              </Link>
              <Link
                className={
                  pageData.title === "Upcoming Class"
                    ? "header-nav header-selected"
                    : "header-nav"
                }
                to={"/upcomingclass/"}
                onClick={() => passData("Upcoming Class")}
              >
                <i className="far fa-calendar-check"></i>
                <p>Upcoming Class</p>
              </Link>
              {pageData.user === "admin" ? (
                <Link
                  className={
                    pageData.title === "New Class"
                      ? "header-nav header-selected"
                      : "header-nav"
                  }
                  to={"/newclass/"}
                  onClick={() => passData("New Class")}
                >
                  <i className="far fa-calendar-plus"></i>
                  <p>New Class</p>
                </Link>
              ) : null}
            </React.Fragment>
          )
        ) : null}
      </div>
    </div>
  );
};
export default connect(mapStateToProps, { Send_PageData })(Header);

import React, { useState, useEffect, useCallback } from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link } from "react-router-dom";
import NewBookingForm from "../NewBookingForm/NewBookingForm.jsx";
import ClassVolunteersList from "../ClassVolunteersList/ClassVolunteersList.jsx";
import axios from "axios";
import Alert from "../Alert/Alarm.jsx";
import Loading from "../Loading/Loading.jsx";
import users from "../../data/users.json";
import "./ClassCard.scss";
import CancelClass from "./CancelClass";

const ClassCard = ({ user, city, component, Class, WeekNumber }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [cancelStatus, setCancelStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("message");

  const closeConfirmationAlert = () => {
    setCancelStatus(false);
  };

  const showAlert = (type, message) => {
    setAlertStatus(true);
    setAlertType(type);
    setAlertMessage(message);
  };

  const get_booking = useCallback(async () => {
    await axios.get(`/api/v1/bookings/${Class._id}`).then((response) => {
      setCurrentBooking(response.data.data);
    });
  }, [Class]);

  useEffect(() => {
    get_booking();
  }, [get_booking]);

  return (
    <React.Fragment>
      {cancelStatus && (
        <CancelClass
          currentClass={Class}
          closeHandler={closeConfirmationAlert}
          showAlert={showAlert}
        />
      )}
      {alertStatus && <Alert type={alertType}> {alertMessage} </Alert>}
      {!Class ? (
        <Loading />
      ) : (
        <div
          className={
            component === "coursecalendar"
              ? "classcard-body coursecalendar-class-size"
              : "classcard-body"
          }
        >
          <div className="classcard-main">
            <div className="classcard-border">
              <div className="classcard-container">
                <div className="classcard-date-container">
                  <div className="classcard-date">
                    <p>{new Date(Class.date).getDate().toString()}</p>
                    <p>
                      {MonthNames[new Date(Class.date).getMonth().toString()]}
                    </p>
                  </div>
                  {isNaN(WeekNumber) === false ? (
                    <div
                      className={
                        Class.status
                          ? "weeknumber-container-sm"
                          : "weeknumber-container-sm holiday-week"
                      }
                    >
                      <p> Week {WeekNumber}</p>
                    </div>
                  ) : null}
                </div>
                <div className="classcard-info">
                  <div className="classcard-top">
                    <div>
                      <p className="classcard-title">{Class.className}</p>
                      <p>{Class.scheduleType}</p>
                      <p>{Class.startTime + " - " + Class.endTime}</p>
                    </div>
                    {users.map((user) => user.id).includes(user) &&
                      Class.status && (
                        <div>
                          <a
                            href={Class.syllabusURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="classcard-syllabus">
                              <p className="classcard-text-ctl">Syllabus</p>
                              <i className="fas fa-book-open "></i>
                            </div>
                          </a>
                        </div>
                      )}
                  </div>
                  <div className="classcard-bottom">
                    {[users[0].id, users[1].id,users[2].id].includes(user) && Class.status && (
                      <Link
                        className="classcard-edit-Link"
                        onClick={(e) => {
                          if (currentBooking && currentBooking.length === 0) {
                            e.preventDefault();
                          }
                        }}
                        to={`/${user}/${city}/attendedvolunteers/${Class._id}/${WeekNumber}`}
                      >
                        <p>
                          {currentBooking && currentBooking.length} volunteers
                          signed up
                        </p>
                      </Link>
                    )}
                    {component !== "newbooking" && (
                      <div>
                        {user === users[0].id && (
                          <React.Fragment>
                            <button
                              onClick={() => {
                                setCancelStatus(true);
                              }}
                              className="classcard-cancel-bottom"
                            >
                              <span className="classcard-text-ctl">Cancel</span>
                              <i className="fa fa-times classcard-icon-ctl"></i>
                            </button>
                            <Link
                              className="classcard-edit-bottom"
                              to={`/${user}/${city}/editclass/${Class._id}`}
                            >
                              <span className="classcard-text-ctl">Edit</span>
                              <i className="fa fa-pencil classcard-icon-ctl"></i>
                            </Link>
                          </React.Fragment>
                        )}
                        {[users[0].id, users[1].id].includes(user) &&
                          Class.status && (
                            <Link
                              className="classcard-attend-bottom"
                              to={`/${user}/${city}/newbooking/${Class._id}/${WeekNumber}`}
                            >
                              <span className="classcard-text-ctl">Attend</span>
                              <i className="fa fa-check-square-o classcard-icon-ctl"></i>
                            </Link>
                          )}
                      </div>
                    )}
                  </div>
                </div>
                {WeekNumber && (
                  <div
                    className={
                      Class.status
                        ? "weeknumber-container"
                        : "weeknumber-container holiday-week"
                    }
                  >
                    <p>Week</p>
                    <p>{WeekNumber}</p>
                  </div>
                )}
              </div>
              {!["upcomingclass", "coursecalendar"].includes(component) && (
                <hr className="classcard-separator"></hr>
              )}
              {component === "newbooking" && (
                <NewBookingForm
                  Class={Class}
                  user={user}
                  city={city}
                  WeekNumber={WeekNumber}
                />
              )}
              {component === "attendedvolunteers" && (
                <ClassVolunteersList
                  user={user}
                  city={city}
                  component={component}
                  bookings={currentBooking}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ClassCard;

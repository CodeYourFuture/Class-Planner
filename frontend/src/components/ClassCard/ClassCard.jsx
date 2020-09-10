import React, { useState, useEffect, useCallback } from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Get_BookingByClassId } from "../../redux/actions/BookingAction";
import { Send_PageData } from "../../redux/actions/PageAction";
import { set_CurrentClass } from "../../redux/actions/ClassAction";
import NewBookingForm from "../NewBookingForm/NewBookingForm.jsx";
import ClassVolunteersList from "../ClassVolunteersList/ClassVolunteersList.jsx";
import axios from "axios";
import Alert from "../Alert/Alarm.jsx";
import Loading from "../Loading/Loading.jsx";
import "./ClassCard.scss";
import CancelClass from "./CancelClass";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
    CurrentClass: state.ClassReducer.currentClass,
  };
};

const ClassCard = ({
  Class,
  CurrentClass,
  set_CurrentClass,
  WeekNumber,
  pageData,
  Send_PageData,
}) => {
  const [currentClass, setCurrentClass] = useState(null);
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
    if (currentClass) {
      const bookings = await axios.get(
        `/api/v1/class/bookings/${currentClass._id}`
      );
      setCurrentBooking(bookings.data.data);
    }
  }, [currentClass]);

  useEffect(() => {
    setCurrentClass(Class || CurrentClass);
    get_booking();
  }, [setCurrentClass, Class, CurrentClass, get_booking]);

  return (
    <React.Fragment>
      {cancelStatus && (
        <CancelClass
          currentClass={CurrentClass}
          closeHandler={closeConfirmationAlert}
          showAlert={showAlert}
        />
      )}
      {alertStatus && <Alert type={alertType}> {alertMessage} </Alert>}
      {!currentClass ? (
        <Loading />
      ) : (
        <div
          className={
            pageData.title === "Course Calendar"
              ? "classcard-body coursecalendar-class-size"
              : "classcard-body"
          }
        >
          <div className="classcard-main">
            <div className="classcard-border">
              <div className="classcard-container">
                <div className="classcard-date-container">
                  <div className="classcard-date">
                    <p>{new Date(currentClass.date).getDate().toString()}</p>
                    <p>
                      {
                        MonthNames[
                          new Date(currentClass.date).getMonth().toString()
                        ]
                      }
                    </p>
                  </div>
                  {isNaN(WeekNumber) === false ? (
                    <div
                      className={
                        currentClass.status
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
                      <p className="classcard-title">
                        {currentClass.className}
                      </p>
                      <p>{currentClass.scheduleType}</p>
                      <p>
                        {currentClass.startTime + " - " + currentClass.endTime}
                      </p>
                    </div>
                    {["admin", "volunteer", "student"].includes(
                      pageData.user
                    ) &&
                      currentClass.status && (
                        <div>
                          <a
                            href={currentClass.syllabusURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="classcard-syllabus">
                              <p>Syllabus</p>
                              <i className="fas fa-book-open"></i>
                            </div>
                          </a>
                        </div>
                      )}
                  </div>
                  <div className="classcard-bottom">
                    {["admin", "volunteer"].includes(pageData.user) &&
                      currentClass.status && (
                        <Link
                          onClick={() => {
                            set_CurrentClass(currentClass);
                            Send_PageData(
                              pageData.user,
                              "Atended Volunteers",
                              pageData.city
                            );
                          }}
                          className="classcard-edit-Link"
                          to="/classvolunteers/"
                        >
                          <p>
                            {currentBooking && currentBooking.length} volunteers
                            signed up
                          </p>
                        </Link>
                      )}
                    {pageData.title !== "New Booking" && (
                      <div>
                        {pageData.user === "admin" && (
                          <button
                            onClick={() => {
                              set_CurrentClass(currentClass);
                              setCancelStatus(true);
                            }}
                            className="classcard-cancel-bottom"
                          >
                            Cancel
                          </button>
                        )}
                        {pageData.user === "admin" && (
                          <Link
                            onClick={() => {
                              set_CurrentClass(currentClass);
                              Send_PageData(
                                pageData.user,
                                "Edit Class",
                                pageData.city
                              );
                            }}
                            className="classcard-edit-bottom"
                            to="/editclass/"
                          >
                            Edit
                          </Link>
                        )}
                        {["admin", "volunteer"].includes(pageData.user) &&
                          currentClass.status && (
                            <Link
                              onClick={() => {
                                set_CurrentClass(currentClass);
                                Send_PageData(
                                  pageData.user,
                                  "New Booking",
                                  pageData.city
                                );
                              }}
                              className="classcard-attend-bottom"
                              to="/newbooking/"
                            >
                              Attend
                            </Link>
                          )}
                      </div>
                    )}
                  </div>
                </div>
                {WeekNumber && (
                  <div
                    className={
                      currentClass.status
                        ? "weeknumber-container"
                        : "weeknumber-container holiday-week"
                    }
                  >
                    <p>Week</p>
                    <p>{WeekNumber}</p>
                  </div>
                )}
              </div>
              {!["Upcoming Class", "Course Calendar"].includes(
                pageData.title
              ) && <hr className="classcard-separator"></hr>}
              {pageData.title === "New Booking" && <NewBookingForm />}
              {pageData.title === "Atended Volunteers" && (
                <ClassVolunteersList bookings={currentBooking} />
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, {
  Get_BookingByClassId,
  set_CurrentClass,
  Send_PageData,
})(ClassCard);

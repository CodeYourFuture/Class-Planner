import React, { useState, useEffect } from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Get_BookingByClassId } from "../../redux/actions/BookingAction";
import { Send_PageData } from "../../redux/actions/PageAction";
import { set_CurrentClass } from "../../redux/actions/ClassAction";
import NewBookingForm from "../NewBookingForm/NewBookingForm.jsx";
import ClassVolunteersList from "../ClassVolunteersList/ClassVolunteersList.jsx";
import Loading from "../Loading/Loading.jsx";
import "./ClassCard.scss";

const mapStateToProps = (state) => {
  return {
    bookings: state.BookingReducer.bookings,
    pageData: state.PageReducer.pageData,
    CurrentClass: state.ClassReducer.currentClass,
  };
};

const ClassCard = ({
  Child,
  Class,
  CurrentClass,
  set_CurrentClass,
  bookings,
  WeekNumber,
  pageData,
  Get_BookingByClassId,
  Send_PageData,
}) => {
  const [currentClass, setCurrentClass] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    setCurrentClass(Class || CurrentClass);
  }, [setCurrentClass, Class, CurrentClass]);

  useEffect(() => {
    if (currentClass) {
      Get_BookingByClassId(currentClass._id);
    }
  }, [Get_BookingByClassId, currentClass]);

  useEffect(() => {
    if (bookings) {
      setCurrentBooking(JSON.parse(JSON.stringify(bookings)));
    }
  }, [bookings]);

  return (
    <React.Fragment>
      {!currentClass ? (
        <Loading />
      ) : (
        <div className="classcard-body">
          <div className="classcard-main">
            <div className="classcard-border">
              <div className="classcard-container">
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
                  </div>
                  <div className="classcard-bottom">
                    {(pageData.user === "admin" ||
                      pageData.user === "volunteer") && (
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
                          <Link
                            onClick={() => {
                              set_CurrentClass(currentClass);
                              Send_PageData(
                                pageData.user,
                                "Edit Booking",
                                pageData.city
                              );
                            }}
                            className="classcard-edit-bottom"
                            to="/newbooking/"
                          >
                            Edit
                          </Link>
                        )}
                        {["admin", "volunteer"].includes(pageData.user) && (
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
                  <div className="weeknumber-container">
                    <p>Week</p>
                    <p>{WeekNumber}</p>
                  </div>
                )}
              </div>
              {pageData.title !== "Upcoming Class" && (
                <hr className="classcard-separator"></hr>
              )}
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

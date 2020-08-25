import React, { useState, useEffect } from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Get_BookingByClassId } from "../../redux/actions/BookingAction";
import NewBookingForm from "../NewBookingForm/NewBookingForm.jsx";
import ClassVolunteersList from "../ClassVolunteersList/ClassVolunteersList.jsx";
import Loading from "../Loading/Loading.jsx";
import "./ClassCard.scss";

const mapStateToProps = (state) => {
  return { bookings: state.BookingReducer.bookings };
};

const ClassCard = ({
  Title,
  Child,
  Class,
  WeekNumber,
  param,
  bookings,
  Get_BookingByClassId,
}) => {
  const [currentClass, setCurrentClass] = useState(Class);
  const location = useLocation();
  useEffect(() => {
    Get_BookingByClassId(Class ? Class._id : location.Class._id);
    setCurrentClass(() => (Class ? Class : location.Class));
  }, [Class, location.Class, Get_BookingByClassId]);

  return (
    <React.Fragment>
      {!currentClass ? (
        <Loading />
      ) : (
        <div className="classcard-body">
          <div className="classcard-main">
            {Title !== "" && <p>{Title}</p>}
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
                    {(param.user === "admin" || param.user === "volunteer") && (
                      <Link
                        className="classcard-edit-Link"
                        to={
                          param.user === "admin"
                            ? {
                                pathname: "/classvolunteers/admin",
                                Class: currentClass,
                              }
                            : {
                                pathname: "/classvolunteers/volunteer",
                                Class: currentClass,
                              }
                        }
                      >
                        <p>
                          {bookings && bookings.length} volunteers signed up
                        </p>
                      </Link>
                    )}
                    {Child === null && (
                      <div>
                        {param.user === "admin" && (
                          <Link
                            className="classcard-edit-bottom"
                            to={{
                              pathname: "/newbooking/admin",
                              Class: currentClass,
                            }}
                          >
                            Edit
                          </Link>
                        )}
                        {(param.user === "admin" ||
                          param.user === "volunteer") && (
                          <Link
                            className="classcard-attend-bottom"
                            to={
                              param.user === "admin"
                                ? {
                                    pathname: "/newbooking/admin",
                                    Class: currentClass,
                                  }
                                : {
                                    pathname: "/newbooking/volunteer",
                                    Class: currentClass,
                                  }
                            }
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
              {Child !== null && <hr className="classcard-separator"></hr>}
              {Child === "newBooking" && (
                <NewBookingForm Class={currentClass} />
              )}
              {Child === "volunteersList" && (
                <ClassVolunteersList bookings={bookings} />
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, { Get_BookingByClassId })(ClassCard);

import React from "react";
import { MonthNames } from "../../utils/MonthNames";
import { Link } from "react-router-dom";
import NewBookingForm from "../NewBookingForm";
import dayjs from "dayjs";
import "./ClassCard.scss";

const ClassCard = ({ Title, Child, Classes }) => {
  return (
    <React.Fragment>
      {Classes.data && Classes.data.length > 0
        ? [
            Classes.data
              .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
              .find(
                (Class) => Class.status && dayjs(Class.date) > dayjs(new Date())
              ),
          ].map((Class, index) => (
            <div className="classcard-body" key={index}>
              <div className="classcard-main">
                {Title !== "" && <p>{Title}</p>}
                <div className="classcard-border">
                  <div className="classcard-container">
                    <div className="classcard-date">
                      <p>{new Date(Class.date).getDate().toString()}</p>
                      <p>
                        {MonthNames[new Date(Class.date).getMonth().toString()]}
                      </p>
                    </div>
                    <div className="classcard-info">
                      <div className="classcard-top">
                        <div>
                          <p className="classcard-title">{Class.className}</p>
                          <p>{Class.scheduleType}</p>
                          <p>{Class.time}</p>
                        </div>
                        <div>
                          <a
                            href={Class.syllabusUrl}
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
                        <p>0 voluntieers signed up</p>
                        {Child == null && <Link to="/newbooking/">Attend</Link>}
                      </div>
                    </div>
                  </div>
                  {Child != null && <hr className="booking-separator"></hr>}
                  {Child === "newbooking" && <NewBookingForm></NewBookingForm>}
                  {Child === "volunteerslist" && (
                    <h3>list of volunteers appear here</h3>
                  )}
                </div>
              </div>
            </div>
          ))
        : null}
    </React.Fragment>
  );
};

export default ClassCard;

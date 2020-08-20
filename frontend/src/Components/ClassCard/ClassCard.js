import React from "react";
import { MonthNames } from "../../Utils/MonthNames";
import dayjs from "dayjs";
import "./ClassCard.scss";

const ClassCard = ({ Classes }) => {
  return (
    <div>
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
                <p>Next upcoming Class:</p>
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
                        <a>Book</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ClassCard;

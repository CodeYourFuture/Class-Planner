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
            <div className="ClassCard_Body" key={index}>
              <div className="ClassCard_Main">
                <p>Next upcoming Class:</p>
                <div className="ClassCard_Class">
                  <div className="ClassCard_Date">
                    <div>
                      <p>{new Date(Class.date).getDate().toString()}</p>
                      <p>
                        {MonthNames[new Date(Class.date).getMonth().toString()]}
                      </p>
                    </div>
                  </div>
                  <div className="ClassCard_info">
                    <div className="ClassCard_info_1">
                      <div>
                        <p className="ClassCard_ClassName">{Class.className}</p>
                        <p>{Class.scheduleType}</p>
                        <p>{Class.time}</p>
                      </div>
                      <div>
                        <a href={Class.syllabusUrl} target="_blank" rel="noopener noreferrer">
                          <div className="ClassCard_Syllabus">
                            <p className="ClassCard_Syllabus_P">Syllabus</p>
                            <i className="fas fa-book-open"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="ClassCard_info_2">
                      <p>0 voluntieers signed up</p>
                      <p>Book</p>
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

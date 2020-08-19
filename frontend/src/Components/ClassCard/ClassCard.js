import React from "react";
import { MonthNames } from "../../Utils/MonthNames";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./ClassCard.scss";

const ClassCard = ({ Title, Classes }) => {
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
                {Title != "" && <p>{Title}</p>}
                <div className="ClassCard_Container">
                  <div className="ClassCard_Date">
                    <p>{new Date(Class.date).getDate().toString()}</p>
                    <p>
                      {MonthNames[new Date(Class.date).getMonth().toString()]}
                    </p>
                  </div>
                  <div className="ClassCard_info">
                    <div className="ClassCard_top">
                      <div>
                        <p className="ClassCard_ClassName">{Class.className}</p>
                        <p>{Class.scheduleType}</p>
                        <p>{Class.time}</p>
                      </div>
                      <div>
                        <a
                          href={Class.syllabusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="ClassCard_Syllabus">
                            <p>Syllabus</p>
                            <i className="fas fa-book-open"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="ClassCard_bottom">
                      <p>0 voluntieers signed up</p>
                      <Link to="/newbooking/">Attend</Link>
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

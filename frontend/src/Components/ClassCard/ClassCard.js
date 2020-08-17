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
              .sort((a, b) =>
                dayjs(a.bookingDate).isAfter(dayjs(b.bookingDate)) ? 1 : -1
              )
              .find(
                (Class) =>
                  Class.status && dayjs(Class.bookingDate) > dayjs(new Date())
              ),
          ].map((Class) => (
            <div className="ClassCard_Body">
              <div className="ClassCard_Main">
                <p>Next upcoming Class:</p>
                <div className="ClassCard_Class">
                  <div className="ClassCard_Date">
                    <div>
                      <p>{new Date(Class.bookingDate).getDate().toString()}</p>
                      <p>
                        {
                          MonthNames[
                            new Date(Class.bookingDate).getMonth().toString()
                          ]
                        }
                      </p>
                    </div>
                  </div>
                  <div className="ClassCard_info">
                    <div className="ClassCard_info_1">
                      <div>
                        <p>{Class.className}</p>
                        <p>{Class.schedule}</p>
                        <p>Education Lead Class</p>
                      </div>
                      <div>
                        <p>Syllabus</p>
                        <i className="fas fa-book-open"></i>
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

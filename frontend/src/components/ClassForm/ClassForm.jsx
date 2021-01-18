import React, { useState } from "react";
import Alert from "../../components/Alert/Alarm.jsx";
import dayjs from "dayjs";
import "./ClassForm.scss";
import { useEffect } from "react";

const NewClassForm = ({
  entryData,
  city,
  component,
  courses,
  alertMessage,
  error,
  _onChange,
  _onSubmit,
  date,
  courseCalendar_Id,
  status,
  className,
  startTime,
  endTime,
  agendaURL,
  syllabusURL,
  scheduleType,
}) => {
  const [weekState, setWeekState] = useState(null);
  useEffect(() => {
    if (typeof status === "undefined") {
      setWeekState(true);
    } else {
      if (status) {
        setWeekState(true);
      } else {
        setWeekState(false);
      }
    }
  }, [status]);
  return (
    <div className="new-class-container">
      <div className="page-title">
        <p>{city}</p>
        <i className="fas fa-chevron-right"></i>
        <p>{component === "newclass" ? "New Class" : "Edit Class"}</p>
      </div>
      <form className="new-class-form" noValidate onSubmit={_onSubmit}>
        {alertMessage && alertMessage !== "" ? (
          <Alert type={alertMessage.type} children={alertMessage.message} />
        ) : null}
        <div className="form-group">
          <label>Intake: </label>
          <select
            name="courseCalendar_Id"
            className="form-control"
            defaultValue={courseCalendar_Id}
            ref={(e) =>
              (entryData.current[0] = {
                element: e,
                required: true,
              })
            }
          >
            {courses &&
              courses.map((course, index) => {
                return (
                  <option key={index} value={course._id}>
                    {course.intakeName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            name="date"
            type="date"
            defaultValue={dayjs(new Date(date)).format("YYYY-MM-DD")}
            className={
              error && error.date ? "form-control error" : "form-control"
            }
            onChange={(e) => _onChange(e)}
            ref={(e) =>
              (entryData.current[1] = {
                element: e,
                required: true,
              })
            }
          />
        </div>
        <div className="err-msg">
          {error && error.date && <p>* Date is required!</p>}
        </div>
        <div className="form-group">
          <label>Status:</label>
          <div>
            <input
              type="radio"
              name="status"
              defaultChecked={weekState}
              onClick={() => setWeekState(true)}
              ref={(e) =>
                (entryData.current[2] = {
                  element: e,
                  required: true,
                })
              }
            />
            <label htmlFor="Class">Class</label>
            <input
              type="radio"
              name="status"
              defaultChecked={weekState ? false : true}
              onClick={() => setWeekState(false)}
            />
            <label htmlFor="Holiday">Holiday</label>
          </div>
        </div>
        {weekState ? (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="ClassName">Class Name:</label>
              <input
                id="Reason"
                name="className"
                defaultValue={className}
                className={
                  error && error.className
                    ? "form-control error"
                    : "form-control"
                }
                type="text"
                placeholder="Class Name . . ."
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[3] = {
                    element: e,
                    required: true,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.className && <p> * Class Name is required!</p>}
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                name="startTime"
                className={
                  error && error.startTime
                    ? "form-control error"
                    : "form-control"
                }
                type="time"
                defaultValue={startTime}
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[4] = {
                    element: e,
                    required: true,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.startTime && <p>* Start Time is required!</p>}
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                name="endTime"
                defaultValue={endTime}
                className={
                  error && error.endTime ? "form-control error" : "form-control"
                }
                type="time"
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[5] = {
                    element: e,
                    required: true,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.endTime && <p>* End Time is required!</p>}
            </div>
            <div className="form-group font-size">
              <label htmlFor="agendaURL">Agenda URL:</label>
              <input
                name="agendaURL"
                type="url"
                defaultValue={agendaURL}
                className={
                  error && error.agendaURL
                    ? "form-control error"
                    : "form-control"
                }
                placeholder="Agenda URL"
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[6] = {
                    element: e,
                    required: false,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.agendaURL && <p>* {error.agendaURL}</p>}
            </div>
            <div className="form-group font-size">
              <label htmlFor="syllabusURL">Syllabus URL:</label>
              <input
                name="syllabusURL"
                type="url"
                defaultValue={syllabusURL}
                className={
                  error && error.syllabusURL
                    ? "form-control error"
                    : "form-control"
                }
                placeholder="Syllabus URL"
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[7] = {
                    element: e,
                    required: true,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.syllabusURL && <p>* {error.syllabusURL}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Schedule:</label>
              <select
                name="scheduleType"
                className="form-control"
                placeholder="Schedule"
                defaultValue={scheduleType}
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[8] = {
                    element: e,
                    required: true,
                  })
                }
              >
                <option value="Education Lead Class">
                  Education Lead Class
                </option>
                <option value="Personal Development Team Lead Class">
                  Personal Development Team Lead Class
                </option>
                <option value="Ambassador Lead Class">
                  Ambassador Lead Class
                </option>
              </select>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="ClassName">Reason:</label>
              <input
                id="Reason"
                name="className"
                className={
                  error && error.className
                    ? "form-control error"
                    : "form-control"
                }
                type="text"
                defaultValue={status ? "" : className}
                placeholder="Reason . . ."
                onChange={(e) => _onChange(e)}
                ref={(e) =>
                  (entryData.current[3] = {
                    element: e,
                    required: true,
                  })
                }
              />
            </div>
            <div className="err-msg">
              {error && error.className && <p>* Reason is required!</p>}
            </div>
          </React.Fragment>
        )}
        <div className="form-group">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default NewClassForm;

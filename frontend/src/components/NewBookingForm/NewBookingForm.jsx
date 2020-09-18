import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import axios from "axios";
import "./NewBookingForm.scss";
import Alert from "../../components/Alert/Alarm.jsx";
import rolesData from "./../../data/roles.json";
import { useHistory } from "react-router";

const NewBookingForm = ({ Class, user, city, WeekNumber }) => {
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState(null);

  const NewSignUp = async (values) => {
    values.classId = Class._id;
    values.email = values.email.toLowerCase();

    await axios
      .post(`/api/v1/bookings`, {
        ...values,
      })
      .then((response) => {
        if (response.data.success) {
          setAlertMessage({
            type: "success",
            message: "New class booking is created successfully !",
          });
          setTimeout(() => {
            if (city) {
              history.push(
                `/${user}/${city}/attendingvolunteers/${Class._id}/${WeekNumber}`
              );
            } else {
              history.push(`/${user}/cities/`);
            }
          }, 1000);
        } else {
          setSubmit_F(true);
          setAlertMessage({
            type: "danger",
            message: "New class booking is not created !",
          });
        }
      })
      .catch((err) => {
        if (!err.response.data.success) {
          setSubmit_F(true);
          setAlertMessage({
            type: "danger",
            message: err.response.data.message,
          });
        }
      });
  };

  const { entryData, error, onChange, onSubmit, setSubmit_F } = useForm(
    NewSignUp
  );

  return (
    <div className="newbooking-container">
      <form className="newbooking-form" noValidate onSubmit={onSubmit}>
        {alertMessage && alertMessage !== "" ? (
          <Alert type={alertMessage.type} children={alertMessage.message} />
        ) : null}
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            onChange={(e) => onChange(e)}
            className={
              error && error.fullName ? "form-control error" : "form-control"
            }
            placeholder="Full Name . . ."
            ref={(e) =>
              (entryData.current[0] = {
                element: e,
                required: true,
              })
            }
          />
        </div>
        <div className="err-msg">
          {error && error.fullName && <p> * {error.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => onChange(e)}
            className={
              error && error.email ? "form-control error" : "form-control"
            }
            placeholder="Email . . ."
            ref={(e) =>
              (entryData.current[1] = {
                element: e,
                required: true,
              })
            }
          />
        </div>
        <div className="err-msg">
          {error && error.email && <p> * {error.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>

          <select
            type="text"
            name="roleName"
            onChange={(e) => onChange(e)}
            className={
              error && error.roleName ? "form-control error" : "form-control"
            }
            placeholder="Role Name . . ."
            ref={(e) =>
              (entryData.current[2] = {
                element: e,
                required: true,
              })
            }
          >
            {rolesData.map((role) => (
              <option key={role.id} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="err-msg">
          {error && error.roleName && <p> * {error.roleName}</p>}
        </div>
        <div className="form-group">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default NewBookingForm;

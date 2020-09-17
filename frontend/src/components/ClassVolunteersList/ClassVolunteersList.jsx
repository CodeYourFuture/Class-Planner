import React, { useState } from "react";
import Alert from "../Alert/Alarm.jsx";
import CancelBookingAlert from "./CancelBookingAlert.jsx";
import users from "../../data/users.json";
import "./ClassVolunteersList.scss";

const ClassVolunteersList = ({ user, city, id, WeekNumber, bookings }) => {
  const [ConfirmationStatus, setConfirmationStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("message");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");

  function cancelBookingHandler(fullName, email, bookingId) {
    if ([users[0].id, users[1].id].includes(user)) setConfirmationStatus(true);
    setFullName(fullName);
    setEmail(email);
    setBookingId(bookingId);
  }

  function closeConfirmationAlert() {
    setConfirmationStatus(false);
  }

  function showAlert(type, message) {
    setAlertStatus(true);
    setAlertType(type);
    setAlertMessage(message);
  }
  return (
    <div className="classvolunteerslist-container">
      {ConfirmationStatus && (
        <CancelBookingAlert
          user={user}
          city={city}
          id={id}
          fullName={fullName}
          email={email}
          _id={bookingId}
          closeHandler={closeConfirmationAlert}
          showAlert={showAlert}
          WeekNumber={WeekNumber}
        />
      )}
      {alertStatus && <Alert type={alertType}> {alertMessage} </Alert>}
      <p className="volunteerslist-title">Volunteers list</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            {user === users[0].id && <th scope="col">Email</th>}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((volunteer, index) => (
              <tr key={index}>
                <td>{volunteer.fullName}</td>
                <td>{volunteer.roleName}</td>
                {user === users[0].id && <td>{volunteer.email}</td>}

                <td>
                  {(user === users[0].id || user === users[1].id) && (
                    <button
                      className="btn-cancel-volunteer"
                      onClick={(e) => {
                        setAlertStatus(false);
                        cancelBookingHandler(
                          volunteer.fullName,
                          volunteer.email,
                          volunteer._id
                        );
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassVolunteersList;

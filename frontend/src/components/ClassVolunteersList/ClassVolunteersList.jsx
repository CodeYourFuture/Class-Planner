import React, { useState } from "react";
import Alert from "../Alert/Alarm.jsx";
import CancelBookingAlert from "./CancelBookingAlert.jsx";
import { connect } from "react-redux";
import "./ClassVolunteersList.scss";

const mapStateToProps = (state) => {
  return {
    pageData: state.PageReducer.pageData,
  };
};

const ClassVolunteersList = ({ pageData, bookings }) => {
  const [ConfirmationStatus, setConfirmationStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("message");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");

  function cancelBookingHandler(fullName, email, bookingId) {
    if (
      pageData &&
      (pageData.user === "admin" || pageData.user === "volunteer")
    )
      setConfirmationStatus(true);

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
          user={pageData && pageData.user}
          fullName={fullName}
          email={email}
          _id={bookingId}
          closeHandler={closeConfirmationAlert}
          showAlert={showAlert}
        />
      )}
      {alertStatus && <Alert type={alertType}> {alertMessage} </Alert>}
      <p className="volunteerslist-title">Volunteers list</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">FullName</th>
            <th scope="col">Role</th>
            {pageData && pageData.user === "admin" && (
              <th scope="col">Email</th>
            )}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((volunteer, index) => (
              <tr key={index}>
                <td>{volunteer.fullName}</td>
                <td>{volunteer.roleName}</td>
                {pageData && pageData.user === "admin" && (
                  <td>{volunteer.email}</td>
                )}

                <td>
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(ClassVolunteersList);

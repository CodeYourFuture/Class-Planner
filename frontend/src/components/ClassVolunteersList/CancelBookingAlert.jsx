import React, { useState } from "react";
import httpClient from "../../common/httpClient/httpClient.js";
import "./CancelBookingAlert.scss";

const CancelBookingAlert = ({
  user,
  fullName,
  email,
  _id,
  closeHandler,
  showAlert,
}) => {
  const [volunteerEmail, setVolunteerEmail] = useState("");

  function validateVolunteerEmail(bookingFullName, bookingEmail, bookingId) {
    if (bookingEmail === volunteerEmail && volunteerEmail !== "") {
      deleteBooking();
    } else {
      closeHandler();
      showAlert("danger", "Oh sorry!  The email address is incorrect .");
    }
  }

  function deleteBooking() {
    httpClient
      .delete(`/api/v1/bookings/${_id}`)
      .then(function (response) {
        if (response.data.success === true) {
          closeHandler();
          showAlert("success", "The booking has been deleted successfully.");
        }
      })
      .catch(function (err) {
        closeHandler();
        if (err.response.data.success === false) {
          showAlert("danger", err.response.data.error);
        }
      });
  }

  return (
    <React.Fragment>
      {user === "admin" && (
        <div className="cancelbooking-alert">
          <p>
            Are you sure to cancel the corresponding booking for {fullName} ?
          </p>
          <div>
            <button
              className="cancelbooking-no"
              onClick={() => closeHandler(true)}
            >
              NO
            </button>
            <button
              className="cancelbooking-yes"
              onClick={() => deleteBooking()}
            >
              YES
            </button>
          </div>
        </div>
      )}

      {user === "volunteer" && (
        <div className="cancelbooking-alert">
          <p>
            Please confirm {fullName} email address to cancel the corresponding
            booking for the current class.
          </p>
          <div>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control volunteeremail-confirm"
                onChange={(e) => setVolunteerEmail(e.target.value)}
              />
              <button
                className="cancelbooking-confirm"
                onClick={(e) => {
                  validateVolunteerEmail(fullName, email, _id);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CancelBookingAlert;

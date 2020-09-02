import React, { useState } from "react";
import httpClient from "../../common/httpClient/httpClient.js";
import "./CancelBookingAlert.scss";
import alert from "../Alert/Alarm.jsx";

const CancelBookingAlert = ({ user, fullName, email, _id, closeHandler }) => {
  const [volunteerEmail, setVolunteerEmail] = useState("");

  const [bookingFullName, setBookingFullName] = useState(fullName);
  const [bookingEmail, setBookingEmail] = useState(email);
  const [bookingId, setBookingId] = useState(_id);

  function validateVolunteerEmail(bookingFullName, bookingEmail, bookingId) {
    if (bookingEmail === volunteerEmail && volunteerEmail !== "") {
      deleteBookingAsync();
    }

    console.log(bookingId);
    console.log(bookingEmail);
  }
  //${bookingId}
  async function deleteBookingAsync() {
    const b = await httpClient
      .delete(`/api/v1/bookings/5f4fe493651768bdec3baf08`)
      .then((resp) => {
        return resp.json();
      });
    // .then((data) => {
    //   console.log(data);
    // });

    // {
    //   // if (resp.data.success === true) {
    //   //   closeHandler();
    //   //   console.log(
    //   //     `The booking for ${bookingFullName} has been deleted successfully.`
    //   //   );
    //   // }
    //   resp.json()
    //   console.log();
    //   // if (resp.data.success === false){
    //   //   console.log(resp.data.error);
    //   // }
    // })
    // .catch((err) => console.log(err));

    console.log(b);
    // const get_booking = useCallback(async () => {
    //   if (currentClass) {
    //     const bookings = await httpClient.get(
    //       `/api/v1/class/bookings/${currentClass._id}`
    //     );
    //     console.log(bookings.data.data);
    //     setCurrentBooking(bookings.data.data);
    //   }
    // }, [currentClass]);
  }

  return (
    <React.Fragment>
      {user === "admin" && (
        <div className="cancelbooking-alert">
          <p>
            Are you sure to cancel the corresponding booking for
            {fullName} ?
          </p>
          <div>
            <button
              className="cancelbooking-no"
              onClick={() => closeHandler(true)}
            >
              NO
            </button>
            <button className="cancelbooking-yes">YES</button>
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

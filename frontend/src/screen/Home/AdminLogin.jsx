import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import users from "../../data/users.json";
import "./AdminLogin.scss";

const CancelBookingAlert = ({ closeHandler, showAlert }) => {
  const [redirectToCities, setRedirectToCities] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const validateAdminPasswordInput = () => {
    if (adminPassword !== "") {
      validatePassword();
      setRedirectToCities(true);
    } else {
    //   closeHandler();
      showAlert("danger", "Oops! The Security Code is incorrect.");
    }
  };

  const validatePassword = () => {
      const body={adminPassword};
    axios
      .put(`/api/v1/login/5fa5c5e5508ed1a9b56f5d54`,body )
      .then((response) => {
          console.log(response.data)
        if (response.data.success === true) {
        //   closeHandler();
          showAlert(
            "success",
            "The security code has been verified successfully."
          );
         
        }
      })
      .catch((err) => {
          console.log(err)
        // closeHandler();
        if (err.response.data.success === false) {
          showAlert("danger", err.response.data.error);
        }
      });
  };

  const redirectUser = () => {
    if (redirectToCities) {
      return <Redirect to={`/${users[0].id}/cities`} />;
    }
  };
  return (
    <React.Fragment>
      {
        <div className="password-alert">
          <p>Please, Enter the Security Code ?</p>

          <form
            onSubmit={() => {
              validateAdminPasswordInput();
            }}
          >
            <div>
              <input
                id="text"
                type="text"
                name="security-code"
                className="form-control password-input-confirm"
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <button type="submit" className="password-confirm">
                Confirm
              </button>
            </div>
          </form>
          {redirectUser()}
        </div>
      }
    </React.Fragment>
  );
};

export default CancelBookingAlert;

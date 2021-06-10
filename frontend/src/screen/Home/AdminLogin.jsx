import React, { useState } from "react";
import users from "../../data/users.json";
import axios from "axios";

import "./AdminLogin.scss";

const AdminLogin = ({ closeHandler, showAlert }) => {
  const [adminPassword, setAdminPassword] = useState("");

  const validateAdminPasswordInput = async () => {
    const {
      data: { success },
    } = await axios.post("/api/v1/authentication/login", {
      password: adminPassword.trim(),
    });

    if (success) {
      closeHandler();
      showAlert("success", "The security code has been verified successfully.");
      setTimeout(() => {
        window.location.replace(`/${users[0].id}/cities`);
      }, 500);
    } else {
      closeHandler();
      showAlert("danger", "Oops! The Security Code is incorrect.");
    }
  };

  return (
    <React.Fragment>
      {
        <div className="password-alert">
          <p>Please, Enter the Security Code?</p>

          <form onSubmit={validateAdminPasswordInput}>
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
        </div>
      }
    </React.Fragment>
  );
};

export default AdminLogin;

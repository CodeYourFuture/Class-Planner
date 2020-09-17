import React from "react";
import axios from "axios";
import "./CancelCourse.scss";
const CancelClass = ({
  user,
  city,
  currentCourse,
  closeHandler,
  showAlert,
}) => {
  function deleteClass() {
    axios
      .delete(`/api/v1/courses/${currentCourse._id}`)
      .then(function (response) {
        if (response.data.success === true) {
          closeHandler();
          showAlert("success", "The class has been deleted successfully.");
          setTimeout(() => {
            window.location.replace(`/${user}/${city}/courses/`);
          }, 2000);
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
    <div className="cancel-alert">
      <p>Are you sure to cancel the corresponding Course?</p>
      <div>
        <button className="cancel-no" onClick={() => closeHandler(true)}>
          NO
        </button>
        <button className="cancel-yes" onClick={deleteClass}>
          YES
        </button>
      </div>
    </div>
  );
};

export default CancelClass;

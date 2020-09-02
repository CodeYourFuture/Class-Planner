import React from "react";
import "./Alert.scss";

const Alert = ({ type, children }) => {
  let cssClass = "";
  type === "danger" && (cssClass = "alert-danger");
  type === "success" && (cssClass = "alert-success");
  type === "info" && (cssClass = "alert-info");
  type === "light" && (cssClass = "alert-light");

  return <div className={`alert ${cssClass}`}>{children}</div>;
};

export default Alert;

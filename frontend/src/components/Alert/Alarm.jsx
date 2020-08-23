import React from "react";
import "./Alert.scss";

const Alert = (props) => {
  let cssClass = "";
  props.type === "danger" && (cssClass = "alert-danger");
  props.type === "success" && (cssClass = "alert-success");
  props.type === "info" && (cssClass = "alert-info");
  props.type === "light" && (cssClass = "alert-light");

  return <div className={cssClass}>{props.children}</div>;
};

export default Alert;

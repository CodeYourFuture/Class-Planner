import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./emial.scss";

const Email = ({ Class, emailClose }) => {
  return (
    <div className="email-container">
      <div className="email-body">
        <div className="close-bt">
          <i class="fas fa-times-circle" onClick={() => emailClose()}></i>
        </div>
        <div className="subject-email">
          <p>Send Email to all volunteers</p>
          <input type="text" className="subject" placeholder="Subject"></input>
          <ReactQuill theme="snow" />
        </div>
        <button className="send">
          Send <i class="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Email;

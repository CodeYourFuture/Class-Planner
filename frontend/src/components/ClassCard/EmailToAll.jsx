import React, { useRef } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./EmailToAll.scss";

const EmailToAll = ({ Class, emailClose }) => {
  const emailText = useRef([]);
  const sendEmail = async (e) => {
    e.preventDefault();
    if (
      emailText.current[0].value === undefined ||
      emailText.current[1].state.value === undefined ||
      emailText.current[0].value === "" ||
      emailText.current[1].state.value === "<p><br></p>"
    ) {
      alert("Please add your text to email!");
    } else {
      await axios.post("/email/send", {
        classId: Class._id,
        subject: emailText.current[0].value,
        email: emailText.current[1].state.value,
      });
    }
  };
  return (
    <form className="email-body">
      <div className="close-bt"></div>
      <div className="subject-email">
        <p>Send Email to all volunteers</p>
        <input
          type="text"
          className="subject"
          placeholder="Subject"
          ref={(el) => (emailText.current[0] = el)}
          required
        ></input>
        <ReactQuill
          theme="snow"
          ref={(el) => (emailText.current[1] = el)}
          required
        />
      </div>
      <button type="submit" className="send" onClick={(e) => sendEmail(e)}>
        Send <i className="far fa-paper-plane"></i>
      </button>
      <button className="cancel" onClick={() => emailClose(false)}>
        Cancel <i className="fa fa-times classcard-icon-ctl"></i>
      </button>
    </form>
  );
};

export default EmailToAll;

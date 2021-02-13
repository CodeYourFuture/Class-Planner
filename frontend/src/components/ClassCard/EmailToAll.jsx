import React, { useRef } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./EmailToAll.scss";

const EmailToAll = ({ Class, emailClose }) => {
  const emailText = useRef(null);
  const sendEmail = async (e) => {
    let emailContent = emailText.current;
    if (
      emailContent.state.value === undefined ||
      emailContent.state.value === "<p><br></p>"
    ) {
      alert("Please add your text to email!");
    }
    await axios.post("/email/send", { email: emailContent.state.value });
    e.preventDefault();
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
          required
        ></input>
        <ReactQuill
          theme="snow"
          ref={(el) => (emailText.current = el)}
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

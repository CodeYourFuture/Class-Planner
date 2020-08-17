import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Home_Footer_Main">
            © 2019{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://codeyourfuture.io/"
            >
              Code Your Future
            </a>{" "}
            |
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn-floating pl-1"
              href="https://www.facebook.com/codeyourfuture.io"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn-floating pl-2"
              href="https://twitter.com/CodeYourFuture_"
            >
              <i className="fab fa-twitter-square"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn-floating pl-2"
              href="https://www.linkedin.com/company/codeyourfuture"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn-floating pl-2"
              href="mailto:contact@codeyourfuture.io"
            >
              <i className="fa fa-envelope"></i>
            </a>
    </div>
  );
};

export default Footer;

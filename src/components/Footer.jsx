import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footerText">&copy; 2024 Taskify</p>
        <div className="social-icons">
          <a
            href="https://github.com/MishaliaPillay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="iconlink" />
          </a>
          <a
            href="https://www.linkedin.com/in/mishalia-pillay-1809222b1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="iconlink" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

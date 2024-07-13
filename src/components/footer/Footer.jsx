import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          with ❤️ <a href="https://github.com/maneeshcoder">Maneesh Rawat</a>
        </p>
        <div className="social-links">
          <a href="">
            <AiFillFacebook />
          </a>
          <a href="">
            <AiFillTwitterSquare />
          </a>
          <a href="https://www.instagram.com/mr_maneesh07?igsh=bzh5Y2Iwa2c4ajMw">
            <AiFillInstagram />
          </a>
          <a href="www.linkedin.com/in/maneesh-rawat-461a76251"><AiFillLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

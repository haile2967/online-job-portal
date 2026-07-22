import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MyJob Portal</h3>
          <p>Connecting talent with opportunity</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@myjobportal.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 MyJob Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

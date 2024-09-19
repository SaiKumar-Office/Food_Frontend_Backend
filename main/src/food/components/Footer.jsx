/* eslint-disable no-unused-vars */
import React from 'react';
import { FaTelegram } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="/support">Help & Support</a></li>
            <li><a href="/partner">Partner with us</a></li>
            <li><a href="/advertise">Advertise</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/terms&policy">Terms & Conditions</a></li>
            <li><a href="/terms&policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaSquareFacebook className='facebook'/></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTelegram className='telegram'/></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><BsInstagram className='instagram'/></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Quick Bites. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

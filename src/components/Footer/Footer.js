import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer flex-column">
      <div className="jse width-50">
        <p className="font-medium font-white upper weight-7 footer_link_hover">
          <Link to="/about" className="pointer">
            Մեր Մասին
          </Link>
        </p>
        <p className="font-medium font-white upper weight-7 footer_link_hover">
          <Link to="/about" className="pointer">
            Մեր Մասին
          </Link>
        </p>
        <p className="font-medium font-white upper weight-7 footer_link_hover">
          <Link to="/about" className="pointer">
            Մեր Մասին
          </Link>
        </p>
      </div>
      <div className="footer_icons">
        <FontAwesomeIcon icon={faInstagram} className="footer_icon" />
        <FontAwesomeIcon icon={faFacebookSquare} className="footer_icon" />
      </div>
    </div>
  );
}

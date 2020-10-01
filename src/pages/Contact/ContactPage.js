import React from "react";
import "./contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPaperPlane,
  faPhoneAlt,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../../components/ContactForm/ContactForm";

export default function ContactPage() {
  return (
    <div className="contact_page pt-7 pb-footer width-100 flex-column">
      <div className="width-75 flex-evenly align-start">
        <div className="width-25 flex-column mt-3">
          <FontAwesomeIcon icon={faPhoneAlt} className="font-xl font-red" />
          <p className="font-red font-small mt-1 weight-6">+374 93 60 88 88</p>
          <p className="font-red font-small mt-1 weight-6">+374 33 33 22 21</p>
        </div>
        <div className="width-25 flex-column mt-3">
          <FontAwesomeIcon icon={faPaperPlane} className="font-xl font-red" />
          <p className="font-red font-small mt-1 weight-6">
            arman.1995.umroyan1@gmail.com
          </p>
        </div>
        <div className="width-25  flex-column mt-3">
          <a
            href="https://goo.gl/maps/bJmUVN7tUrEn51X58"
            target="_blank"
            className="flex-column pointer"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="font-xl font-red"
            />
            <p className="font-red font-small mt-1 weight-6 text-center">
              Ք. Էջմիածին Գ. Մուսալեռ Փ. Թամանյան
            </p>
          </a>
        </div>

        <div className="width-25 flex-column mt-3">
          <FontAwesomeIcon
            icon={faProjectDiagram}
            className="font-xl font-red"
          />
          <div className="jscac mt-1 ">
            <a
              href="https://www.instagram.com/homerest_f/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-red mx-05 font-large weight-6 px-03 contact_media mt-3">
                <FontAwesomeIcon icon={faInstagram} />
              </p>
            </a>
            <a
              href="https://www.facebook.com/homerestarmenia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-red mx-05 font-large weight-6 px-03 contact_media mt-3">
                <FontAwesomeIcon icon={faFacebookF} />
              </p>
            </a>
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}

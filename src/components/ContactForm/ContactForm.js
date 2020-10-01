import React, { useRef } from "react";
import "./contactform.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../OrderForm/Error/Error";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must b a valid email address")
    .max(30, "Must be shorter than 30")
    .required("required"),
  text: Yup.string().required("required"),
  firstname: Yup.string().required("required"),
  lastname: Yup.string().required("required"),
});

export default function ContactForm() {
  const myRef = useRef();

  const sendEmail = async (values) => {
    const token = await myRef.current.executeAsync();
    try {
      const data = await fetch("/email/contactmail", {
        method: "POST",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify({
          email: values.email,
          lastname: values.lastname,
          firstname: values.firstname,
          text: values.text,
          token: token,
        }),
      });
      const fetchedData = await data.json();
      if (fetchedData.message) {
        swal("Ուռաա՜🤩", fetchedData.message, "success");
      } else if (fetchedData.error) {
        swal("Վայ😕, Ինչ որ բան այն չէ🧐", fetchedData.error, "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="signup_main_section">
      <div className="signup_form">
        <div className="signup_main_part">
          <h2 className="font-red font-h1 mb-2 pt-7 capitalize">Կապ մեզ հետ</h2>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              text: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              sendEmail(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div
                  className={
                    touched.firstname && errors.firstname
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <input
                    id="firstname"
                    name="firstname"
                    className="contact_inputs"
                    type="text"
                    placeholder="Enter your firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                  />
                  <Error
                    touched={touched.firstname}
                    message={errors.firstname}
                  />
                </div>
                <div
                  className={
                    touched.lastname && errors.lastname
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <input
                    id="lastname"
                    name="lastname"
                    className="contact_inputs"
                    type="text"
                    placeholder="Enter your lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                  />
                  <Error touched={touched.lastname} message={errors.lastname} />
                </div>
                <div
                  className={
                    touched.email && errors.email
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <input
                    id="email"
                    name="email"
                    className="contact_inputs"
                    type="email"
                    placeholder="Enter your email: Example  example@example.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Error touched={touched.email} message={errors.email} />
                </div>

                <div
                  className={
                    touched.text && errors.text
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <textarea
                    id="text"
                    name="text"
                    cols="40"
                    rows="5"
                    className="contact_textarea"
                    placeholder="Enter your address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.text}
                  ></textarea>
                  <Error touched={touched.text} message={errors.text} />
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_KEY}
                  size="invisible"
                  ref={myRef}
                />
                <button
                  className="submit_button font-small weight-7"
                  type="submit"
                >
                  Ուղարկել
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}

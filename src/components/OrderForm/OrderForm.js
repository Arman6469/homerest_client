import React, { useRef } from "react";
import "./OrderForm.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "./Error/Error";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";
import globalAPI from "../../api/globalAPI";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must b a valid email address")
    .max(30, "Must be shorter than 30")
    .required("required"),
  adress: Yup.string()
    .min(6, "Must be more than 6 letters")
    .required("required"),
  firstname: Yup.string().required("required"),
  lastname: Yup.string().required("required"),
  phone: Yup.string()
    .required()
    .matches(/^[0-9+]+$/, "Must be only digits")
    .min(12, "Must be exactly 12 symbols")
    .max(12, "Must be exactly 12 sybmols")
    .required("required"),
});

export default function OrderForm({ cartProducts }) {
  const myRef = useRef();

  const sendEmail = async (values) => {
    const token = await myRef.current.executeAsync();

    const mail = { ...values, products: [...cartProducts], token };

    try {
      const data = await globalAPI({
        method: "POST",
        url: "/email/sendmail",
        data: mail,
      });
      const fetchedData = data.data;
      if (fetchedData.message) {
        swal("Ուռաա՜🤩", fetchedData.message, "success").then(function () {
          localStorage.clear();
          window.location.reload();
        });
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
          <h2 className="registration_title">Check Out</h2>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              adress: "",
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
                    type="text"
                    className="order_inputs"
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
                    type="text"
                    className="order_inputs"
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
                    type="email"
                    className="order_inputs"
                    placeholder="Enter your email: Example  example@example.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div
                  className={
                    touched.phone && errors.phone
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="order_inputs"
                    placeholder="Enter your phone number: Example  +37400000000"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <Error touched={touched.phone} message={errors.phone} />
                </div>
                <div
                  className={
                    touched.adress && errors.adress
                      ? "error ui large input form_input"
                      : "ui input large form_input"
                  }
                >
                  <input
                    id="adress"
                    name="adress"
                    type="adress"
                    className="order_inputs"
                    placeholder="Enter your address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.adress}
                  />
                  <Error touched={touched.adress} message={errors.adress} />
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_KEY}
                  size="invisible"
                  ref={myRef}
                />
                <button
                  className="submit_button_order font-small weight-7"
                  type="submit"
                >
                  Check Out
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}

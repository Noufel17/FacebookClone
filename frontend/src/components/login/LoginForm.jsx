import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logininput from "../inputs/logininput.jsx";
import * as yup from "yup";

// define login structure as a js object
const initialLogin = {
  email: "",
  password: "",
};

function LoginForm() {
  const [login, setlogin] = useState(initialLogin);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    // generic function to handel change in either field (login or passsword)
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };
  const loginValidation = yup.object({
    email: yup
      .string()
      .required("an email address is required")
      .email("must be a valid email")
      .min(10)
      .max(100),
    password: yup.string().required("a password is required").min(8),
  });
  return (
    <div className="login_wrap">
      <div className="login1">
        <img src="../../icons/facebook.svg" alt="facebook" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login2">
        <div className="form_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              // its fucking prop ya l7mar
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formikProps) => (
              <Form>
                <Logininput
                  type="text"
                  name="email"
                  placeholder="email or phone number"
                  onChange={handleLoginChange}
                />
                <Logininput
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleLoginChange}
                  buttom
                />
                <button type="submit" className="blue_btn">
                  log in
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgoten" className="forgot_password">
            forgot password !
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">create account</button>
        </div>
        <Link to="/" className="signup_extra">
          <b>create a page </b>
          for a celebrity, brand or business
        </Link>
        <br></br>
      </div>
    </div>
  );
}

export default LoginForm;

import { Formik, Form } from "formik";
import React from "react";
import Registerinput from "../inputs/registerinput";
import { useState } from "react";

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birth_year: "",
  birth_month: "",
  birth_day: "",
  gender: "",
};
function RegisterForm() {
  const [user, setuser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    birth_year,
    birth_month,
    birth_day,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  return (
    <div className="overriden_blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            birth_year,
            birth_month,
            birth_day,
            gender,
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="register_line">
                <Registerinput
                  type="text"
                  placeholder="first name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <Registerinput
                  type="text"
                  placeholder="surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="register_line">
                <Registerinput
                  type="text"
                  placeholder="email or phone number"
                  name="email"
                  onChange={handleRegisterChange}
                />
                <Registerinput
                  type="password"
                  placeholder="new password"
                  name="passsword"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="register_column">
                <div className="register_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="register_grid">
                  <select name="birth_day">
                    <option>15</option>
                  </select>
                  <select name="birth_month">
                    <option>15</option>
                  </select>
                  <select name="birth_year">
                    <option>15</option>
                  </select>
                </div>
              </div>
              <div className="register_column">
                <div className="register_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="register_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="male">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="male">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
                <div className="register_info">
                  By clicking sign up you agree to our{" "}
                  <span>Terms, Data policy. &nbsp;</span>
                  and <span>Cookie policy.</span>You may recieve SMS
                  notification from us and can opt out anytime.
                </div>
                <div className="register_btn_wrapper">
                  <button className="blue_btn open_signup">Sign Up</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;

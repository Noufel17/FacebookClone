import React from "react";
import "./inputs.css";
import "../../styles/icons/icons.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

function Logininput({ type, buttom, ...props }) {
  // a reusable input component for login and sign up
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    // boolean depending on screen width
    query: "(min-width: 850px)",
  });
  return (
    <div className="input_wrap">
      {/* like an if statement  */}
      {meta.touched && meta.error && <i className="error_icon"></i>}
      {meta.touched && meta.error && buttom && !desktopView && (
        <i
          className="error_icon"
          style={{ transform: "translateY(-47px)" }}
        ></i>
      )}
      {meta.touched && meta.error && !buttom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error "
          }
          style={{ transform: "translateY(-3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "!border-red-600 mt-2" : "mt-2"}
        type={type}
        name={field.name}
        placeholder={field.placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && buttom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error "
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Logininput;

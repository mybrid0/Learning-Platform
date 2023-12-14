import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import RegNavbar from "../components/RegNavbar";
import Welcome from "../components/Welcome";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validation = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string()
      .min(8, "Password is too short, 8 characters minimum")
      .required("No Password Given"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm Password"),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:3001/users", data).then((response) => {});
    navigate("/login");
  };

  return (
    <div className="authWrapper">
      <Welcome />

      <div className="registerContainer">
        <div className="nav-auth">
          <RegNavbar />
        </div>
        <div className="registerContent">
          <h1>Register</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validation}
          >
            <Form className="formContainer">
              <label htmlFor="username">USERNAME</label>
              <Field
                id="input"
                name="username"
                placeholder="Enter a Username"
                autoComplete="off"
              />

              <label htmlFor="password">PASSWORD</label>

              <Field
                id="input"
                name="password"
                placeholder="Enter a password"
                autoComplete="off"
                type="password"
              />

              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>

              <Field
                id="input"
                name="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
                type="password"
              />
              <ErrorMessage
                className="error"
                name="username"
                component="span"
              />
              <ErrorMessage
                className="error"
                name="password"
                component="span"
              />
              <ErrorMessage
                className="error"
                name="confirmPassword"
                component="span"
              />
              <button type="submit">Create Account</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import $ from "jquery";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validation = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).max(20).required(),
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
    <div className="registerContainer">
      <h1>Create an Account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validation}
      >
        <Form className="formContainer">
          <ErrorMessage className="error" name="username" component="span" />
          <Field
            id="input"
            name="username"
            placeholder="Username"
            autoComplete="off"
          />

          <ErrorMessage className="error" name="password" component="span" />
          <Field
            id="input"
            name="password"
            placeholder="Password"
            autoComplete="off"
            type="password"
          />

          <ErrorMessage
            className="error"
            name="confirmPassword"
            component="span"
          />
          <Field
            id="input"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            type="password"
          />
          <button type="submit">Create Account</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;

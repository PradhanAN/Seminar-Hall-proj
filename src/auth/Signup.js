import React, { useState } from "react";
import Base from "../base/Base";
import { Link } from "react-router-dom";
import { signup } from "../helper";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import "./Signup.css";
import { Input } from "@material-ui/core";



const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    branch: "",
    user_category: "",
    error: "",
    success: false,
  });

  const { name, email, password, phone_number, user_category, branch, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    console.log(values);
    signup({ name, email, password, phone_number, user_category, branch })
      .then((data) => {
        console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone_number: "",
            user_category: "",
            branch: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpForm = () => {
    return (


      <form className="signup-form">

        <Typography
          variant="h3"
          sx={{ color: "white", fontFamily: "Ubuntu", margin: "20px auto" }}
        >
          Sign Up
        </Typography>

        <input
          placeholder="Name"
          onChange={handleChange("name")}
          value={name}
          required={true}
        />


        <input
          placeholder="Email"
          onChange={handleChange("email")}
          type="email"
          value={email}
          required={true}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handleChange("password")}
          required={true}
        />
        <input
          placeholder="Phone Number"
          value={phone_number}
          onChange={handleChange("phone_number")}
          required={true}
        />
        <input
          placeholder="Branch"
          value={branch}
          onChange={handleChange("branch")}
          required={true}
        />
        <input
          placeholder="student/teacher"
          value={user_category}
          onChange={handleChange("user_category")}
          required={true}
        />

        <button onClick={onSubmit}>SignUp</button>
      </form>

    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    // <Base title="Sign up page" description="A page for user to sign up!">
    <div>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
      <p>hi</p>
    </div>
    // </Base>
  );
};

export default Signup;

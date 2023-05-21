import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { signin, authenticate, isAutheticated, checkEmail } from "../helper";

import { Typography } from "@mui/material";
import "./EmailInput.css";
import { useForm } from "react-hook-form";

const EmailInput = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const [values, setStatus] = useState({
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { error, loading, didRedirect } = values;
  const { user } = isAutheticated();
  const history = useHistory();

  const onSubmit = async (doc, event) => {
    event.preventDefault();
    const emailObj = {
      email: doc.email,
    };

    const res = await checkEmail(emailObj);

    console.log(res);

    if (res.user) {
      setStatus({
        ...values,
        didRedirect: true,
      });
      setValue("email", "");
      history.push("/forgotPassword",{user : res.user});

      //  window.location.href = "/forgotPassword";
    } else {
      setStatus({ ...values, error: res.error, loading: false });
    }
    // .then((data) => {

    //   if (data.error) {
    //     setStatus({ ...values, error: data.error, loading: false });
    //   } else {

    //       setStatus({
    //         ...values,
    //         didRedirect: true,
    //       });
    //       setValue("email", "");

    //   //  window.location.href = "/forgotPassword";
    //   }
    // })
    // .catch(console.log("OOPS something went wrong!"));
  };

  const form = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="emailInput-form">
          <Typography
            variant="h5"
            sx={{ color: "white", fontFamily: "Ubuntu", margin: "22px auto" }}
          >
            Enter your registered email
          </Typography>
          <input
            placeholder="Email"
            autoComplete="off"
            // onChange={handleChange("email")}
            type="email"
            // value={email}

            {...register("email", { required: "* Email is required" })}
          />
          <p>{errors.email?.message}</p>
          <button type="submit">Submit</button>

          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p>{error}</p>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      {/* {errorMessage()} */}
      {form()}
    </>
  );
};

export default EmailInput;

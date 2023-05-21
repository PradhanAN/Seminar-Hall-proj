import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../helper";

import { Typography } from "@mui/material";
import "./ForgotPass.css";
import { useForm } from "react-hook-form";
import { API } from "../backend";

const ForgotPass = () => {
  const location = useLocation();
  const recipientEmail = location.state.user.email;
  const username = location.state.user.name;
  const user = location.state.user;
  const history = useHistory();

  let code = 0;

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

  const sendEmail = async () => {
    code = Math.floor(100000 + Math.random() * 900000);

    console.log(code);
    let message = `Hi ${username},\n\nForgot your passoword?\nHere is the 6 digit code to reset your password.\n\n${code}\n\nThank you.`;
    console.log(message);
    const response = await fetch(`${API}/send`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail: recipientEmail,
        subject: "Reset Password",
        message: message,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          // alert("Message Sent");
        } else if (resData.status === "fail") {
          // alert("Message failed to send");
        }
      });
  };

  useEffect(() => {
    const performSend = async () => {
      await sendEmail();
    };
    performSend();
  }, []);

  const handleResend = async () => {
    await sendEmail();
  };

  const onSubmit = (num, event) => {
    event.preventDefault();
    console.log(num.code);
    
    if (num.code.toString() === code.toString()) {
      console.log("right");
      setStatus({
        ...values,
        didRedirect: true,
      });
      // window.location.href = "/changePassword";
      history.push("/changePassword",{user : user});
    } else {
      console.log("wrong");
      setStatus({ ...values, error: "Wrong code entered", loading: false });
    }
  };

  const form = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="forgotpass-form">
          <input
            placeholder="Code"
            autoComplete="off"
            type="number"
            {...register("code", { required: "* code is required" })}
          />
          <p>{errors.code?.message}</p>
          <button type="submit">Submit</button>

          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p>{error}</p>
          </div>

          <p style={{ color: "rgb(255, 199, 46)" }}>
            Enter the Code sent to your registered email
          </p>
          <p style={{ color: "red" }}>
            &nbsp;&nbsp;
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleResend}
            >
              Resend Code
            </span>
          </p>
        </form>
      </>
    );
  };

  return !isAutheticated() ? (
    <>{form()}</>
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default ForgotPass;

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../helper";

import { Typography } from "@mui/material";
import "./Signin.css";
import { useForm } from "react-hook-form";

const Signin = () => {
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

  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  //   error: "",
  //   loading: false,
  //   didRedirect: false
  // });

  const { error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  // const handleChange = name => event => {
  //   setValues({ ...values, error: false, [name]: event.target.value });
  // };

  // const onSubmit = event => {
  //   event.preventDefault();
  //   setValues({ ...values, error: false, loading: true });
  // signin({ email, password })
  //   .then(data => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error, loading: false });
  //     } else {
  //       authenticate(data, () => {
  //         setValues({
  //           ...values,
  //           didRedirect: true
  //         });
  //       });
  //     }
  //   })
  //   .catch(console.log("signin request failed"));
  // };

  const onSubmit = (doc, event) => {
    event.preventDefault();

    console.log(doc);

    signin(doc)
      .then((data) => {
        if (data.error) {
          setStatus({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setStatus({
              ...values,
              didRedirect: true,
            });
            setValue("email", "");
            setValue("password", "");
          });
          window.location.href = "/";
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    //TODO: do a redirect here
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>redirect to admin</p>;
      } else {
        return <p>redirect to user dashboard</p>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <>
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
        <Typography
          variant="h3"
          sx={{ color: "white", fontFamily: "Ubuntu", margin: "22px auto" }}
        >
          Sign In
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

        <input
          placeholder="Password"
          autoComplete="off"
          type="password"
          {...register("password", { required: "* Password is required" })}
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Sign In</button>


          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            <p>{error}</p>
          </div>

      

        <p style={{ color: 'rgb(255, 199, 46)'}}>Do not have an account yet?&nbsp;&nbsp;<Link to='/signup'><span style={{'textDecoration':'underline'}}>SignUp</span></Link></p>
        <p ><Link to='/emailInput'><span style={{'text-decoration':'underline', 'color': 'red'}}>Forgot Password?</span></Link></p>
      </form>
      
      </>
    );
  };

  return (
    <>
      {/* {loadingMessage()} */}
      {/* {errorMessage()} */}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </>
  );
};

export default Signin;

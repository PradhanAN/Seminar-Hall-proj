import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helper";
import { InputLabel, Typography } from "@mui/material";
import "./Signup.css";
import { useForm } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const [values, setStatus] = useState({
    error: "",
    success: false,
  });

  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   error: "",
  //   success: false,
  // });

  const {error, success } = values;

  // const handleChange = (name) => (event) => {
  //   setValues({ ...values, error: false, [name]: event.target.value });
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   setValues({ ...values, error: false });
  // signup({ name, email, password })
  //   .then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error, success: false });
  //     } else {
  //       setValues({
  //         ...values,
  //         name: "",
  //         email: "",
  //         password: "",
  //         error: "",
  //         success: true,
  //       });
  //     }
  //   })
  //   .catch(console.log("Error in signup"));
  // };

  const onSubmit = (doc, event) => {
    event.preventDefault();

    console.log(doc);

    signup(doc)
      .then((data) => {
        console.log(data)
        if (data.error) {
          setStatus({ error: data.error, success: false });
        } else {
          setValue("name", "");
          setValue("email", "");
          setValue("password", "");
          setValue("phone_number", "");
          setValue("user_category", "");
          setStatus({ error: "", success: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpForm = () => {
    // const onSubmit = (data) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <Typography
          variant="h3"
          sx={{ color: "white", fontFamily: "Ubuntu", margin: "22px auto" }}
        >
          Sign Up
        </Typography>

        <input
          placeholder="Name"
          autocomplete="off"
          {...register("name", { required: "* Name is required" })}
        />
        <p>{errors.name?.message}</p>

        <input
          placeholder="Email"
          autocomplete="off"
          // onChange={handleChange("email")}
          type="email"
          // value={email}

          {...register("email", { required: "* Email is required" })}
        />
        <p>{errors.email?.message}</p>

        <input
          placeholder="Phone Number"
          autocomplete="off"
          type="number"
          {...register("phone_number", { required: "* Phone No. is required" })}
        />
        <p>{errors.phone_number?.message}</p>

        <FormControl sx={{ marginBottom: "17px", marginTop:"8px"}}>
          <InputLabel
            id="demo-simple-select-helper-label"
            sx={{ color: "#747474e5" }}
          >
            Branch
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Branch"
            inputProps={{
              ...register("branch")
            }}
          
            sx={{
              color: "white",
              borderRadius: "14px",

              width: "300px",
              height: "52px",
              transition: "0.25s",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              ".MuiSvgIcon-root ": {
                fill: "white",
              },
            }}
          >
            <MenuItem value={"NONE"}>NONE</MenuItem>
            <MenuItem value={"CSE"}>CSE</MenuItem>
            <MenuItem value={"ISE"}>ISE</MenuItem>
            <MenuItem value={"ECE"}>ECE</MenuItem>
            <MenuItem value={"ACE"}>ACE</MenuItem>
            <MenuItem value={"EEE"}>EEE</MenuItem>
            <MenuItem value={"ETE"}>ETE</MenuItem>
            <MenuItem value={"EIE"}>EIE</MenuItem>
            <MenuItem value={"MECHANICAL"}>MECHANICAL</MenuItem>
            <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
            <MenuItem value={"BIOTECH"}>BIOTECH</MenuItem>
            <MenuItem value={"IEM"}>IEM</MenuItem>
            <MenuItem value={"CHEMICAL"}>CHEMICAL</MenuItem>
          </Select>
        </FormControl>


        <FormControl sx={{marginBottom: "12px", marginTop:"8px" }}>
          <InputLabel
            id="demo-simple-select-helper-label"
            sx={{ color: "#747474c0" }}
          >
            Select Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Category"
            inputProps={{
              ...register("user_category", { required: "* Category is required" })
            }}
            sx={{
              color: "white",
              borderRadius: "14px",

              width: "300px",
              height: "50px",
              transition: "0.25s",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              ".MuiSvgIcon-root ": {
                fill: "white",
              },
            }}
          >
            <MenuItem value=""><em>NONE</em></MenuItem>
            <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
            <MenuItem value={"TEACHER"}>TEACHER</MenuItem>
            <MenuItem value={"OTHER"}>OTHER</MenuItem>
            
          </Select>
        </FormControl>
        <p>{errors.user_category?.message}</p>

        <input
          placeholder="Password"
          type="password"
          autocomplete="off"
          {...register("password", {
            required: "* Password is required",
            minLength: {
              value: 6,
              message: "* Password must be atleast 6 characters long!",
            },
          })}
        />
        <p>{errors.password?.message}</p>

        <button type="submit">SignUp</button>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div>
        <div>
          <div style={{ display: success ? "" : "none" }}>
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div>
        <div>
          <div style={{ display: error ? "" : "none" }}>{error}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </>
  );
};

export default Signup;

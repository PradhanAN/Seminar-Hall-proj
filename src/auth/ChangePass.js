import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { signin, authenticate, isAutheticated, updatePassword } from "../helper";

import { Typography } from "@mui/material";
import "./ChangePass.css";
import { useForm } from "react-hook-form";

const ChangePass = () => {
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
  const location = useLocation();
  const user = location.state.user;

  const onSubmit = async (doc, event) => {
     event.preventDefault();
     const {newpass,confirmpass} = doc;
     if(newpass!==confirmpass){
      setStatus({ ...values, error: "Passwords not matching", loading: false });
     }else{
       const res = await updatePassword({
         id : user._id,
         newPass : newpass
       });
       if(res.user){
        setStatus({
          ...values,
          didRedirect: true,
        });
        setValue("newpass", "");        
        setValue("confirmpass", "");        
        window.location.href = "/signin";
       }
     }
  };

  const form = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="changepass-form">
          <input
            placeholder="Enter new Password"
            autoComplete="off"
            type="password"
            {...register("newpass", { required: "* New password is required" })}
          />
           <p>{errors.newpass?.message}</p>
           <input
            placeholder="Confirm new Password"
            autoComplete="off"
            type="password"
            {...register("confirmpass", { required: "* Confirmation is required" })}
          />
           <p>{errors.confirmpass?.message}</p>
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
    (!isAutheticated()) ?
    (<>
      {/* {errorMessage()} */}
      {form()}
    </>):
    (<Redirect to='/'></Redirect>)
  );
};

export default ChangePass;

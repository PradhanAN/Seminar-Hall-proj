import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import MyRequests from './myRequests/MyRequests';
import AdminDashboard from './admin/AdminDashboard';
import Request from './requestBooking/Request';
import AddHall from './admin/AddHall';
import ForgotPass from "./auth/ForgotPass";
import ChangePass from "./auth/ChangePass";
import EmailInput from "./auth/EmailInput";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/myRequests" exact component={MyRequests} />
        <Route path="/adminDashboard" exact component={AdminDashboard} />
        <Route path="/addHall" exact component={AddHall} />
        <Route path="/request" exact component={Request} />
        <Route path="/forgotPassword" exact component={ForgotPass} />
        <Route path="/changePassword" exact component={ChangePass} />
        <Route path="/emailInput" exact component={EmailInput} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

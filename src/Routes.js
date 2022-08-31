import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import MyRequests from './myRequests/MyRequests';
import AdminDashboard from './admin/AdminDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/myRequests" exact component={MyRequests} />
        <Route path="/adminDashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

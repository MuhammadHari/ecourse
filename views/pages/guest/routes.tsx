import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./home/home";
import { SignUp } from "./register/sign-up";
import { SignIn } from "./login/sign-in";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/home" component={Home} />
      <Route path="*" component={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};

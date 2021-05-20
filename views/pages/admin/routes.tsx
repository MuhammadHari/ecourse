import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Teacher } from "./teacher";
import { Student } from "./student";
import { classroomPages } from "./classroom";

const routes = [Teacher, Student, ...classroomPages];

console.log(routes);

export const Routes = () => {
  return (
    <Switch>
      {routes.map((item) => (
        <Route key={item.path} exact {...item} />
      ))}
      <Route exact path="/home" component={() => <h1>Home</h1>} />
      <Route path="*" component={() => <Redirect to="/home" />} />
    </Switch>
  );
};

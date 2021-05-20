import * as React from "react";
import { classroomPages } from "./classroom";
import { sectionPaths } from "./section";
import { Switch, Route } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useNavigate } from "@hooks/use-navigate";

const pages = [...classroomPages, ...sectionPaths];

const Navigation = () => {
  const { navigateHandler } = useNavigate();
  return (
    <div>
      <List>
        {pages.map((item) => (
          <ListItem onClick={navigateHandler(item.path)} button key={item.path}>
            <ListItemText primary={item.path} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export const Routes = () => {
  return (
    <Switch>
      {pages.map((item) => (
        <Route exact {...item} key={item.path} />
      ))}
      <Route path="/" component={Navigation} />
    </Switch>
  );
};

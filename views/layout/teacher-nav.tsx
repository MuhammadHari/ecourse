import * as React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useClasses } from "@root/layout/styles";
import { DeveloperBoard, AssignmentInd, Dashboard } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";

export const TeacherNav = () => {
  const classes = useClasses();
  const { navigateHandler } = useNavigate();
  return (
    <>
      <ListItem onClick={navigateHandler("/")} button className={classes.item}>
        <ListItemIcon className={classes.itemIcon}>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={navigateHandler("/classroom")}
        className={classes.item}
      >
        <ListItemIcon className={classes.itemIcon}>
          <DeveloperBoard />
        </ListItemIcon>
        <ListItemText primary="Classroom" />
      </ListItem>
      <ListItem button className={classes.item}>
        <ListItemIcon className={classes.itemIcon}>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
    </>
  );
};

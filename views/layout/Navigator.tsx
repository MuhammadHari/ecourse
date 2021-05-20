import React from "react";
import clsx from "clsx";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { useApp } from "@providers/app-provider";
import { useClasses } from "./styles";
import { AccountNavigator } from "./account-navigator";
import { Index as RoleNavigator } from "./navigator";
import { useLayout } from "@root/layout/layout-provider";

export type NavigatorProps = DrawerProps & {
  app: ReturnType<typeof useApp>;
};

function Navigator({ app, ...props }: NavigatorProps) {
  const classes = useClasses();
  console.log(useLayout());
  return (
    <Drawer variant="permanent" {...props}>
      <List component="nav" disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          ECOURSE
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              secondary: classes.secondary,
            }}
            secondary={app?.user?.email}
            style={{ fontWeight: "bolder" }}
          >
            {app?.user?.name}
          </ListItemText>
        </ListItem>
        {app.user ? <RoleNavigator app={app} /> : null}
        <AccountNavigator />
      </List>
    </Drawer>
  );
}

export default Navigator;

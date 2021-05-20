import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useClasses } from "@root/layout/styles";
import { useLayout } from "@root/layout/layout-provider";

export type Item = {
  path: string;
  icon: React.ReactNode;
  label: string;
  pageTitle: string;
};

type Props = {
  items: Item[];
};

export const ListRenderer = ({ items }: Props) => {
  const classes = useClasses();
  const { navigate, updateTitle } = useLayout();

  const handler = ({ path, pageTitle }: Item) => {
    return () => {
      updateTitle(pageTitle);
      navigate(path)();
    };
  };
  return (
    <List component="div">
      {items.map((item) => (
        <ListItem
          onClick={handler(item)}
          key={item.path}
          button
          className={classes.item}
        >
          <ListItemIcon className={classes.itemIcon}>{item.icon}</ListItemIcon>
          <ListItemText
            classes={{ primary: classes.itemPrimary }}
            primary={item.label}
          />
        </ListItem>
      ))}
    </List>
  );
};

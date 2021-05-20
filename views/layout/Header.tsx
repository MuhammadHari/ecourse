import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { useApp } from "@providers/app-provider";
import { Box, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { useNavigate } from "@hooks/use-navigate";
import { AccountBox, ExitToApp, Menu } from "@material-ui/icons";
import { useLayout } from "@root/layout/layout-provider";

const lightColor = "rgba(255, 255, 255, 0.7)";

const useClasses = makeStyles((theme) => ({
  secondaryBar: {},
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
}));

interface HeaderProps {
  onDrawerToggle: () => void;
  app: ReturnType<typeof useApp>;
}

const UserAppbar = ({ onDrawerToggle }: HeaderProps) => {
  const classes = useClasses();
  const { pageTitle, secondNavigator } = useLayout();
  const theme = useTheme();
  const isIsm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="sticky"
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
              }}
              item
              xs
            >
              {isIsm ? (
                <IconButton onClick={onDrawerToggle}>
                  <Menu style={{ color: "white" }} />
                </IconButton>
              ) : null}
              <Typography
                color="inherit"
                style={{
                  fontWeight: "bolder",
                }}
              >
                {pageTitle}
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        {secondNavigator ? <Toolbar>{secondNavigator}</Toolbar> : null}
      </AppBar>
    </React.Fragment>
  );
};

const guestButtons = [
  {
    path: "/sign-up",
    icon: ExitToApp,
    label: "Sign up",
    variant: "outlined",
  },
  {
    path: "/sign-in",
    icon: AccountBox,
    label: "Sign in",
    variant: "contained",
    color: "primary",
  },
];

const GuestAppBar = (_: HeaderProps) => {
  const { navigateHandler } = useNavigate();
  return (
    <>
      <AppBar color="default">
        <Toolbar>
          <Typography style={{ fontWeight: "bolder" }} variant="button">
            E-COURSE
          </Typography>
          <Box marginLeft="auto" display="flex">
            {guestButtons.map(({ path, label, ...rest }) => (
              <Box key={path} marginRight={1}>
                <Button
                  onClick={navigateHandler(path)}
                  {...(rest as ButtonProps)}
                >
                  {label}
                </Button>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export const Header = (props: HeaderProps) => {
  const {
    app: { user },
  } = props;
  const Node = user ? UserAppbar : GuestAppBar;
  return <Node {...props} />;
};

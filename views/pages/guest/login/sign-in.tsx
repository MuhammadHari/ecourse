import * as React from "react";
import { Layout } from "@guest-pages/shared/layout";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { authService } from "@services/auth";
import { FormField } from "@fields/form-field";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";
import { UserModelType } from "@root/models";
import { useApp } from "@providers/app-provider";

const useLogin = authService.login;

const useClasses = makeStyles((theme) => ({
  field: {},
  submitContainer: {
    position: "absolute",
    botttom: theme.spacing(3),
  },
}));

const fields = [
  { name: "email", type: "email", label: "Your email" },
  { name: "password", type: "password", label: "Your Password" },
];

const Form = observer(() => {
  const { result, provider: Provider, handler } = useLogin({});
  const classes = useClasses();
  const app = useApp();
  const [user, { fetch }] = useFetchQuery<UserModelType>({
    queryKey: RootStoreBaseQueries.queryAuth,
  });
  const { navigateHandler } = useNavigate();
  const showModal = useSuccessModal({
    callback: navigateHandler("/dashboard"),
    depedencies: Boolean(result),
    disableAutoShow: true,
    message: !user ? "" : `Welcome ${user.name}`,
  });
  React.useEffect(() => {
    if (user) {
      app.updateUser(user);
      showModal();
    }
  }, [user]);
  React.useEffect(() => {
    if (result) {
      fetch({});
    }
  }, [result]);
  return (
    <Provider>
      <form onSubmit={handler}>
        {fields.map(({ name, ...rest }) => (
          <Box paddingY={3} key={name}>
            <FormField
              fullWidth
              variant="filled"
              name={name}
              InputProps={{
                disableUnderline: true,
              }}
              {...rest}
              className={classes.field}
            />
          </Box>
        ))}
        <div className={classes.submitContainer}>
          <Button variant="outlined" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </Provider>
  );
});

export const SignIn = () => {
  return (
    <Layout>
      <Grid
        style={{
          background: "transparent",
          zIndex: 2,
          position: "absolute",
          top: 0,
          minHeight: "80vh",
        }}
        container
      >
        <Grid item sm={12} md={6} style={{ display: "flex" }}>
          <Box flexGrow={1} display="flex" padding={5}>
            <Paper style={{ flexGrow: 1 }}>
              <Box padding={5}>
                <Typography variant="h3">Sign in</Typography>
                <Form />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Typography style={{ color: "white" }} variant="h1">
            Welcome
          </Typography>
          <Typography>Did not have an account ?</Typography>
          <Box>
            <Button fullWidth variant="outlined" color="default">
              Click here to sign up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

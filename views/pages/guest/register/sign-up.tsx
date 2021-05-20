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
import { useSuccessModal } from "@hooks/use-success-modal";
import { useNavigate } from "@hooks/use-navigate";

const useSignUp = authService.register;

const useClasses = makeStyles((theme) => ({
  field: {},
  submitContainer: {
    position: "absolute",
    botttom: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const fields = [
  { name: "name", type: "text", label: "Name" },
  { name: "email", type: "email", label: "Your email" },
  { name: "password", type: "password", label: "Your Password" },
  {
    name: "passwordConfirmation",
    type: "password",
    label: "Confirm your Password",
  },
];

const Form = observer(() => {
  const {
    result,
    provider: Provider,
    handler,
  } = useSignUp({
    inputParser: ({ passwordConfirmation, ...args }) => {
      return {
        args: {
          ...args,
          password_confirmation: passwordConfirmation,
        },
      };
    },
  });

  const classes = useClasses();
  const { navigateHandler } = useNavigate();
  useSuccessModal({
    callback: navigateHandler("/sign-in"),
    depedencies: Boolean(result),
    message: `Please login with your account`,
  });
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
            Register now !
          </Button>
        </div>
      </form>
    </Provider>
  );
});

export const SignUp = () => {
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
          <Typography>Already has an account ?</Typography>
          <Box>
            <Button fullWidth variant="outlined" color="default">
              Click here to sign in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

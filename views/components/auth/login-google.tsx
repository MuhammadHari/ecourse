import * as React from 'react';
import {Button} from '@material-ui/core'
import {useGoogleLogin} from "@hooks/use-google-login";
import {useAuth} from "@providers/auth-provider";

export const LoginGoogle = (): React.ReactElement => {
  const onLogin = useGoogleLogin();
  const {user} = useAuth();
  return (
    <div>
      <Button onClick={onLogin}>
        Show login popup
      </Button>
      <div>
        Current user
        <p>
          {user ? user.name : "-"}
        </p>
      </div>
    </div>
  );
};

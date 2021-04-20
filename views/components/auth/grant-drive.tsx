import * as React from 'react';
import {useGrantDrive} from "@hooks/use-grant-drive";
import {Button} from "@material-ui/core";
import {useAuth} from "@providers/auth-provider";

export const GrantDrive = () => {

  const [fetch, show] = useGrantDrive();
  const {user} = useAuth();
  return ! show ? null : (
    <div>
      <Button onClick={fetch}>
        Request G drive access
      </Button>
      <p>
        {
          user.is_drive_granted ? "granted" : "not granted"
        }
      </p>
    </div>
  );
};

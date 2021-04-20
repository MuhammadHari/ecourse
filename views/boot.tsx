import * as React from 'react';
import { GapiProvider } from '@providers/gapi-provider';
import { GraphqlProvider } from '@providers/graphql-provider';
import { AuthProvider } from '@providers/auth-provider';
import { LoginGoogle } from "@components/auth/login-google";
import {GrantDrive} from "@components/auth/grant-drive";

type Props = {

};
export const Boot = (props: Props) => (
  <GraphqlProvider>
    <GapiProvider>
      <AuthProvider>
        <LoginGoogle/>
        <div>
          <h1>Google drive grant</h1>
          <GrantDrive/>
        </div>
      </AuthProvider>
    </GapiProvider>
  </GraphqlProvider>
);

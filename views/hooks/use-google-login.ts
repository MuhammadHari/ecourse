import {useAuth} from "@providers/auth-provider";
import * as React from "react";
import {useGetGoogleRedirectQuery} from "@graphql-schema";
import {useWindowPopup} from "@hooks/use-window-popup";

type UseGoogleLogin = () =>void;

export function useGoogleLogin() : UseGoogleLogin{
  const {data} = useGetGoogleRedirectQuery();
  const url = data && data.gRedirect ? data.gRedirect : "";
  const {refresh} = useAuth();
  const handler = useWindowPopup({
    onDataReceived: refresh,
    url,
    pageTitle : "Login with Google",
    dataKey : "status"
  })
  return handler;
}

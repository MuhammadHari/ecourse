import {useAuth} from "@providers/auth-provider";
import {useGetGDriveRedirectLazyQuery} from "@graphql-schema";
import {useEffect} from "react";
import {useWindowPopup} from "@hooks/use-window-popup";

type UseGrantDrive = [()=>void, boolean];

export function useGrantDrive(): UseGrantDrive{
  const {user, refresh} = useAuth();
  const [fetch, {data}] = useGetGDriveRedirectLazyQuery()
  useEffect(()=>{
    if (user){
      fetch();
    }
  }, [user, fetch])
  const url = data && data.dRedirect ? data.dRedirect : "";
  const handler = useWindowPopup({
    onDataReceived: refresh,
    url,
    pageTitle : "Login with Google",
    dataKey : "status"
  });
  return [
    handler,
    Boolean(user)
  ]
}

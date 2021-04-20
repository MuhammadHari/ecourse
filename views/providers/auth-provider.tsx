import * as React from 'react';
import {User, useAuthQuery} from '../graphql/schema'

interface IAuthProvider{
  user: User|null
  isLogin: boolean
  refresh():void
}

const Context = React.createContext<IAuthProvider|null>(null);
export const useAuth = (): IAuthProvider => React.useContext(Context)

export const AuthProvider = (props: any) =>{
  const {data, loading, refetch : refresh} = useAuthQuery();
  const isLogin = Boolean(data && data.auth);
  return (
    <Context.Provider value={{
      isLogin,
      user :isLogin ? data.auth : null,
      refresh
    }} >
      {loading ? "loading" : props.children}
    </Context.Provider>
  )
}

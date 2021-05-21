/* eslint-disable */
import * as React from "react";
import { GraphQLClient } from "graphql-request";
import { Role, RootStore, RootStoreType, StoreContext, useQuery } from "@model";
import { StudentPage } from "@pages/student";
import { TeacherRoutes } from "@pages/teacher";
import { AdminRoute } from "@pages/admin";
import { Guest } from "@guest-page";
import { observer } from "mobx-react";
import { useToggle } from "@hooks/use-toggle";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { VerifiedUser } from "@material-ui/icons";
import Paperbase from "@root/layout/Paperbase";

type State = {
  user: null | Application.AppUser;
  loading: boolean;
  mode: Role;
};

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: new GraphQLClient("/graphql", {
    credentials: "include",
  }),
});

window.rootStore = rootStore;

type UseApp = {
  updateUser(user: State["user"]): void;
  updateMode(mode: State["mode"]): void;
} & Omit<State, "loading">;

const Context = React.createContext<UseApp | null>(null);

export function useApp() {
  return React.useContext(Context) as UseApp;
}

const Dev = observer(() => {
  const { data, setQuery } = useQuery<any>((root) => root.queryAuth());
  const { updateUser, user } = useApp();
  const [hover, { force }] = useToggle();

  const doLogin = () =>
    setQuery((store) =>
      store.mutateLogin({ email: "harizula@gmail.com", password: "password" })
    );
  const qAuth = () => setQuery((store) => store.queryAuth());

  React.useEffect(() => {
    if (data && data.login) {
      qAuth();
    }
    if (data && typeof data.auth !== "undefined") {
      updateUser(data.auth);
    }
  }, [data]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      open={hover}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
      }}
      onMouseEnter={force(true)}
      onMouseLeave={force(false)}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        onClick={doLogin}
        FabProps={{
          disabled: Boolean(user),
        }}
        tooltipTitle="Login"
        icon={<VerifiedUser />}
      />
    </SpeedDial>
  );
});

export class AppProvider extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      mode: Role.Adm,
    };
  }

  updateMode = (mode: State["mode"]) => {
    this.setState({ mode });
  };

  updateUser = (user: State["user"]) => {
    this.setState({
      user,
      loading: false,
      mode: user?.role as Role,
    });
  };

  getContextValue = (): UseApp => ({
    ...this.state,
    updateMode: this.updateMode,
    updateUser: this.updateUser,
  });

  getChild = () => {
    const { user, mode } = this.state;
    if (!user) {
      return Guest;
    }
    const Node: Record<State["mode"], React.ComponentType> = {
      Teacher: TeacherRoutes,
      Student: StudentPage,
      Adm: AdminRoute,
    };
    return Node[mode];
  };

  render() {
    const { loading } = this.state;
    const Child = this.getChild();
    return (
      <Context.Provider value={this.getContextValue()}>
        <StoreContext.Provider value={rootStore}>
          <Paperbase app={this.getContextValue()}>
            {loading ? "loading" : <Child />}
          </Paperbase>
          <Dev />
        </StoreContext.Provider>
      </Context.Provider>
    );
  }
}

declare global {
  interface Window {
    rootStore: RootStoreType;
  }
}

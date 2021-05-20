import * as React from "react";
import { useApp } from "@providers/app-provider";
import { useContext, useState } from "react";
import { useNavigate } from "@hooks/use-navigate";

type SecondNavigator = {
  label: string;
  key: string;
};

function useProvider({ app }: Props) {
  const [pageTitle, setPageTitle] = useState<string>("Home");
  const { navigateHandler } = useNavigate();
  const [secondNavigator, setSecondNavigator] =
    useState<React.ReactNode | null>(null);
  return {
    app,
    navigate: navigateHandler,
    pageTitle,
    secondNavigator,
    updateTitle: setPageTitle,
    updateNav: setSecondNavigator,
  };
}

type UseLayout = ReturnType<typeof useProvider>;

const Context = React.createContext<null | UseLayout>(null);

export function useLayout(): UseLayout {
  return useContext(Context) as UseLayout;
}

type Props = {
  app: ReturnType<typeof useApp>;
};

export const LayoutProvider = (props: React.PropsWithChildren<Props>) => {
  const ctx = useProvider(props);
  return <Context.Provider value={ctx}>{props.children}</Context.Provider>;
};

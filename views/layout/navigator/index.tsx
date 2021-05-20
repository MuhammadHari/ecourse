import * as React from "react";
import { useApp } from "@providers/app-provider";
import { Role } from "@root/models";
import { Admin } from "./admin";
import { Teacher } from "./teacher";
import { Student } from "./student";

type Props = {
  app: ReturnType<typeof useApp>;
};

const cMap: Record<Role, React.ComponentType> = {
  Adm: Admin,
  Teacher,
  Student,
};

export const Index = ({ app }: Props) => {
  if (!app.user) return null;
  const {
    user: { role },
  } = app;
  if (!role) return null;
  const Node = cMap[role];
  return <Node />;
};

import * as React from "react";
import { observer } from "mobx-react";
import { Wrap, useShowClassrom } from "./provider";
import { Path } from "./type";
import { General } from "./general";
import { Student } from "./student";
import { Content } from "./content";

const cMap: Record<Path, React.ComponentType> = {
  general: General,
  contents: Content,
  students: Student,
};

const Show = observer(() => {
  const { path } = useShowClassrom();
  const Component = cMap[path];
  return <Component />;
});

export const page = {
  component: Wrap(Show),
  path: "/classroom/:id",
};

import * as React from "react";
import { ShowContext, Path } from "./type";
import { Tab, Tabs } from "@material-ui/core";

type Props = {
  ctx: Omit<ShowContext, "classroom">;
};

type Item = {
  path: Path;
  label: string;
};

const items: Item[] = [
  { path: "general", label: "Informasi umum" },
  { path: "students", label: "Siswa" },
  { path: "contents", label: "Konten" },
];

export const Navigator = ({ ctx }: Props) => {
  return (
    <Tabs value={ctx.path} onChange={(e, v: Path) => ctx.updatePath(v)}>
      {items.map((item) => (
        <Tab value={item.path} key={item.path} label={item.label} />
      ))}
    </Tabs>
  );
};

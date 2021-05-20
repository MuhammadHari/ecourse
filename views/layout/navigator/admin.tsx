import * as React from "react";
import { Item, ListRenderer } from "./list-renderer";
import { Class, People } from "@material-ui/icons";

const items: Item[] = [
  {
    icon: <Class />,
    label: "Ruang kelas",
    path: "/classroom",
    pageTitle: "Ruang kelas",
  },
  {
    icon: <People />,
    label: "Siswa",
    path: "/student",
    pageTitle: "Siswa",
  },
  {
    icon: <People />,
    label: "Pengajar",
    path: "/teacher",
    pageTitle: "Pengajar",
  },
];

export const Admin = () => {
  return <ListRenderer items={items} />;
};

import { ClassRoomModelType } from "@root/models";

export type Path = "general" | "students" | "contents";
export type ShowContext = {
  path: Path;
  classroom: ClassRoomModelType;
  updatePath(path: Path): void;
};

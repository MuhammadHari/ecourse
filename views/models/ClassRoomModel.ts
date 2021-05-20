/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Instance } from "mobx-state-tree";
import { ClassRoomModelBase } from "./ClassRoomModel.base";
import { Grade } from "@models/GradeEnum";
import voca from "voca";
import { gradeMaps } from "@utils/grade-tranform";

/* The TypeScript type of an instance of ClassRoomModel */
export interface ClassRoomModelType
  extends Instance<typeof ClassRoomModel.Type> {}

/* A graphql query fragment builders for ClassRoomModel */
export {
  selectFromClassRoom,
  classRoomModelPrimitives,
  ClassRoomModelSelector,
} from "./ClassRoomModel.base";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore

/**
 * ClassRoomModel
 */
export const ClassRoomModel = ClassRoomModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
})).views((self) => ({
  get gradeLabel(): string {
    if (!self.grade) return "";
    return self.grade;
  },
}));

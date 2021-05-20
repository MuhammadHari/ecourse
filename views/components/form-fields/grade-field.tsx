import * as React from "react";
import { gradeUtils } from "@utils/grade-tranform";
import { selectFieldFactory } from "@fields/select-field";

const options = gradeUtils.map.map((item) => ({
  value: item.grade,
  label: item.label,
}));
export const GradeField = selectFieldFactory(options);

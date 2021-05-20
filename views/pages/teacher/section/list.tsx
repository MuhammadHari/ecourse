import * as React from "react";
import { ClassroomPage, ClassroomPageProps } from "@components/classroom-page";
import { ClassRoomModelSelector } from "@root/models";
import { observer } from "mobx-react";
import { SectionBatchUpdater } from "./section-batch-updater";
import { Create } from "./create";
import { Update } from "./update";

const List = observer(({ classroom }: ClassroomPageProps) => {
  return (
    <>
      <SectionBatchUpdater classroom={classroom} />
      <Create />
      <Update />
    </>
  );
});

const builder =
  new ClassRoomModelSelector().id.grade.sectionCount.studentCount.sections(
    (instance) =>
      instance.id.sequence.title.createdAt.classroomId.createdAt.updatedAt
  );
export const page = {
  component: ClassroomPage(List, "classRoomId", () => builder),
  path: "/section/:classRoomId",
};

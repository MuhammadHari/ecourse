import * as React from "react";
import { observer } from "mobx-react";
import { useClassroomPage } from "@components/classroom-page";
import { sectionService } from "@services/sections";
import { Box, Button } from "@material-ui/core";
import { FormField } from "@fields/form-field";
import { useSuccessModal } from "@hooks/use-success-modal";

const useCreate = sectionService.createSection;

export const Create = observer(() => {
  const { refresh, classroom } = useClassroomPage();
  const {
    handler,
    provider: Provider,
    result,
  } = useCreate({
    injectInput: {
      classroomId: classroom.id,
      sequence: (classroom.sectionCount as number) + 1,
    },
  });
  useSuccessModal({
    callback: refresh,
    depedencies: Boolean(result),
    message: "New section has been added",
  });
  return (
    <Provider>
      <form onSubmit={handler}>
        <Box display="flex">
          <Box width="70%">
            <FormField fullWidth name="title" label="title" />
          </Box>
          <Box width="30%">
            <Button type="submit">Save</Button>
          </Box>
        </Box>
      </form>
    </Provider>
  );
});

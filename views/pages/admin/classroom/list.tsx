import * as React from "react";
import { observer } from "mobx-react";
import { Box, Grid } from "@material-ui/core";
import { useNavigate } from "@hooks/use-navigate";
import { ClassroomCard, Props as CardProps } from "./classroom-card";
import { classroomServices } from "@services/classroom";
import { KeyboardArrowRight } from "@material-ui/icons";

const { queryAllClassroom } = classroomServices;

const List = observer(() => {
  const { loading, fetch, classrooms } = queryAllClassroom();
  React.useEffect(() => {
    fetch();
  }, []);
  const { navigateHandler } = useNavigate();
  const actions = (model: any) =>
    [
      {
        startIcon: <KeyboardArrowRight />,
        onClick: navigateHandler("/classroom/:id", { id: model.id }),
        title: "Atur kelas",
        style: {
          borderColor: "white",
          color: "white",
        },
      },
    ] as unknown as CardProps["buttons"];

  return (
    <div>
      <Grid container component={Box} paddingY={2}>
        {classrooms?.map((classroom) => (
          <Grid item key={classroom.id} sm={12} md={4}>
            <Box padding={2}>
              <ClassroomCard
                buttons={actions(classroom)}
                classroom={classroom}
                key={classroom.id}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

export const page = {
  component: List,
  path: "/classroom",
};

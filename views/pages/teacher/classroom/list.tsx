import * as React from "react";
import { observer } from "mobx-react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { ClassRoomModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { Box, Grid } from "@material-ui/core";
import { useNavigate } from "@hooks/use-navigate";
import { FormField } from "@fields/form-field";
import { ClassroomCard, Props as CardProps } from "./classroom-card";
import { classroomServices } from "@services/classroom";

const { queryAllClassroom } = classroomServices;

const List = observer(() => {
  const { loading, fetch, classrooms } = queryAllClassroom();
  React.useEffect(() => {
    fetch();
  }, []);
  const { navigateHandler } = useNavigate();
  console.log(classrooms);

  const actions = (model: any) => [] as CardProps["buttons"];

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
      {/*<MuiList>*/}
      {/*  {data?.map((model) => (*/}
      {/*    <ListItem button key={model.id}>*/}
      {/*      <ListItemSecondaryAction>*/}
      {/*        {actions(model).map((item) => (*/}
      {/*          <Tooltip title={item.title} key={item.title}>*/}
      {/*            <IconButton onClick={item.onClick}>{item.icon}</IconButton>*/}
      {/*          </Tooltip>*/}
      {/*        ))}*/}
      {/*      </ListItemSecondaryAction>*/}
      {/*      <ListItemText primary={model.title} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</MuiList>*/}
    </div>
  );
});

export const page = {
  component: List,
  path: "/classroom",
};

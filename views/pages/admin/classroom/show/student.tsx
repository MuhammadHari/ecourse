import * as React from "react";
import {
  UserDataTableProvider,
  UserDataTable,
} from "../../shared/user-data-table";
import { useShowClassrom } from "./provider";
import { RootStoreBaseQueries } from "@root-model";
import { Grade } from "@root/models";
import { observer } from "mobx-react";
import { Box, Grid, Typography } from "@material-ui/core";
import { UserForm } from "../../shared/user-form";
import { CreateStudentForm } from "@pages/admin/student";

export const Student = observer(() => {
  const { classroom } = useShowClassrom();

  return (
    <UserDataTableProvider
      query={RootStoreBaseQueries.queryStudents}
      grade={classroom.grade as Grade}
    >
      <Grid container>
        <Grid item sm={12} md={8} lg={6}>
          <UserDataTable hideGrade />
        </Grid>
        <Grid item sm={12} md={4} lg={6}>
          <Box paddingX={2}>
            <Typography variant="h4">Tambah Siswa</Typography>
            <Box padding={2}>
              <CreateStudentForm grade={classroom.grade as Grade} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </UserDataTableProvider>
  );
});

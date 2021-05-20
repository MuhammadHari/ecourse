import React from "react";
import { UserDataTable, UserDataTableProvider } from "./shared/user-data-table";
import { RootStoreBaseQueries } from "@root-model";
import { Box, Grid, Typography } from "@material-ui/core";
import { UserForm } from "./shared/user-form";
import { userService } from "@services/user";
import { observer } from "mobx-react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { usePaginatorContext } from "@hooks/use-paginator";
import { Grade } from "@root/models";
import { gradeUtils } from "@utils/grade-tranform";

const useCreate = userService.student.create;

export const CreateStudentForm = observer(({ grade }: { grade?: Grade }) => {
  const {
    provider: Provider,
    loading,
    handler,
    result,
    form,
  } = useCreate({
    injectInput: {
      role: "Student",
    },
    inputParser({ password_confirmation: _, ...rest }) {
      return rest;
    },
  });

  React.useEffect(() => {
    if (grade) {
      console.log(gradeUtils.find(grade).roman);
      form.setValue("grade", gradeUtils.find(grade).grade);
    }
  }, []);

  const { go } = usePaginatorContext();
  useSuccessModal({
    callback() {
      form.reset({});
      go(1);
    },
    depedencies: Boolean(result),
    message: "Siswa berhasil di tambah",
  });

  return (
    <Provider>
      <UserForm
        readonlyGrade={Boolean(grade)}
        loading={loading}
        handler={handler}
      />
    </Provider>
  );
});

const Component = () => {
  return (
    <UserDataTableProvider query={RootStoreBaseQueries.queryStudents}>
      <Grid container>
        <Grid item sm={12} md={8} lg={6}>
          <UserDataTable />
        </Grid>
        <Grid item sm={12} md={4} lg={6}>
          <Box paddingX={2}>
            <Typography variant="h4">Tambah Siswa</Typography>
            <Box padding={2}>
              <CreateStudentForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </UserDataTableProvider>
  );
};

export const Student = {
  path: "/student",
  component: Component,
};

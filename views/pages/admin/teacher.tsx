import React from "react";
import { UserDataTable, UserDataTableProvider } from "./shared/user-data-table";
import { RootStoreBaseQueries } from "@root-model";
import { Box, Grid, Typography } from "@material-ui/core";
import { UserForm } from "./shared/user-form";
import { userService } from "@services/user";
import { observer } from "mobx-react";
import { useSuccessModal } from "@hooks/use-success-modal";
import { usePaginatorContext } from "@hooks/use-paginator";

const useCreate = userService.teacher.create;

const CreateStudentForm = observer(() => {
  const {
    provider: Provider,
    loading,
    handler,
    result,
    form,
  } = useCreate({
    injectInput: {
      role: "Teacher",
    },
    inputParser({ password_confirmation: _, ...rest }) {
      return rest;
    },
  });
  const { go } = usePaginatorContext();
  useSuccessModal({
    callback() {
      form.reset({});
      go(1);
    },
    depedencies: Boolean(result),
    message: "Pengajar berhasil di tambah",
  });

  return (
    <Provider>
      <UserForm disableGrade loading={loading} handler={handler} />
    </Provider>
  );
});

const Component = () => {
  return (
    <UserDataTableProvider query={RootStoreBaseQueries.queryTeachers}>
      <Grid container>
        <Grid item sm={12} md={8} lg={6}>
          <UserDataTable />
        </Grid>
        <Grid item sm={12} md={4} lg={6}>
          <Box paddingX={2}>
            <Typography variant="h4">Tambah Pengajar</Typography>
            <Box padding={2}>
              <CreateStudentForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </UserDataTableProvider>
  );
};

export const Teacher = {
  path: "/teacher",
  component: Component,
};

import * as React from "react";
import { observer } from "mobx-react";
import { GradeField } from "@fields/grade-field";
import { FormField } from "@fields/form-field";
import { Box, Button } from "@material-ui/core";

const base = [
  { name: "name", label: "Nama" },
  { name: "email", label: "Email" },
  { name: "password", label: "Masukan password", type: "password" },
  {
    name: "password_confirmation",
    label: "Konfirmasi password",
    type: "password",
  },
];

type Props = {
  loading: boolean;
  disableGrade?: boolean;
  handler: (e: any) => any;
  readonlyGrade?: boolean;
};

export const UserForm = observer(
  ({
    handler,
    loading,
    disableGrade = false,
    readonlyGrade = false,
  }: Props) => {
    return (
      <form onSubmit={handler}>
        {base.map((item) => (
          <Box mb={2} key={item.name}>
            <FormField
              fullWidth
              size="small"
              variant="outlined"
              disabled={loading}
              {...item}
              key={item.name}
            />
          </Box>
        ))}
        <Box mb={2}>
          {!disableGrade ? (
            <GradeField
              size="small"
              variant="outlined"
              disabled={loading || readonlyGrade}
              name="grade"
              label="Jenjang"
            />
          ) : null}
        </Box>
        <Button type="submit" disabled={loading} variant="outlined">
          Simpan
        </Button>
      </form>
    );
  }
);

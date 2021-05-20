import * as React from "react";
import { RootStoreBaseQueries } from "@root-model";
import {
  usePaginator,
  PaginatorProvider,
  usePaginatorContext,
} from "@hooks/use-paginator";
import { Grade, UserModelSelector, UserModelType } from "@root/models";
import { observer } from "mobx-react";
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useBreakpoint } from "@hooks/use-breakpoint";
import { gradeUtils } from "@utils/grade-tranform";
import { find } from "lodash";

type Props = {
  query:
    | RootStoreBaseQueries.queryStudents
    | RootStoreBaseQueries.queryTeachers;
  grade?: Grade;
};

const modelBuilder = (instance: UserModelSelector) =>
  instance.email.id.name.role.grade.created_at.updated_at;

const useClasses = makeStyles(() => ({
  cell: {
    background: "white",
  },
}));

const Head = ({ hideGrade }: { hideGrade: boolean }) => {
  const classes = useClasses();
  const items = ["Nama", "Email"];
  if (!hideGrade) {
    items.push("Jenjang");
  }
  return (
    <TableHead>
      <TableRow>
        {items.map((item) => (
          <TableCell className={classes.cell} key={item}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const Row = ({
  user,
  hideGrade,
}: {
  user: UserModelType;
  hideGrade: boolean;
}) => {
  const { name, email, gradeLabel } = user;
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      {!hideGrade ? <TableCell>{gradeLabel}</TableCell> : null}
    </TableRow>
  );
};

export const UserDataTableProvider = observer(
  ({ query, children, grade }: React.PropsWithChildren<Props>) => {
    const args: any = {
      queryKey: query,
      modelBuilder,
    };
    if (grade) {
      const searchGrade = find(gradeUtils.map, { grade });
      if (searchGrade)
        args.initial = {
          grade: searchGrade.roman,
        };
    }
    const ctx = usePaginator<UserModelType>(args);
    return (
      <PaginatorProvider.Provider value={ctx}>
        {children}
      </PaginatorProvider.Provider>
    );
  }
);

export const UserDataTable = observer(
  ({ hideGrade = false }: { hideGrade?: boolean }) => {
    const { data, paginator, go } = usePaginatorContext<UserModelType>();
    const isMd = useBreakpoint("md");
    return (
      <Paper elevation={4}>
        <Box padding={2} paddingX={0}>
          <TableContainer style={{ height: "70vh" }}>
            <Table size={isMd ? "small" : "medium"} stickyHeader>
              <Head hideGrade={hideGrade} />
              <TableBody>
                {data.map((user) => (
                  <Row hideGrade={hideGrade} user={user} key={user.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box paddingTop={2}>
            <Pagination
              onChange={(e, page: number) => go(page)}
              count={paginator.lastPage}
            />
          </Box>
        </Box>
      </Paper>
    );
  }
);

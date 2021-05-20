import * as React from "react";
import { ClassRoomModelType } from "@root/models";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

export type Props = {
  classroom: ClassRoomModelType;
  buttons: Array<
    ButtonProps & {
      color?: ButtonProps["color"];
      onClick(): void;
      title: React.ReactNode;
    }
  >;
};

const useClasses = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "240px",
    position: "relative",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  info: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const ClassroomCard = ({ classroom, buttons }: Props) => {
  const classes = useClasses();
  const infos = [
    classroom.contentCount + " content",
    classroom.studentCount + " student",
  ];
  return (
    <Paper
      className={classes.root}
      style={{
        backgroundImage: `url("${classroom.photo}")`,
      }}
    >
      <Box className={classes.info}>
        <Divider />
        <Box width="100%" padding={2}>
          <Typography variant="h5" align="center">
            {classroom.gradeLabel}
          </Typography>
          <Box width="100%" display="flex">
            <Box width="50%" textAlign="center">
              <Typography>{classroom.contentCount + " konten"}</Typography>
            </Box>
            <Box width="50%" textAlign="center">
              <Typography>{classroom.studentCount + " siswa"}</Typography>
            </Box>
          </Box>
          <Box paddingY={1}>
            <ButtonGroup variant="outlined">
              {buttons.map(({ color = "primary", ...button }) => (
                <Button
                  {...button}
                  size="small"
                  color={color}
                  variant="outlined"
                  key={button.title}
                >
                  {button.title}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

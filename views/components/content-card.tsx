import * as React from "react";
import { ContentModelType } from "@root/models";
import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";

type Props = {
  content: ContentModelType;
};

const useClasses = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height: "20vh",
    },
  },
  img: {
    height: "100%",
    width: "100%",
    ...theme.shape,
  },
}));

export const ContentCard = observer(({ content }: Props) => {
  const classes = useClasses();
  return (
    <Paper>
      <Grid container className={classes.root}>
        <Grid item sm={3}>
          <img className={classes.img} src={content.thumbnail} />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Box paddingX={2}>
            <Typography variant="h4">{content.title}</Typography>
            <Divider />
            <Typography>{content.type}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
});

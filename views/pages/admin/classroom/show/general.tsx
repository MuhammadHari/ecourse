import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

export const General = () => {
  return (
    <div>
      <Grid container>
        <Grid item md={3}>
          <Paper>
            <h1>lol</h1>
          </Paper>
        </Grid>
        <Grid item sm={9}></Grid>
      </Grid>
    </div>
  );
};

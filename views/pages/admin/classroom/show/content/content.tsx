import * as React from "react";
import { observer } from "mobx-react";
import { Box, Grid, Paper } from "@material-ui/core";
import { ContentList } from "./item-switcher";
import { Provider, useContentList } from "./provider";
import { MediaPlayer } from "./media-player";
import { DraftJsViewer } from "@components/draft-js-viewer";

const Description = () => {
  const { selected } = useContentList();
  if (!selected) {
    return null;
  }
  return <DraftJsViewer data={selected.description as string} />;
};

export const Content = observer(() => {
  return (
    <Provider>
      <Grid container>
        <Grid item sm={12} md={9} lg={8}>
          <Box padding={3} paddingTop={0} paddingBottom={0}>
            <MediaPlayer />
          </Box>
          <Box marginTop={3} paddingX={3}>
            <Paper>
              <Description />
            </Paper>
          </Box>
        </Grid>
        <Grid item sm={12} md={3} lg={4}>
          <ContentList />
        </Grid>
      </Grid>
    </Provider>
  );
});

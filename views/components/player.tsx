import * as React from "react";
import { useAspectRatioBox } from "@hooks/use-aspect-ratio-box";
import "video-react/dist/video-react.css";
import { Player as ReactPlayer, PlayerInstance } from "video-react";
import { makeStyles, useTheme } from "@material-ui/core";

type PlayerProps = {
  url: string;
  onContainerClick(): void;
  play: boolean;
  enableFullScreen?: boolean;
};

const useClasses = makeStyles(() => ({
  root: {
    "& > .video-react-video": {
      display: "none!important",
    },
  },
}));

export const Player = ({
  url,
  play,
  onContainerClick,
  enableFullScreen = true,
}: PlayerProps) => {
  const theme = useTheme();
  const classes = useClasses();
  return (
    <div onClick={onContainerClick}>
      <ReactPlayer poster={""} src={url} />
    </div>
  );
};

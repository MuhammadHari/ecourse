import * as React from "react";
import { useContentList } from "./provider";
import { Typography, useTheme } from "@material-ui/core";
import { Player } from "@components/player";
import { useToggle } from "@hooks/use-toggle";
import { useEffect } from "react";

export const MediaPlayer = () => {
  const { selected } = useContentList();

  const [play, { force, inline }] = useToggle();

  useEffect(() => {
    inline(false);
  }, [selected]);
  return (
    <div>
      {!selected ? (
        <Typography variant="h3" align="center">
          Pilih salah satu konten
        </Typography>
      ) : (
        <Player
          url={selected.mediaContent as string}
          onContainerClick={force(true)}
          play={play}
        />
      )}
    </div>
  );
};

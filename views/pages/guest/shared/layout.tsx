import * as React from "react";
import { Box, useTheme } from "@material-ui/core";

export const Layout = ({ children }: React.PropsWithChildren<any>) => {
  const theme = useTheme();
  return (
    <Box position="relative" minHeight="70vh">
      <Box
        position="fixed"
        top={0}
        zIndex={0}
        left="0"
        height="50vh"
        width="100%"
        bgcolor={theme.palette.primary.light}
      />
      {children}
    </Box>
  );
};

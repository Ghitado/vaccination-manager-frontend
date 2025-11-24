import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface ScrollableTextProps {
  children: ReactNode;
  maxWidth: number | string;
}

export default function ScrollableText({
  children,
  maxWidth,
}: ScrollableTextProps) {
  return (
    <Box
      sx={{
        maxWidth,
        overflowX: "auto",
        whiteSpace: "nowrap",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bdbdbd",
        },
      }}
    >
      {children}
    </Box>
  );
}

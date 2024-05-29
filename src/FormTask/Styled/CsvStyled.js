import { Box } from "@mui/material";
import { styled } from "@mui/material";
export const CsvWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  justifyContent: "space-around",
}));

export const CardWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: "100%",
  height: "100%",
}));

export const CardContent = styled(Box)(() => ({
  display: "flex",
  gap: "5px",
  justifyContent: "center",
  alignItems: "center",
}));

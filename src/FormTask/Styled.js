import { Avatar } from "@mui/material";
import { Card, Paper, Box, InputBase } from "@mui/material";
import { styled } from "@mui/material";

export const CustomCard = styled(Card)(() => ({
  width: "30%",
  height: "150px",
  backgroundColor: "skyblue",

  [`&:hover`]: {
    backgroundColor: "#1976d2",
    color: "white",
  },
}));

export const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  color: "rgb(13, 25, 51)",
  marginLeft: 0,
  width: "50%",
  // backgroundColor: "rgb(13, 25, 51)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgb(13, 25, 51)",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "rgb(13, 25, 51) !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "rgb(13, 25, 51)",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "38ch",
      },
    },
  },
}));

export const CustomAvatar = styled(Avatar)(() => ({
  position: "absolute !important",
  left: "54% !important",
  top: "27% !important",
  width: "8.5% !important",
  height: " 100px !important",
  border: "2px solid white",
}));

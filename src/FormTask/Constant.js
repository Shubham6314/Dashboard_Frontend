import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export const icons = [
  {
    id: 0,
    icon: <InstagramIcon style={{ color: "rgb(209, 76, 85)" }} />,
  },
  {
    id: 1,
    icon: <FacebookIcon style={{ color: "rgb(76, 134, 209)" }} />,
  },
  {
    id: 2,
    icon: <XIcon style={{ color: "black" }} />,
  },
  {
    id: 3,
    icon: <LinkedInIcon style={{ color: "rgba(18, 54, 101, 0.709)" }} />,
  },
];

export const adminList = [
  { label: "All Users", route: "/dashboard" },
  { label: "Profile", route: "/dashboard/profile" },
  { label: "CSV", route: "/dashboard/CSV" },
  { label: "Active Users", route: "/dashboard/activeusers" },
  { label: "Trash", route: "/dashboard/trash" },
];
export const userList = [
  { label: "All Users", route: "/dashboard" },
  { label: "Profile", route: "/dashboard/profile" },
];

export const navItems = [
  { label: "Home", route: "/navbar" },
  { label: "About", route: "about" },
  { label: "Contact", route: "contact" },
];
export const ERROR = "error";

export const BASE_URL = "http://localhost:8080/";

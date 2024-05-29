import { React } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, Box } from "@mui/material";
import { icons } from "./Constant";

export default function ViewProfileCard({ data, onClose }) {
  const userData = data;

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Card
          sx={{
            maxWidth: 345,
            bgcolor: "white",
          }}
        >
          <CardMedia
            sx={{ height: 200 }}
            image="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Name : {userData?.name}
            </Typography>
            <Typography variant="subtitle1">
              Associate Software Engineer
            </Typography>
            <Typography variant="body1">Email : {userData?.email}</Typography>
            <Typography variant="body1">Role : {userData?.role}</Typography>

            <Box>
              {icons.map((x) => (
                <IconButton>{x.icon}</IconButton>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

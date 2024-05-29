import { React, useState, useContext, useEffect } from "react";
import {
  IconButton,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { icons } from "./Constant";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { BasicModal } from "./Modal";
import axios from "axios";
import { userContext } from "./useContext";
import { CustomAvatar } from "./Styled";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "./Constant";

export default function ProfileCard() {
  const context = useContext(userContext);
  const [user, setUser] = useState({});
  const [image, setimage] = useState("");
  const [imgData, setImgData] = useState({
    img: "",
    id: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    if (userData) {
      setUser(userData);
    }
  }, [image, open]);

  const getData = async (data) => {
    const response = await axios.put(`${BASE_URL}api/user/uploadimage`, data);
    if (response) {
      console.log(response, "response");
      setimage(response.data.img);
      setUser({ ...user, img: response.data.img });
      console.log("Api did hit upload", response.data);
    } else {
      console.log("error in hitting the api upload");
    }
  };
  const onlyUser = async (e) => {
    try {
      let reader = new FileReader();
      let value = reader.readAsDataURL(e.target.files[0]);

      reader.onload = (e) => {
        if (e.loaded) {
          getData({ ...imgData, img: reader.result, id: user._id });
          setimage(reader.result);
          let user_img = JSON.parse(localStorage.getItem("user"));
          user_img.img = reader.result;
          if (user_img?.img) {
            setUser(user_img);
          }
          localStorage.setItem("user", JSON.stringify(user_img));
        } else {
          context.setSnackbar({
            state: true,
            message: `Image size is too big`,
          });
        }
      };
    } catch (error) {
      console.log(" Error", error);
    }
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Card
          sx={{
            maxWidth: 345,
            bgcolor: "white",
          }}
        >
          <Box height={"150px"} bgcolor={"#1976d2"}>
            <Box display={"flex"} justifyContent={"flex-end"} padding={"5px"}>
              <label for="file-upload">
                <EditIcon
                  sx={{
                    width: 30,
                    height: 30,
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={onlyUser}
              />
            </Box>
          </Box>
          <CustomAvatar
            className="img-avtar"
            name="profileImage"
            src={user?.img || ""}
          >
            <label>
              <AddCircleOutlineIcon
                sx={{
                  width: 45,
                  height: 45,

                  color: "#3f3b3b79",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onlyUser}
            />
                   
          </CustomAvatar>

          <CardContent sx={{ marginTop: "30px" }}>
            <Typography variant="h5" component="div">
              Name : {user?.name}
            </Typography>
            <Typography variant="subtitle1">
              Associate Software Engineer
            </Typography>
            <Typography variant="body1">Email : {user?.email}</Typography>
            <Typography variant="body1">Role : {user?.role}</Typography>

            <Box>
              {icons.map((x) => (
                <IconButton>{x.icon}</IconButton>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleOpen}>
              Edit
            </Button>
          </CardActions>
        </Card>
        <BasicModal open={open} handleClose={handleClose} />
      </Box>
    </>
  );
}

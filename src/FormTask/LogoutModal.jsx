import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LogoutModal({ modal, handleClosee }) {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClosee}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6">
              Are you sure you want to log out?
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              marginTop={"10px"}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClosee}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={logOut}>
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

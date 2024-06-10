import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { userContext } from "./useContext";
import axios from "axios";
import { BASE_URL } from "./Constant";
import { useDispatch } from "react-redux";
import { increment } from "../ReduxData/Slice";
import { useGetPermanentDeleteByNameMutation } from "../services/PermanentDeleteApi";

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

export default function DeleteModal({ modal, closeModal, allData, userid }) {
  const [permanentDeleteApi, { data, isLoading, error }] =
    useGetPermanentDeleteByNameMutation();
  useEffect(() => {
    if (isLoading) return;
    if (data?.status === "success") {
      if (data) {
        dispatch(
          increment({
            state: true,
            message: data?.message,
            severity: data?.status,
          })
        );
        allData();
        closeModal();
      } else {
        dispatch(
          increment({
            state: true,
            message: data?.message,
            severity: data?.status,
          })
        );
      }
    }
  }, [data, isLoading]);
  const context = useContext(userContext);
  const dispatch = useDispatch();
  const permanentDelete = async () => {
    try {
      permanentDeleteApi({ id: userid });
    } catch (error) {
      console.log(" Error", error);
    }
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6">
              Are you sure you want to delete?
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              marginTop={"10px"}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={permanentDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

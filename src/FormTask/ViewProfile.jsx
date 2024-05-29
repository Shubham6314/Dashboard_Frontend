import { Box, Modal, Typography } from "@mui/material";
import ViewProfileCard from "./ViewProfileCard";

export const ViewModal = ({ open, data, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ViewProfileCard data={data} onClose={handleClose} />
    </Modal>
  );
};

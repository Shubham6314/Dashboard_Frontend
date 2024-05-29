import { Modal } from "@mui/material";
import SignUpPage from "./SignUpPage";

export const BasicModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SignUpPage handleClose={handleClose} />
    </Modal>
  );
};

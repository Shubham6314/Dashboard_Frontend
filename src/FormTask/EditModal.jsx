import { Modal } from "@mui/material";
import SignUpPage from "./SignUpPage";

export const EditModal = ({ openEdit, handleCloseEdit, edit, allData }) => {
  return (
    <Modal
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SignUpPage
        handleCloseEdit={handleCloseEdit}
        edit={edit}
        allData={allData}
      />
    </Modal>
  );
};

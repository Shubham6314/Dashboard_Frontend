import { Alert, Snackbar } from "@mui/material";
import { ERROR } from "./Constant";
export const SuccessSnackbar = ({ snackbar, setSnackbar }) => {
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      state: false,
      message: null,
      severity: null,
    });
  };
  return (
    <Snackbar
      open={snackbar.state}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbar.severity === "success" ? "success" : ERROR}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

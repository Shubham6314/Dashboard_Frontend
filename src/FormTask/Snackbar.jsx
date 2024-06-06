import { Alert, Snackbar } from "@mui/material";
import { ERROR } from "./Constant";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../ReduxData/Slice";
export const SuccessSnackbar = ({ snackbar, setSnackbar }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.snackbar.value);
  console.log(count, "COUNT");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      increment({
        state: false,
        message: null,
        severity: null,
      })
    );
  };
  console.log(count);
  return (
    <Snackbar
      open={count?.state}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={count.severity === "success" ? "success" : ERROR}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {count.message}
      </Alert>
    </Snackbar>
  );
};

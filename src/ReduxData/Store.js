import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../ReduxData/Slice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});

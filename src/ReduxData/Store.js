import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "../ReduxData/Slice";
import loginApi from "../services/Signin";
import signUpApi from "../services/SIgnUp";
import deleteRestoreApi from "../services/DeleteRestore";
import permanentDeleteApi from "../services/PermanentDeleteApi";
import allDataApi from "../services/Alldata";
import updateApi from "../services/UpdateApi";
import csvDataApi from "../services/CsvFile";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
    [deleteRestoreApi.reducerPath]: deleteRestoreApi.reducer,
    [permanentDeleteApi.reducerPath]: permanentDeleteApi.reducer,
    [allDataApi.reducerPath]: allDataApi.reducer,
    [updateApi.reducerPath]: updateApi.reducer,
    [csvDataApi.reducerPath]: csvDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      signUpApi.middleware,
      deleteRestoreApi.middleware,
      permanentDeleteApi.middleware,
      allDataApi.middleware,
      updateApi.middleware,
      csvDataApi.middleware
    ),
});
setupListeners(store.dispatch);

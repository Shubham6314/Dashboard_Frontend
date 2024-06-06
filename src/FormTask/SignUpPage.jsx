import * as React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Typography,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FormControl, FormHelperText, Select, MenuItem } from "@mui/material";
import "./index.css";
import { useForm } from "react-hook-form";
import { BASE_URL } from "./Constant";
import { useDispatch } from "react-redux";
import { userContext } from "./useContext";
import { increment } from "../ReduxData/Slice";

const defaultTheme = createTheme();

export default function SignUpPage({
  handleClose,
  handleCloseEdit,
  edit,
  allData,
}) {
  const [signUp, setSignUp] = useState({});
  const dispatch = useDispatch();
  const context = useContext(userContext);

  const location = useLocation();
  const path = location.pathname;
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted },
    reset,
    watch,
    control,

    value,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: signUp?.name || user?.name,
      email: signUp?.email || user?.email,
    },
  });

  useEffect(() => {
    if (edit) {
      setSignUp({
        name: edit.name,
        email: edit.email,
      });
      reset({
        name: edit.name,
        email: edit.email,
      });
    } else {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if (user) {
        if (path === "/signup") {
          navigate("/dashboard");
        }
        setSignUp({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [edit]);

  const navigate = useNavigate();

  const onHandleSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}api/user/register`, data);

      if (response.data.token) {
        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
        let token = response.data.token;
        let user = response.data.user;
        let convertingJson = JSON.stringify(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", convertingJson);
        navigate("/dashboard");
      } else {
        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
      }
    } catch (err) {
      console.log(err, "ERROR");
    }
  };

  const onHandleUpdate = async (data) => {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.put(
        `http://localhost:8080/api/user/update?id=${
          edit ? edit._id : user["_id"]
        }`,
        data,
        {
          headers: { Authorization: "Bearer" + token },
        }
      );

      if (response.data.status === "success") {
        if (!edit || response.data.user._id === user._id) {
          localStorage.removeItem(user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          context.setUser(localStorage.getItem("user"));
        }

        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );

        if (allData && edit) {
          allData();
        }

        edit ? handleCloseEdit() : handleClose();
      } else {
        dispatch(
          increment({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const onSubmit = (data) => {
    onHandleSubmit(data);
    reset();
    watch();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            {user ? "Update" : "Sign Up"}
          </Typography>
          <form onSubmit={handleSubmit(user ? onHandleUpdate : onSubmit)}>
            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                      {...register("name", {
                        required: true,
                      })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <Typography variant="body2" color="error">
                        First Name is required
                      </Typography>
                    )}
                    {errors.name && errors.name.type === "pattern" && (
                      <Typography variant="body2" color="error">
                        First Name is not valid...
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors?.email?.message ? (
                      <FormHelperText>{errors?.email?.message}</FormHelperText>
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>

                {user ? (
                  ""
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password-"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          {...register("password", {
                            required: true,

                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                              message: "Please enter a valid password",
                            },
                          })}
                        />
                        {errors.password &&
                          errors.password.type === "required" && (
                            <Typography variant="body2" color="error">
                              Password is required
                            </Typography>
                          )}
                        {errors.password &&
                          errors.password.type === "pattern" && (
                            <Typography variant="body2" color="error">
                              Password should be at-least 8 characters,one
                              UpperCase,LowerCase,Special Character and Number.
                            </Typography>
                          )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          name="password_confirmation"
                          label="Confirm Password"
                          type="password"
                          id="password_confirmation"
                          autoComplete="new-password"
                          {...register("password_confirmation", {
                            required: "Confirm Password Is Required",
                            validate: (value) =>
                              value === watch("password") ||
                              "Confirm passwords did not match",
                          })}
                        />{" "}
                        {errors?.password_confirmation?.message ? (
                          <FormHelperText sx={{ color: "red" }}>
                            {errors?.password_confirmation?.message}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                  </>
                )}
                {user ? (
                  ""
                ) : (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        disableUnderline
                        defaultValue={"Select Role"}
                        {...register("role", {
                          required: "select your role",
                        })}
                      >
                        <MenuItem value={"Select Role"}>
                          --Select Role--
                        </MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"user"}>User</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              {user ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onHandleUpdate}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              )}

              <Grid container justifyContent="flex-end">
                {user ? (
                  ""
                ) : (
                  <Grid item>
                    <Link to="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

import * as React from "react";
import { useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { userContext } from "./useContext";
import { useForm } from "react-hook-form";
import {
  FormHelperText,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { BASE_URL } from "./Constant";

const defaultTheme = createTheme();

export default function SignInPage() {
  const context = useContext(userContext);
  const navigate = useNavigate();

  const onHandleSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}api/user/login`, data);

      if (response.data.token) {
        let token = response.data.token;
        let user = response.data.user;
        let convertingJson = JSON.stringify(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", convertingJson);
        navigate("/dashboard");
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      } else {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      }
    } catch (err) {
      console.log(err, "ERROR");
    }
  };
  const location = useLocation();
  const path = location.pathname;
  React.useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      if (path === "/") {
        navigate("/dashboard");
      }
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    onHandleSubmit(data);
    reset();
    watch();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box noValidate sx={{ mt: 1 }}>
                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: true,

                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                        message: "Please enter a valid password",
                      },
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <Typography variant="body2" color="error">
                      Password is required
                    </Typography>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <Typography variant="body2" color="error">
                      Password should be at-least 8 characters,one
                      UpperCase,LowerCase,Special Character and Number.
                    </Typography>
                  )}
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

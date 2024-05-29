import { Grid, Box } from "@mui/material";
import MiniDrawer from "./AppBar";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <>
      <Grid container>
        <Grid xs={2}>
          <MiniDrawer />
        </Grid>
        <Grid xs={10} mt={10}>
          <Box width={"99%"} display={"flex"} justifyContent={"center"}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default DashboardPage;

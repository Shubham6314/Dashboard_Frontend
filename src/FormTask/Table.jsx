import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Button, Box, Paper, Stack } from "@mui/material";
import { ViewModal } from "./ViewProfile";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Search, SearchIconWrapper, StyledInputBase } from "./Styled";
import "./index.css";

import { userContext } from "./useContext";
function NavbarHome(props) {
  const context = useContext(userContext);
  const [view, setView] = useState("");
  const [allDataApi, setAllDataApi] = useState([]);
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    const user = data.find((ele) => ele._id === id);
    setView(user);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const finddata = (e) => {
    let r = e.target.value.toLowerCase();

    let searchedData = allDataApi.filter(
      (ele) =>
        ele.name.toLowerCase().includes(r) ||
        ele.email.toLowerCase().includes(r) ||
        ele.email.toUpperCase().includes(r)
    );
    setdata(searchedData);
  };

  const allData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/alldata"
      );
      if (response.data) {
        setdata(response.data);
        setAllDataApi(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(" Error", error);
    }
  };

  useEffect(() => {
    allData();
  }, []);
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#1976d2", color: "white" },
        }),
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "center",
          },
        }),
        customBodyRender: (data) => (
          <>
            <Box display="flex" gap="5px">
              <Button variant="contained" onClick={() => handleOpen(data)}>
                View
              </Button>
            </Box>
          </>
        ),
      },
    },
  ];
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
  };
  const handleDownload = async (e, data) => {
    e.stopPropagation();
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/importcsv",
        formData
      );

      if (response.status === 200) {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
        allData();
      } else {
        context.setSnackbar({
          state: true,
          message: response.data.message,
          severity: response.data.status,
        });
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                color="rgb(13, 25, 51)"
                onChange={finddata}
              />
            </Search>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label for="file-upload">
                <Stack direction={"row"}>
                  <FileUploadIcon />
                  Upload Document
                </Stack>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="text/csv"
                onChange={handleDownload}
              />
            </Paper>
          </Box>
        </Stack>
        <MUIDataTable data={data} columns={columns} options={options} />
        <ViewModal open={open} data={view} handleClose={handleClose} />;
      </Box>
    </>
  );
}

export default NavbarHome;

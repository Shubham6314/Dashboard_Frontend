import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Button, Box } from "@mui/material";
import "./index.css";
import { ViewModal } from "./ViewProfile";
import { EditModal } from "./EditModal";
import { BASE_URL } from "./Constant";
import { useDispatch } from "react-redux";
import { increment } from "../ReduxData/Slice";
import { useGetDeleteRestoreByNameMutation } from "../services/DeleteRestore";
function ActiveUsers() {
  const dispatch = useDispatch();
  const [softdeleteApi, { data: apiData, isLoading, error }] =
    useGetDeleteRestoreByNameMutation();
  useEffect(() => {
    if (isLoading) return;
    if (apiData?.status === "success") {
      if (apiData) {
        dispatch(
          increment({
            state: true,
            message: apiData?.message,
            severity: apiData?.status,
          })
        );
        allData();
      } else {
        dispatch(
          increment({
            state: true,
            message: apiData?.message,
            severity: apiData?.status,
          })
        );
      }
    }
  }, [apiData, isLoading]);
  const [data, setData] = useState([]);
  const [view, setView] = useState("");
  const [edit, setEdit] = useState("");
  const [open, setOpen] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);

  const handleOpenEdit = (id) => {
    const user = data.find((ele) => ele._id === id);
    setEdit(user);
    setActiveEdit(true);
  };
  const handleCloseEdit = () => setActiveEdit(false);
  const handleOpen = (id) => {
    const user = data.find((ele) => ele._id === id);
    setView(user);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const allData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/user/alldata`);

      const activeUser = response.data.filter((ele) => {
        return ele.isActive === true;
      });
      setData(activeUser);
    } catch (error) {
      console.log(" Error", error);
    }
  };
  const softDelete = async (data) => {
    softdeleteApi({ body: data });
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
        customBodyRender: (data, value) => (
          <>
            <Box display="flex" gap="5px">
              <Button variant="contained" onClick={() => handleOpenEdit(data)}>
                Edit
              </Button>
              <Button variant="contained" onClick={() => handleOpen(data)}>
                View
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  softDelete({
                    id: value.rowData[0],
                    isActive: false,
                  });
                }}
              >
                Delete
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

  return (
    <>
      <MUIDataTable data={data} columns={columns} options={options} />
      <EditModal
        openEdit={activeEdit}
        handleCloseEdit={handleCloseEdit}
        edit={edit}
        allData={allData}
      />
      <ViewModal open={open} data={view} handleClose={handleClose} />;
    </>
  );
}

export default ActiveUsers;

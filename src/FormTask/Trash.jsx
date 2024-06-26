import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Button, Box } from "@mui/material";
import "./index.css";
import { userContext } from "./useContext";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";
import { increment } from "../ReduxData/Slice";
import { useGetDeleteRestoreByNameMutation } from "../services/DeleteRestore";
function TrashUsers() {
  const dispatch = useDispatch();
  const [restoreApi, { data: restoreData, isLoading, error }] =
    useGetDeleteRestoreByNameMutation();

  useEffect(() => {
    if (isLoading) return;
    if (restoreData?.status === "success") {
      if (restoreData) {
        dispatch(
          increment({
            state: true,
            message: "Restore Successfully",
            severity: restoreData?.status,
          })
        );

        allData();
      } else {
        dispatch(
          increment({
            state: true,
            message: restoreData?.message,
            severity: restoreData?.status,
          })
        );
      }
    }
  }, [restoreData, isLoading]);
  const [data, setData] = useState([]);
  const [view, setView] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (id) => {
    setModal(true);
    setView(id);
  };
  const closeModal = () => {
    setModal(false);
  };

  const context = useContext(userContext);

  const allData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/alldata"
      );

      const activeUser = response.data.filter((ele) => {
        return ele.isActive === false;
      });
      setData(activeUser);
    } catch (error) {
      console.log(" Error", error);
    }
  };
  const restore = async (data) => {
    restoreApi({ body: data });
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
              <Button
                variant="contained"
                onClick={() => {
                  restore({
                    id: value.rowData[0],
                    isActive: true,
                  });
                }}
              >
                RESTORE
              </Button>

              <Button
                variant="contained"
                onClick={() => openModal(value.rowData[0])}
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
      <DeleteModal
        modal={modal}
        closeModal={closeModal}
        allData={allData}
        userid={view}
      />
    </>
  );
}

export default TrashUsers;

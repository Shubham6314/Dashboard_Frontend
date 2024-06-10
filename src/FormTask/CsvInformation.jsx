import { Avatar, Box, Typography, Divider } from "@mui/material";
import { CustomCard } from "./Styled";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CsvWrapper, CardWrapper, CardContent } from "./Styled/CsvStyled";
import { BASE_URL } from "./Constant";
import { useLazyGetCsvFileQuery } from "../services/CsvFile";

const CsvInformation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [getCsvFile, { data: csvFile }] = useLazyGetCsvFileQuery();

  useEffect(() => {
    const handleData = async () => {
      const response = await axios.get(`${BASE_URL}api/user/alldata`);
      const allUserss = response.data;
      const activeUsers = [];
      const inActiveUsers = [];
      response.data.map((user) => {
        if (user.isActive) {
          activeUsers.push(user);
        } else {
          inActiveUsers.push(user);
        }
      });
      setData({
        allUserss: allUserss,
        activeUsers: activeUsers,
        inActiveUsers: inActiveUsers,
      });
    };
    handleData();
  }, []);

  const handleGetCSV = async (endPoint) => {
    await getCsvFile({ value: endPoint }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${endPoint}.csv`);
      link.click();
    });
  };
  const allUsers = async (e, endPoint) => {
    e.stopPropagation();
    try {
      handleGetCSV(endPoint);
    } catch (error) {}
  };
  return (
    <CsvWrapper>
      <CustomCard onClick={() => navigate("/dashboard")}>
        <CardWrapper>
          <CardContent>
            <Typography variant="h6">Total Users-</Typography>
            <Typography variant="h6">{data?.allUserss?.length}</Typography>
          </CardContent>
          <Divider></Divider>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Typography variant="h5">Download</Typography>
            <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}>
              <DownloadForOfflineIcon
                onClick={(e) => allUsers(e, "all-users")}
              ></DownloadForOfflineIcon>
            </Avatar>
          </Box>
        </CardWrapper>
      </CustomCard>
      <CustomCard onClick={() => navigate("/dashboard/activeusers")}>
        <CardWrapper>
          <CardContent>
            <Typography variant="h6">Total Active Users-</Typography>
            <Typography variant="h6">{data?.activeUsers?.length}</Typography>
          </CardContent>
          <Divider></Divider>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Typography variant="h5">Download</Typography>
            <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}>
              <DownloadForOfflineIcon
                onClick={(e) => allUsers(e, "active-user")}
              ></DownloadForOfflineIcon>
            </Avatar>
          </Box>
        </CardWrapper>
      </CustomCard>

      {data?.inActiveUsers?.length == 0 ? (
        <CustomCard
          sx={{
            opacity: "0.3",
            cursor: "not-allowed",
          }}
        >
          <CardWrapper>
            <CardContent>
              <Typography variant="h6">Total InActive Users-</Typography>
              <Typography variant="h6">
                {data?.inActiveUsers?.length}
              </Typography>
            </CardContent>
            <Divider></Divider>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Typography variant="h5">Download</Typography>
              <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}>
                <DownloadForOfflineIcon
                  onClick={(e) => allUsers(e, "inactive-user")}
                ></DownloadForOfflineIcon>
              </Avatar>
            </Box>
          </CardWrapper>
        </CustomCard>
      ) : (
        <CustomCard>
          <CardWrapper>
            <CardContent>
              <Typography variant="h6">Total InActive Users-</Typography>
              <Typography variant="h6">
                {data?.inActiveUsers?.length}
              </Typography>
            </CardContent>
            <Divider></Divider>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Typography variant="h5">Download</Typography>
              <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}>
                <DownloadForOfflineIcon
                  onClick={(e) => allUsers(e, "inactive-user")}
                ></DownloadForOfflineIcon>
              </Avatar>
            </Box>
          </CardWrapper>
        </CustomCard>
      )}
    </CsvWrapper>
  );
};
export default CsvInformation;

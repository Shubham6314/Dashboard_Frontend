import SignInPage from "./FormTask/SignInPage";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./FormTask/SignUpPage";
import DashboardPage from "./FormTask/DashboardPage";
import { useEffect, useState } from "react";
import { userContext } from "./FormTask/useContext";
import { SuccessSnackbar } from "./FormTask/Snackbar";
import ProfileCard from "./FormTask/Profile";
import NavbarHome from "./FormTask/Table";
import PrivateRoute from "./FormTask/PrivateRoute";
import CsvInformation from "./FormTask/CsvInformation";
import TrashUsers from "./FormTask/Trash";
import ActiveUsers from "./FormTask/ActiveUsers";

function App() {
  const [user, setUser] = useState({});
  let userData = localStorage.getItem("user");
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<NavbarHome />} />
              <Route path="profile" element={<ProfileCard />} />
              <Route path="csv" element={<CsvInformation />} />
              <Route path="trash" element={<TrashUsers />} />
              <Route path="activeusers" element={<ActiveUsers />} />
            </Route>
          </Route>
        </Routes>
        <SuccessSnackbar />
      </userContext.Provider>
    </>
  );
}

export default App;

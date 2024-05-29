import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import localStorageData from "./GlobalFunc";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let privateRoutes = ["/dashboard", "dashboard/profile"];
    const { user, token } = localStorageData();
    if (!token) return navigate("/");

    if (user.role === "user" && !privateRoutes.includes(location.pathname))
      return navigate("/");
  }, []);

  return <Outlet />;
};
export default PrivateRoute;

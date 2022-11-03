import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let userStorage = localStorage.getItem("user");

  if (userStorage) {
    const currentUser = JSON.parse(userStorage);

    if (!currentUser) {
      alert("Log in First");
      return <Navigate to="/auth" />;
    }
  }
  return <Outlet />;
};

export default PrivateRoute;

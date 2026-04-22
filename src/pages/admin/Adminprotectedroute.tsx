import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAuth = localStorage.getItem("adminAuth") === "true";

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;

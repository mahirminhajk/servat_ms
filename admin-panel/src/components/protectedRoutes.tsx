import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isLogined = useAppSelector((state) => state.system.isLogined);

  if (!isLogined) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

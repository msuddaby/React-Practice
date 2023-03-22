import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DbErrorPage } from "../Pages/DbErrorPage";

import { usePocket } from "./PocketContext";

export const RequireAdmin = () => {
  const { user } = usePocket();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={{ pathname: "/login" }} state={{ location }} replace />
    );
  }

  if (user.role) {
    if (user.role == "admin") {
      return (
        <>
          <Outlet />
        </>
      );
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-3">Error: 403 - Unauthorized</h2>
      <p className="text-base">
        Cleverly done, Mr. Freeman, but you're not supposed to be here. As a
        matter of fact, you're not. Get back where you belong, and forget about
        all this, until we meet again.
      </p>
    </>
  );
};

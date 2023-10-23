import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contexts/auth";

function AdminRoute() {
  const [ok, setOk] = React.useState(false);
  const [auth, , API_ENDPOINT] = useAuth();

  React.useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${API_ENDPOINT}/api/v1/auth/admin-auth`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? (
    <>
      <Outlet />
    </>
  ) : (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <h1>you are not admin </h1>
    </div>
  );
}

export default AdminRoute;

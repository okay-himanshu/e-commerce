import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contexts/auth";
import { Button } from "../components";

function Private() {
  const [ok, setOk] = React.useState(false);
  const [auth, , API_ENDPOINT] = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${API_ENDPOINT}/api/v1/auth/user-auth`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? (
    <Outlet />
  ) : (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <h1>first login to access dashboard</h1>
      <Button
        title={"Login"}
        className="bg-color_secondary text-color_white"
        handleClick={() => navigate("/login")}
      />
    </div>
  );
}

export default Private;

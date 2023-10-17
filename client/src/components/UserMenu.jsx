import React from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/auth";

function UserMenu() {
  const [auth] = useAuth();
  return (
    <>
      <div className="flex flex-col text-center ">
        <h1 className="text-2xl"> {auth?.user?.name}'s' Profile</h1>
        <NavLink
          to={"/dashboard/user/profile"}
          className="border-b-0 border p-2 hover:bg-color_gray  transition-colors duration-75 "
        >
          Profile
        </NavLink>
        <NavLink
          to={"/dashboard/user/orders"}
          className="border p-2 hover:bg-color_gray  transition-colors duration-75 "
        >
          Orders
        </NavLink>
      </div>
    </>
  );
}

export default UserMenu;

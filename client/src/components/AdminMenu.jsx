import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="flex flex-col text-center ">
        <h1 className="text-2xl">Admin Panel</h1>
        <NavLink
          to={"/dashboard/admin/create-category"}
          className="border-b-0 border p-2 hover:bg-color_gray  transition-colors duration-75 "
        >
          Create Category
        </NavLink>
        <NavLink
          to={"/dashboard/admin/create-products"}
          className="border p-2 hover:bg-color_gray  transition-colors duration-75 "
        >
          Create Products
        </NavLink>
        <NavLink
          to={"/dashboard/admin/users"}
          className="border border-t-0 p-2 hover:bg-color_gray transition-colors duration-75 "
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/admin/products"}
          className="border border-t-0 p-2 hover:bg-color_gray transition-colors duration-75 "
        >
          Products
        </NavLink>
      </div>
    </>
  );
}

export default AdminMenu;

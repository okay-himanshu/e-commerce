import React from "react";

import { AdminMenu } from "../../components";
import { useAuth } from "../../contexts/auth";

function AdminDashBoard() {
  const [auth] = useAuth();

  return (
    <>
      <div className="flex justify-center text-center ">
        <div className="mr-5 w-96">
          <AdminMenu />
        </div>
        <div className=" ml-5 ">
          <h1 className="text-2xl">Admin Details</h1>
          <div className="border  text-2xl p-3">
            <h1>Admin Name : {auth?.user?.name}</h1>
            <h1>Admin Email : {auth?.user?.email}</h1>
            <h1>Admin Contact : 0987654321</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;

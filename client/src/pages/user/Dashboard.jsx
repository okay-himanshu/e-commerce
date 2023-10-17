import React from "react";
import { UserMenu } from "../../components";

import { useAuth } from "../../contexts/auth";
function Dashboard() {
  const [auth] = useAuth();
  return (
    <>
      <div className="flex justify-center text-center ">
        <div className="mr-5 w-96">
          <UserMenu />
        </div>
        <div className=" ml-5 ">
          <h1 className="text-2xl">{auth?.user?.name}'s' Details</h1>
          <div className="border  text-2xl p-3">
            <h1>user Name : {auth?.user?.name}</h1>
            <h1>user Email : {auth?.user?.email}</h1>
            <h1>user Contact : 0987654321</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

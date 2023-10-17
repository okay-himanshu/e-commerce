import React from "react";
import { UserMenu } from "../../components";

function Orders() {
  return (
    <>
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <UserMenu />
        </div>
        <div className=" ml-5 ">
          <div>Orders</div>
        </div>
      </div>
    </>
  );
}

export default Orders;

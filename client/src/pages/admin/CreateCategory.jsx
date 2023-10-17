import React from "react";
import { AdminMenu } from "../../components";

function CreateCategory() {
  return (
    <>
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <AdminMenu />
        </div>
        <div className=" ml-5 ">
          <div>create category</div>
        </div>
      </div>
    </>
  );
}

export default CreateCategory;

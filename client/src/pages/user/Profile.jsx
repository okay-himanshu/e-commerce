import React from "react";
import { UserMenu } from "../../components";

function Profile() {
  return (
    <>
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <UserMenu />
        </div>
        <div className=" ml-5 ">
          <div>Profile</div>
        </div>
      </div>
    </>
  );
}

export default Profile;

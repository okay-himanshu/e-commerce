import React from "react";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { Button } from "../../components";

function AdminDashBoard() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flow-root w-full max-w-screen-xl p-5">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {auth?.user?.name}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Email</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {auth?.user?.email}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Contact</dt>
              <dd className="text-gray-700 sm:col-span-2">New York City</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Bio</dt>
              <dd className="text-gray-700 sm:col-span-2">Dummy text</dd>
            </div>
          </dl>
        </div>
        <div className="mt-5">
          <Button
            handleClick={() => {
              navigate("/dashboard/admin/create-products");
            }}
            title={"MANAGE DASHBOARD "}
            icon={<MdArrowForward />}
            className="bgGreen"
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;

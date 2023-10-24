import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdKey } from "react-icons/io";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/auth";

function ForgetPassword() {
  const [email, setEmail] = React.useState("");
  const [securityQuestion, setSecurityQuestion] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [, , API_ENDPOINT] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (event) => event.preventDefault();
  const userForgePassword = async () => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/api/v1/auth/forget-password`,
        { email, securityQuestion, newPassword, confirmNewPassword }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-xl font-medium text-gray-700">
              RESET PASSWORD
            </p>

            <div className="relative">
              <input
                type="email"
                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                placeholder="what's your favorite color / animal / book?"
                onChange={(event) => setSecurityQuestion(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <div className="text-gray-400">{<IoMdKey />}</div>
              </span>
            </div>

            <div className="relative">
              <input
                type="password"
                className="mb-2 w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                placeholder="New password"
                onChange={(event) => setNewPassword(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                className="mb-2 w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                placeholder="Confirm new password"
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>

            <button
              onClick={userForgePassword}
              type="submit"
              className="block w-full rounded-lg bg-green-600 hover:bg-green-700 duration-75 px-5 py-3 text-sm font-medium text-white"
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;

import React from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button, CustomTitle, Input } from "./";
import { login } from "../svgs";
import env_config from "../config/env_config";
import { useAuth } from "../contexts/auth";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const API_ENDPOINT = env_config.VITE_API_ENDPOINTS;

  const handleSubmit = (event) => event.preventDefault();
  const userLogin = async () => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        alert(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // preventing user to access login page when user is already logged in
  React.useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) navigate("/");
  }, []);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Login to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                  placeholder="Enter email"
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
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="mb-2 w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-600"
                  placeholder="Enter password"
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
                <NavLink
                  to="/forget-password"
                  className="text-sm text-gray-500 mt-2 ml-2"
                >
                  forget password ?
                </NavLink>
              </div>
            </div>

            <button
              onClick={userLogin}
              type="submit"
              className="block w-full rounded-lg bg-green-600 hover:bg-green-700 duration-75 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?{" "}
              <NavLink className="underline" to="/signup">
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

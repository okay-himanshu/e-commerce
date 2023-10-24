import React from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import { Button, Input } from "./";
import env_config from "../config/env_config";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [securityQuestion, setSecurityQuestion] = React.useState("");
  const navigate = useNavigate();

  const API_ENDPOINT = env_config.VITE_API_ENDPOINTS;

  const handleSubmit = (event) => event.preventDefault();

  const userSignUp = async () => {
    // checking if email pattern is valid or not
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(`${API_ENDPOINT}/api/v1/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
        securityQuestion,
      });
      if (res.data.success) {
        toast.success("signup successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) navigate("/");
  }, []);

  return (
    <>
      {/* <div className="flex justify-center items-center  ">
        <form onSubmit={handleSubmit}>
          <Input
            htmlFor="name"
            label={"name*"}
            type={"text"}
            value={name}
            handleChange={(event) => setName(event.target.value)}
            placeholder={"marvin allen"}
          />
          <Input
            htmlFor="email"
            label={"email*"}
            type={"email"}
            value={email}
            handleChange={(event) => setEmail(event.target.value)}
            placeholder={"marvinAllen@gmail.com"}
          />
          <Input
            htmlFor="security question"
            label={"security question*"}
            type={"text"}
            value={securityQuestion}
            handleChange={(event) => setSecurityQuestion(event.target.value)}
            placeholder={"what's your favorite sports"}
          />
          <Input
            htmlFor="password"
            label={"password*"}
            type={"password"}
            value={password}
            handleChange={(event) => setPassword(event.target.value)}
            placeholder={"password"}
          />
          <Input
            htmlFor="confirm password"
            label={"confirm password*"}
            type={"password"}
            value={confirmPassword}
            handleChange={(event) => setConfirmPassword(event.target.value)}
            placeholder={"confirm password "}
          />
          <Button
            title="SIGNUP"
            handleClick={userSignUp}
            className="font-semibold bg-color_secondary text-color_white w-full mt-5 hover:scale-105 duration-100 transition-transform"
          />

          <div className="border flex justify-center mt-5 p-2  ">
            <div to="/forget-password">
              Already have an account?{" "}
              <Link to="/login" className="text-color_primary">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div> */}

      <main className=" flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-3xl ">
          <h1 className="mt-6 text-2xl font-bold text-gray-600 sm:text-3xl md:text-4xl">
            SIGNUP
          </h1>

          <form
            className="mt-8 grid grid-cols-6 gap-6 "
            onSubmit={handleSubmit}
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <Input
                type={"text"}
                className=" focus:border-slate-600"
                placeholder={"marvin allen"}
                handleChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <Input
                type={"email"}
                className=" focus:border-slate-600"
                placeholder={"7Yx4A@example.com"}
                handleChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="securityQuestion"
                className="block text-sm font-medium text-gray-700"
              >
                Security Question
              </label>

              <Input
                type="text"
                className=" focus:border-slate-600"
                placeholder={"what's your favorite color / animal / book?"}
                handleChange={(event) =>
                  setSecurityQuestion(event.target.value)
                }
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <Input
                type="password"
                className=" focus:border-slate-600"
                placeholder={"*********"}
                handleChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>

              <Input
                type="password"
                placeholder={"*********"}
                className=" focus:border-slate-600"
                handleChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <Button
                title={"Create an account"}
                className="bgGreen"
                handleClick={userSignUp}
              />

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <NavLink to="/login" className="text-color_primary">
                  {" "}
                  Login
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;

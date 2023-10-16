import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, CustomTitle } from "./";
import { Input } from "./Input";
import { signup } from "../svgs";
import env_config from "../config/env_config";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const API_ENDPOINT = env_config.VITE_API_ENDPOINTS;

  const handleSubmit = (event) => event.preventDefault();
  const userSignUp = async () => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/api/v1/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) navigate("/");
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <CustomTitle title={"SIGNUP"} />
      </div>
      <div className="flex justify-center items-center mt-10 ">
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
        </form>
        {/* <img src={signup} alt="" className="w-[30rem] ml-10" /> */}
      </div>
    </>
  );
};

export default SignUp;

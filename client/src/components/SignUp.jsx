import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Button, CustomTitle, Input } from "./";
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
    try {
      const res = await axios.post(`${API_ENDPOINT}/api/v1/auth/signup`, {
        name,
        email,
        password,
        confirmPassword,
        securityQuestion,
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
      <div className="flex justify-center items-center  ">
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
        {/* <img src={signup} alt="" className="w-[30rem] ml-10" /> */}
      </div>
    </>
  );
};

export default SignUp;

import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="flex justify-center">
        <CustomTitle title={"LOGIN"} />
      </div>
      <div className="flex justify-center items-center  ">
        <img src={login} alt="" className="w-[30rem]" />
        <form onSubmit={handleSubmit}>
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
          <Button
            title="LOGIN"
            handleClick={userLogin}
            className="font-semibold bg-color_secondary text-color_white w-full mt-5 hover:scale-105 duration-100 transition-transform"
          />
          <div className="flex justify-center mt-3 text-sm text-color_primary ">
            <Link to="/forget-password">Forgot password ?</Link>
          </div>

          <div className="border flex justify-center mt-5 p-2  ">
            <div to="/forget-password">
              Don't have an account?{" "}
              <Link to="/signup" className="text-color_primary">
                Signup
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

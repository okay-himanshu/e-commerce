import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";
import { Input, CustomTitle, Button } from "../components";

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
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("something went wrong ", error);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <CustomTitle title={"RESET PASSWORD"} />
      </div>
      <div className="flex justify-center items-center mt-10">
        {/* <img src={login} alt="" className="w-[30rem]" /> */}
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
            htmlFor="security question"
            label={"security question *"}
            type={"text"}
            value={securityQuestion}
            handleChange={(event) => setSecurityQuestion(event.target.value)}
            placeholder={"what is your favorite sports"}
          />
          <Input
            htmlFor="new password"
            label={"new password*"}
            type={"password"}
            value={newPassword}
            handleChange={(event) => setNewPassword(event.target.value)}
            placeholder={"new password"}
          />
          <Input
            htmlFor="confirm new password"
            label={"confirm new password *"}
            type={"password"}
            value={confirmNewPassword}
            handleChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder={"confirm your new password"}
          />
          <Button
            title="CHANGE PASSWORD"
            handleClick={userForgePassword}
            className="font-semibold bg-color_secondary text-color_white w-full mt-5 hover:scale-105 duration-100 transition-transform"
          />
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;

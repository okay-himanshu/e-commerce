import { Button, CustomTitle } from "./";
import { Input } from "./Input";
import { login } from "../svgs";

const Login = () => {
  return (
    <>
      <div className="flex justify-center">
        <CustomTitle title={"LOGIN"} />
      </div>
      <div className="flex justify-center items-center  ">
        <img src={login} alt="" className="w-[30rem]" />
        <form>
          <Input
            htmlFor="email"
            label={"email*"}
            type={"email"}
            placeholder={"marvinAllen@gmail.com"}
          />
          <Input
            htmlFor="password"
            label={"password*"}
            type={"password"}
            placeholder={"password"}
          />

          <Button
            title="LOGIN"
            className="font-semibold bg-color_secondary text-color_white w-full mt-5 hover:scale-105 duration-100 transition-transform"
          />
        </form>
      </div>
    </>
  );
};

export default Login;

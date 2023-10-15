import { Button } from "./";
import { Input } from "./Input";
import { signup } from "../svgs";

const SignUp = () => {
  return (
    <>
      <div className="flex justify-center">
        <h1 className=" text-4xl font-bold text-center mt-10 text-color_primary  w-fit">
          {" "}
          SIGNUP
        </h1>
      </div>
      <div className="flex justify-center items-center mt-10 ">
        <img src={signup} alt="" className="w-[30rem]" />
        <form>
          <Input
            htmlFor="name"
            label={"name*"}
            type={"text"}
            placeholder={"marvin allen"}
          />
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
          <Input
            htmlFor="confirm password"
            label={"confirm password*"}
            type={"password"}
            placeholder={"confirm password "}
          />
          <Button
            title="SIGNUP"
            className="font-semibold bg-color_secondary text-color_white w-full mt-5 hover:scale-105 duration-100 transition-transform"
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;

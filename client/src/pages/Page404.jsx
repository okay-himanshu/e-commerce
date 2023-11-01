import { useNavigate } from "react-router-dom";
import { BiHomeHeart } from "react-icons/bi";

import { pnf } from "../svgs";
import { Button } from "../components";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <img src={pnf} alt="page not found" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </h1>

        <p className="mb-4 mt-4 text-gray-500">We can't find that page.</p>
      </div>
      <Button
        handleClick={() => {
          navigate("/");
        }}
        className="bgGreen"
        title={"GO BACK HOME"}
        icon={<BiHomeHeart size={20} />}
      />
    </div>
  );
}

export default Page404;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCart, BiMenuAltRight } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { GrFormSearch } from "react-icons/gr";

import { Button, Search } from "../index";
import { arrow } from "../../svgs";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  const navigate = useNavigate();
  const navigator = (url) => navigate(url);

  return (
    <div className="bg-color_black p-3">
      <main className="flex justify-between">
        <div className="flex items-center ml-10 ">
          <div className="cursor-pointer font-bold flex items-center gap-2 text-lg text-color_white  p-1  selection:bg-color_secondary">
            TrendTribe
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div
          className={`z-50 absolute  top-0 right-0 items-center gap-5 mr-10 bg-color_black flex-col h-screen p-3  ${
            toggle
              ? "translate-x-80 duration-200 transition-transform"
              : "translate-x-0 duration-200 transition-transform"
          } md:flex md:h-full md:p-0 md:translate-x-0  md:flex-row md:relative md:bg-color_black`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-color_white text-base">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/category">Category</NavLink>

            <div className=" ml-5 w-[1px]  bg-color_white "></div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex relative">
              <Search
                placeholder="search"
                className=" sm:w-full  md:flex md:w-44 lg:w-full h-10 "
              />
              <Button
                icon={<GrFormSearch size={25} className="text-color_white" />}
                className="absolute right-0 h-full bg-color_primary "
              />
            </div>
            <Button
              title={"Login"}
              className="text-color_secondary bg-color_white hover:text-color_secondary_light duration-150"
            />
            <Button
              title={"Signup"}
              handleClick={() => navigator("/signup")}
              className="text-color_secondary bg-color_white hover:text-color_secondary_light duration-150"
            />
          </div>
          <div className="text-color_white cursor-pointer bg-color_white p-2 rounded-sm relative">
            <BiCart
              fontSize={25}
              className="text-color_secondary hover:text-color_secondary_light duration-200"
            />
            <div className="absolute -top-3 -right-3 bg-color_secondary p-t-0.5 pb-0.5 pr-2 pl-2  rounded-full">
              0
            </div>
          </div>
        </div>
        <div
          className=" md:hidden z-20 flex items-center cursor-pointer"
          onClick={handleToggle}
        >
          {toggle ? (
            <BiMenuAltRight color="white" size={25} />
          ) : (
            <IoCloseSharp color="white" size={25} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Navbar;

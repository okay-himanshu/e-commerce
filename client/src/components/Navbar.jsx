import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCart, BiMenuAltRight } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { GrFormSearch } from "react-icons/gr";
import { HiUser } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

import { Button, Search } from "./index";
import { arrow } from "../svgs";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleToggle = () => setToggle(!toggle);
  const handleDropDownMenu = () => setDropDown(!dropDown);

  const navigate = useNavigate();
  const navigator = (url) => navigate(url);

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    const logoutConfirmation = confirm("do u really want to logout?");
    if (logoutConfirmation) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      navigate("/");
    } else {
      return;
    }
  };

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
          <div className="flex flex-col md:flex-row gap-5">
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
            <div
              className="text-color_white cursor-pointer bg-color_white p-2 rounded-sm relative"
              onClick={() => navigator("/cart")}
            >
              <BiCart
                fontSize={25}
                className="text-color_secondary hover:text-color_secondary_light duration-200"
              />
              <div className="absolute -top-3 -right-3 bg-color_secondary p-t-0.5 pb-0.5 pr-2 pl-2  rounded-full">
                {cart?.length}
              </div>
            </div>
            {!auth.user ? (
              <>
                <Button
                  title={"Login"}
                  handleClick={() => navigator("/login")}
                  className="text-color_secondary bg-color_white hover:text-color_secondary_light duration-150"
                />
                <Button
                  title={"Signup"}
                  handleClick={() => navigator("/signup")}
                  className="text-color_secondary bg-color_white hover:text-color_secondary_light duration-150"
                />
              </>
            ) : (
              <>
                <div
                  className=" relative flex items-center  border border-color_white rounded-lg cursor-pointer"
                  onClick={handleDropDownMenu}
                >
                  <HiUser size={30} className="text-color_white" />

                  <div
                    className={`shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-center absolute top-12 -right-10 transition-transform duration-100 ${
                      dropDown ? "hidden" : "visible"
                    }`}
                  >
                    <div className="pr-4 pl-4 pt-2 pb-2 text-color_secondary">
                      <div className="pt-2 pb-2 hover:text-color_secondary_light">
                        Profile
                      </div>
                      <hr />
                      <div className="pt-2 pb-2 hover:text-color_secondary_light">
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          DashBoard
                        </NavLink>
                      </div>
                      <hr />
                      <div
                        className="pt-2 pb-2 hover:text-color_secondary_light"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCart, BiMenuAltRight } from "react-icons/bi";

import { Button, Search } from "./index";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(true);

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
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center ">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <NavLink
                className="block  text-xl font-bold uppercase text-red-600"
                to="/"
              >
                Trend_Tribe_
              </NavLink>
            </div>

            <div className="flex items-center md:gap-6">
              <ul
                className={`flex flex-col absolute top-0 left-0 ${
                  toggle
                    ? "-translate-y-44 transition-all w-screen delay-100"
                    : "-translate-y-0  transition-all w-full delay-100 "
                }  md:flex  md:w-full md:relative  md:flex-row items-center  md:mt-0 gap-0 md:gap-6 text-sm`}
              >
                <li className="">
                  <div className="relative  sm:block">
                    <input
                      className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                      id="search"
                      type="search"
                      placeholder="Search website..."
                    />

                    <button
                      type="button"
                      className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                    >
                      <span className="sr-only">Search</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/category"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <div
                    class="relative py-2 ml-2"
                    onClick={() => navigator("/cart")}
                  >
                    <div class=" absolute left-4 -top-1">
                      <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                        {cart?.length}
                      </p>
                    </div>
                    <div>
                      <BiCart size={25} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    {!auth?.user ? (
                      <>
                        <div className="sm:flex sm:gap-4">
                          <Button
                            title="Login"
                            className="bgRed"
                            handleClick={() => navigator("/login")}
                          />

                          <div className="hidden sm:flex">
                            <Button
                              title="Register"
                              className="bgGray"
                              handleClick={() => navigator("/signup")}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`relative cursor-pointer`}
                          onClick={handleDropDownMenu}
                        >
                          <div className="inline-flex items-center overflow-hidden rounded-md bg-white">
                            <img
                              alt="Man"
                              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </div>

                          <div
                            className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${
                              dropDown ? "hidden" : "visible"
                            }`}
                            role="menu"
                          >
                            <div className="p-2">
                              <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                {auth?.user?.name}
                              </strong>

                              <NavLink
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                              >
                                Profile
                              </NavLink>
                              <NavLink
                                to={`/dashboard/${
                                  auth?.user?.role === 1
                                    ? "admin/create-category"
                                    : "user"
                                }`}
                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                              >
                                Dashboard
                              </NavLink>

                              <NavLink
                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                                onClick={handleLogout}
                              >
                                Logout
                              </NavLink>
                            </div>

                            <div className="p-2">
                              <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                Danger Zone
                              </strong>

                              <form method="POST" action="#">
                                <button
                                  type="submit"
                                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                  role="menuitem"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Delete Account
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </ul>
              <div className="block md:hidden z-50" onClick={handleToggle}>
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

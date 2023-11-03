import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoSadOutline } from "react-icons/io5";

import { Button } from "./index";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";
import { useSearch } from "../contexts/search";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const [query, setQuery] = useState("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

  const [auth, setAuth, API_ENDPOINT] = useAuth();
  const [cart] = useCart();
  const [search, setSearch] = useSearch();

  const handleToggle = () => setToggle(!toggle);
  const handleDropDownMenu = () => setDropDown(!dropDown);
  const handleMenuClick = () => setToggle(false);

  const navigate = useNavigate();
  const navigator = (url) => navigate(url);

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

  // search functionality
  const handleSearch = async (query) => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/v1/product/product-search/${query}`
      );
      if (res.status) return setSearch(res.data);
      toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (!query || query.length < 4) return setShowSearchSuggestion(false);
      setShowSearchSuggestion(true);

      handleSearch(query);
    }, 1000);

    return () => clearInterval(id);
  }, [query, setShowSearchSuggestion, showSearchSuggestion]);

  useEffect(() => {
    const handleResize = () => handleMenuClick();

    const handleScroll = () => {
      handleMenuClick();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="bg-white select-none text-sm">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center ">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <NavLink
                className=" select-none text-base md:text-xl font-bold uppercase bg-gradient-to-l from-gray-700 via-gray-900 to-black text-white px-2 py-1"
                to="/"
              >
                TREND TRIBE
              </NavLink>
            </div>

            <div className="flex items-center md:gap-6 ">
              <ul
                className={`absolute right-0 
                    ${
                      !toggle
                        ? "-translate-y-80  transition-transform "
                        : "translate-y-0 transition-transform top-10  text-center mt-5 z-50   rounded-md   bg-white shadow-lg p-4  w-full"
                    }
                      md:translate-y-0 
                    md:relative md:items-center md:gap-5 md:flex
                    transition-all duration-100
                  `}
              >
                <li className=""></li>
                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-800 underline underline-offset-8  transition "
                        : "text-gray-600 transition "
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    to="/category"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-800 underline underline-offset-8 transition "
                        : "text-gray-600 transition"
                    }
                  >
                    Category
                  </NavLink>
                </li>
                <div className="relative  sm:block">
                  <input
                    className="h-10 outline-none w-full  rounded-md border border-gray-400 bg-white pe-10 ps-4 text-sm shadow-sm  md:w-60 lg:w-96"
                    type="input"
                    placeholder="Search Items"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <button
                    type="button"
                    className="absolute end-1 border-l border-gray-300 top-1/2 -translate-y-1/2 rounded-none  p-2 text-gray-600 transition hover:text-gray-700 "
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  <div
                    className={`${
                      showSearchSuggestion
                        ? "block transition-all duration-100"
                        : "hidden  transition-all duration-75"
                    }  absolute top-14 z-10 w-full  bg-white shadow-2xl rounded-b-md  overflow-y-auto`}
                  >
                    <div>
                      <h1>
                        {search?.products?.length > 0 ? (
                          search?.products?.map((product, index) => (
                            <div
                              onClick={() => {
                                navigator(`/product/${product?.slug}`);
                                setQuery("");
                              }}
                              key={index}
                            >
                              <div className="flex justify-between items-center px-4 py-2 hover:bg-slate-100 duration-150">
                                <div className="flex ">{product?.name}</div>

                                <div>
                                  <img
                                    src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                                    alt="img"
                                    className="w-10"
                                  />
                                </div>
                              </div>
                              <hr />
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-center gap-3 items-center px-4 py-4 ">
                            <h1>No result found</h1>
                            <IoSadOutline size={20} color="gray" />
                          </div>
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
                <li>
                  <div
                    className=" py-2 ml-2 cursor-pointer"
                    onClick={() => {
                      navigator("/cart");
                      handleMenuClick();
                    }}
                  >
                    <div className="relative flex justify-center hover:text-gray-500">
                      <BiCart size={25} />
                      <div className=" absolute left-1/2 -top-2">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-700  p-3 text-xs text-white">
                          {cart?.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-center">
                    {!auth?.user ? (
                      <>
                        <div className="flex  gap-2 sm:flex sm:gap-2">
                          <Button
                            title="Login"
                            className="bgGreen"
                            handleClick={() => navigator("/login")}
                          />

                          <Button
                            title="Register"
                            className="bgGray"
                            handleClick={() => navigator("/signup")}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`relative cursor-pointer `}
                          onClick={handleDropDownMenu}
                        >
                          <div className="inline-flex items-center overflow-hidden rounded-md bg-white">
                            <img
                              alt="Man"
                              src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${auth?.user?.name}`}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </div>

                          <div
                            className={`z-50 absolute end-0 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${
                              dropDown ? "hidden" : "visible"
                            }`}
                          >
                            <div className="p-2">
                              <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
                                {auth?.user?.name}
                              </strong>

                              <NavLink
                                onClick={handleMenuClick}
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                              >
                                Profile
                              </NavLink>
                              <NavLink
                                onClick={handleMenuClick}
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

                              <button
                                onClick={() =>
                                  toast("* feature is under development *", {
                                    icon: "",
                                    style: {
                                      borderRadius: "10px",
                                      background: "#333",
                                      color: "#fff",
                                    },
                                  })
                                }
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
      <hr />
    </>
  );
}

export default Navbar;

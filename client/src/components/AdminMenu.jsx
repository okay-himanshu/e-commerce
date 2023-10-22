import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();

  const [isScreenAboveMd, setIsScreenAboveMd] = useState(
    window.innerWidth > 768
  );

  useEffect(() => {
    function handleResize() {
      setIsScreenAboveMd(window.innerWidth > 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "createCategory") {
      navigate("/dashboard/admin/create-category");
    } else if (selectedValue === "createProduct") {
      navigate("/dashboard/admin/create-products");
    } else if (selectedValue === "users") {
      navigate("/dashboard/admin/users");
    } else if (selectedValue === "products") {
      navigate("/dashboard/admin/products");
    }
  };

  return (
    <>
      <ul
        className={
          isScreenAboveMd ? "flex sm:flex-col" : "flex-col hidden  md:flex"
        }
      >
        <li>
          <NavLink
            to={"/dashboard/admin/create-category"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 border-s-[1px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700"
                : "flex items-center gap-2 border-blue-500  px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700"
            }
          >
            <span className="text-sm font-medium"> Create Category </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/dashboard/admin/create-products"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 border-s-[1px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700"
                : "flex items-center gap-2 border-blue-500  px-4 py-3 text-gray-500 hover:border-gray-100 hover-bg-gray-50 hover-text-gray-700"
            }
          >
            <span className="text-sm font-medium"> Create Product </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/dashboard/admin/users"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 border-s-[1px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700"
                : "flex items-center gap-2 border-blue-500  px-4 py-3 text-gray-500 hover:border-gray-100 hover-bg-gray-50 hover-text-gray-700"
            }
          >
            <span className="text-sm font-medium"> Users </span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/dashboard/admin/products"}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 border-s-[1px] border-blue-500 bg-blue-50 px-4 py-3 text-blue-700"
                : "flex items-center gap-2 border-blue-500  px-4 py-3 text-gray-500 hover:border-gray-100 hover-bg-gray-50 hover-text-gray-700"
            }
          >
            <span className="text-sm font-medium"> Products </span>
          </NavLink>
        </li>
      </ul>

      {!isScreenAboveMd && (
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="border mt-1.5 w-52 sm:w-full p-2 rounded-md border-gray-300 text-gray-700 sm:text-sm outline-none"
          onChange={handleOptionChange}
        >
          <option value="">Please select</option>
          <option value="createCategory">Create Category</option>
          <option value="createProduct">Create Product</option>
          <option value="users">Users</option>
          <option value="products">Products</option>
        </select>
      )}
    </>
  );
}

export default AdminMenu;

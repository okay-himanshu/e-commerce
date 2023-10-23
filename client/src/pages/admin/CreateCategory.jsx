import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import { AdminMenu } from "../../components";
import { useAuth } from "../../contexts/auth";
import { Button, Input } from "../../components";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");
  const [auth, , API_ENDPOINT] = useAuth();

  // create category
  const handleCreateCategory = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${API_ENDPOINT}/api/v1/category/create-category`,
        { name: input },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.success) {
        alert("category added");
        getAllCategories();
      } else {
      }
    } catch (err) {
      alert(`can't add category some error , `, err);
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/category/get-all-category`
      );
      if (data.success) {
        setInput("");
      } else {
      }
    } catch (err) {
      alert("something went wrong ", err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_ENDPOINT}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        getAllCategories();
        alert(data.deleteCategory.name + " deleted successfully");
      } else {
        alert("some error");
      }
    } catch (err) {
      alert("error while deleting category", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row m-10 text-center justify-center gap-5 ">
      <div className="w-96 ">
        <AdminMenu />
      </div>
      <div className="w-full max-w-screen-xl ">
        <form
          onSubmit={handleCreateCategory}
          className="flex sm:flex-row justify-center gap-2 mb-5 "
        >
          <Input
            type="text"
            placeholder="Enter category name"
            value={input}
            handleChange={(e) => setInput(e.target.value)}
            className="w-40 sm:w-52 md:w-[30rem]"
          />
          <Button
            handleClick={handleCreateCategory}
            icon={<AiOutlinePlus />}
            className="bgGreen"
          />
        </form>

        {categories.length === 0 ? (
          <div className="mt-2">No categories found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      S No
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Actions
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {categories?.map((category, index) => (
                    <tr key={category?._id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {category?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <Button
                          icon={<MdDeleteOutline />}
                          className="bgRed"
                          handleClick={() => handleDeleteCategory(category._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateCategory;

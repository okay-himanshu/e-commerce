import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(res);
      if (res.data.success) {
        console.log("good");
        alert("category added");
        getAllCategories();
      } else {
        console.log("bad");
      }
    } catch (err) {
      alert(`can't add category some error , `, err);
      console.log("Something went wrong while creating category", err);
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/category/get-all-category`
      );
      console.log(data.allCategory);
      if (data.success) {
        setInput("");
        setCategories(data.allCategory);
      } else {
        console.log("some error in categories");
      }
    } catch (err) {
      console.log(err);
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
      console.log(data);
      if (data.success) {
        getAllCategories();
        alert(data.deleteCategory.name + " deleted successfully");
      } else {
        alert("some error");
        console.log("some error");
      }
    } catch (err) {
      console.log(err);
      alert("error while deleting category", err);
    }
  };

  return (
    <>
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <AdminMenu />
        </div>
        <div className=" ml-5">
          <div>Manage category</div>

          <form onSubmit={handleCreateCategory}>
            <Input
              type="text"
              placeholder="Enter category name"
              value={input}
              handleChange={(e) => setInput(e.target.value)}
            />
            <Button
              handleClick={handleCreateCategory}
              title={"submit"}
              className="bg-color_secondary text-color_white"
            />
          </form>

          {categories.length === 0 ? (
            <div className="mt-2">No categories found </div>
          ) : (
            <>
              <div className="flex flex-col w-[33rem]  font-extrabold text-2xl uppercase">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4 uppercase">
                              s no
                            </th>
                            <th scope="col" className="px-6 py-4 uppercase">
                              Category name
                            </th>
                            <th scope="col" className="px-6 py-4 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories?.map((category, index) => (
                            <tr
                              className="border-b dark:border-neutral-500"
                              key={category?._id}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {category?.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Button
                                  title={"EDIT"}
                                  className="bg-color_secondary text-color_white font-bold mr-2"
                                />
                                <Button
                                  handleClick={() =>
                                    handleDeleteCategory(category._id)
                                  }
                                  title={"DELETE"}
                                  className="bg-color_secondary text-color_white font-bold ml-2"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateCategory;

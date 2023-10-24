import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/auth";
import { AdminMenu, Button, Input } from "../../components";

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [auth, , API_ENDPOINT] = useAuth();
  const navigate = useNavigate();

  // Getting all category
  const getAllCategories = async () => {
    const { data } = await axios.get(
      `${API_ENDPOINT}/api/v1/category/get-all-category`
    );
    if (data?.success) {
      setCategories(data.allCategory);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Create product
  const handleCreateProduct = async (event) => {
    event.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", selectedCategoryId);

      const { data } = await axios.post(
        `${API_ENDPOINT}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success("Product added", data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Some error", data?.message);
      }
    } catch (err) {
      toast.error("Some error", err?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row m-10 text-center justify-center gap-5  ">
        <div className="w-96">
          <AdminMenu />
        </div>
        <form onSubmit={handleCreateProduct} className="w-full max-w-screen-xl">
          <div className="ml-5 ">
            <div>MANAGE PRODUCTS</div>

            <div className="mt-2">
              <Input
                type="text"
                placeholder={"Product name"}
                htmlFor="name"
                className=""
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <Input
                type="number"
                placeholder={"Price"}
                htmlFor="price"
                className=""
                value={price}
                handleChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <Input
                type="number"
                placeholder={"Quantity"}
                htmlFor="quantity"
                className=""
                value={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <textarea
                rows={4}
                className="mt-2 w-full p-2  rounded-md border-gray-200 align-top shadow-sm sm:text-sm border outline-none"
                placeholder="Product description"
                htmlFor="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mt-2">
              <select
                className=" border border-gray-200  rounded-md text-sm  w-full p-2 outline-none"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="" className="text-gray-300">
                  Select category
                </option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2">
              <Input
                type="file"
                htmlFor="image"
                className=""
                accept="image/*"
                handleChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="mt-5 pb-20">
              <Button
                title={"Create Product"}
                className="bgGreen"
                handleClick={handleCreateProduct}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProducts;

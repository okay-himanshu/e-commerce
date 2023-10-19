import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { AdminMenu, Button, Input } from "../../components";

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [id, setId] = useState("");
  const [auth, , API_ENDPOINT] = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  // get single product based on slug
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `${API_ENDPOINT}/api/v1/product/get-single-product/${params.slug}`
    );
    if (data.success) {
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setSelectedCategoryId(data.product.category._id);
      setImage(data.product.image);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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
  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", selectedCategoryId);

      const { data } = await axios.patch(
        `${API_ENDPOINT}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        alert("Product updated successfully", data.message);
        navigate("/dashboard/admin/products");
      } else {
        alert("Some error", data?.message);
      }
    } catch (err) {
      console.log(err.response.data);
      alert("Some error", err?.message);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `${API_ENDPOINT}/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        alert("Product deleted successfully", data.message);
        navigate("/dashboard/admin/products");
      } else {
        alert("Some error", data?.message);
      }
    } catch (err) {
      console.log(err.response.data);
      alert("Some error", err?.message);
    }
  };

  return (
    <>
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <AdminMenu />
        </div>
        <form onSubmit={handleUpdateProduct}>
          <div className="ml-5">
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
              <textarea
                className="block p-1.5 w-full h-20 text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product description"
                htmlFor="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm w-full p-1.5"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Select category</option>
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

            <Button
              title={"Create Product"}
              className="mt-2 bg-color_secondary text-color_white font-bold"
              handleClick={handleUpdateProduct}
            />
            <Button
              title={"Delete Product"}
              className="mt-2 bg-color_secondary text-color_white font-bold"
              handleClick={handleDeleteProduct}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;

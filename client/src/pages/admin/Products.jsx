import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { AdminMenu } from "../../components";
import { useAuth } from "../../contexts/auth";

function Products() {
  const [products, setProducts] = useState([]);
  const [, , API_ENDPOINT] = useAuth();

  // Fetching all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get-products`
      );
      if (data.success) {
        setProducts(data.products);
        console.log("Got all products successfully");
      } else {
        console.log("Some error occurred:", data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row m-10 text-center justify-center gap-5  ">
        <div className="w-96">
          <AdminMenu />
        </div>
        <div className="flex flex-wrap w-full max-w-screen-xl">
          {products.map((product) => (
            <NavLink to={`/dashboard/admin/product/${product.slug}`}>
              <div key={product._id} className="">
                <div className="w-full flex  flex-col m-5 p-2 max-w-sm bg-white border border-gray-200 rounded-md shadow ">
                  <img
                    className="p-10 rounded-t-lg object-"
                    src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                    alt="product image"
                  />
                  <div className="px-5 pb-5 flex justify-between">
                    <div className="text-sm md:text-xl text-start font-semibold tracking-tight text-gray-700 ">
                      {product?.description}
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="text-2xl font-bold text-gray-700 bg-yellow-200 p-2  rounded-md">
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;

/**
 * 
 * {products.map((product) => (
          <NavLink to={`/product/${product?.slug}`}>
            <div key={product._id} className="">
              <div className="w-full flex  flex-col m-5 p-2 max-w-sm bg-white border border-gray-200 rounded-md shadow ">
                <img
                  className="p-8 rounded-t-lg object-"
                  src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                  alt="product image"
                />
                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                    {product?.description}
                  </h5>
                  <div className="flex items-center mt-2.5 mb-5">
                    <svg
                      className="w-4 h-4 text-yellow-300 mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product?.price}
                    </span>
                    <div className="card-actions flex gap-2">
                      <Button title={"Buy Now"} className="bgGreen" />
                      <Button
                        title={"Add to cart"}
                        className="bgYellow"
                        handleClick={() => addToCart(product?._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
 * 
 */

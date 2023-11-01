import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

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
      }
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
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

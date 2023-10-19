import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div className="flex m-10 text-center ">
        <div className="mr-5 w-72">
          <AdminMenu />
        </div>
        <div>
          <h1>PRODUCTS</h1>
          {products.map((product) => (
            <Link
              to={`/dashboard/admin/product/${product.slug}`}
              key={product._id}
            >
              <div className="max-w-sm product-card border">
                <a href="#" className="flex justify-center">
                  <img
                    className="rounded-t-lg"
                    src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                    alt={product.name}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;

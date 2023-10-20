import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useAuth } from "../contexts/auth";
import { Button } from "../components";
function ProductDetails() {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [, , API_ENDPOINT] = useAuth();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get-single-product/${params.slug}`
      );

      if (data) {
        setProduct(data.product);
        getRelatedProduct(data.product._id, data.product.category._id);
        console.log(data.product._id, data.product.category._id);
        console.log("data", data.product);
      }
    } catch (err) {
      console.log(err.message);
      alert("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //   get related product
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/product/related-products/${pid}/${cid}`
      );
      if (data) {
        setRelatedProduct(data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center m-10">
        <div className="w-80 border">
          <img
            className="rounded-t-lg"
            src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
            alt={product.name}
          />
        </div>
        <div>
          <h1 className="text-3xl">PRODUCT DETAILS</h1>
          <h1>Name: {product.name}</h1>
          <h1>Description: {product.description}</h1>
          <h1>Price: {product.price}</h1>
          {/* <h1>Category: {product.category.name}</h1> */}
          <Button
            title="ADD TO CART"
            className="bg-color_secondary text-color_white"
          />
          <Button
            title="BUY NOW"
            className="bg-color_primary text-color_white"
          />
        </div>
      </div>
      <div>
        <h1>SIMILAR PRODUCTS</h1>
        <div className="overflow-x-scroll flex">
          {relatedProduct.map((product) => (
            <div key={product._id}>
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
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {product.price}
                  </p>
                </div>
                {/* <Button
                    title={"view more "}
                    className="bg-color_secondary text-color_white"
                    handleClick={() => navigate(`/product/${product.slug}`)}
                  /> */}
                <Button
                  title={"Add to cart"}
                  className="bg-color_primary text-color_white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

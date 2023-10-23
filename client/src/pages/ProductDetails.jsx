import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";

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
      <div className=" flex items-center justify-center flex-col sm:flex-row bg-white m-2 p-2 rounded-md  md:gap-10 ">
        <div>
          <img
            src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
            alt={product?.name}
            className="p-6 w-80 sm:w-96 md:w-[30rem] rounded-t-lg object-contain"
          />
        </div>
        <div className="text-gray-600 md:w-[30rem] ">
          <h1 className="font-bold text-4xl capitalize ">{product?.name}</h1>
          <div className="bg-gray-600 w-20 h-[2px] mt-2 mb-2 rounded-full"></div>
          <p className="text-gray-600">₹ {product?.price}</p>
          <div className="flex items-center text-gray-400">
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <p className="text-gray-500 ml-2">0 reviews</p>
          </div>
          <p>{product?.description}</p>

          <div className="mt-4 flex justify-between">
            <p>Category</p>
            <p>{product?.category?.name}</p>
          </div>
          <div className="flex justify-between">
            <p>Quantity</p>
            <p>{product?.quantity}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <p>Return</p>
            <p>30 days</p>
          </div>
          <div className="flex justify-between">
            <p>Availability</p>
            <p>In stock</p>
          </div>

          <button className="uppercase w-full bg-green-600 hover:bg-green-700 duration-100 text-white rounded-md hover:scale-105 p-2.5 mt-4 mb-4">
            Add To Cart
          </button>
        </div>
      </div>
      <hr />

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

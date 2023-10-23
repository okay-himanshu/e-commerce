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
      }
    } catch (err) {
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
    } catch (err) {}
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

      <div className="mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">
          SIMILAR PRODUCTS
        </h1>
        <div className="overflow-x-scroll flex justify-center ">
          {relatedProduct?.map((product) => (
            <div key={product?._id} className="m-5 ">
              <div className="max-w-sm product-card  border-2 border-gray-300 rounded-3xl hover:border-4 duration-100 hover:scale-95 p-10">
                <div className="flex justify-center">
                  <img
                    className="rounded-t-lg "
                    src={`${API_ENDPOINT}/api/v1/product/product-image/${product?._id}`}
                    alt={product?.name}
                  />
                </div>
                <hr className="mt-2 mb-2 " />
                <div className="p-2">
                  <a href="#">
                    <h5 className=" text-xl font-bold tracking-tight text-gray-600 capitalize">
                      {product?.name}
                    </h5>
                  </a>
                  <p className=" font-normal text-gray-700 dark:text-gray-400">
                    {product?.description}
                  </p>
                  <p className="  text-gray-900 font-bold  text-2xl">
                    ₹ {product?.price}
                  </p>
                </div>
                <div className="flex gap-4 ">
                  <Button
                    title={"View Details "}
                    className="bgGreen"
                    handleClick={() => navigate(`/product/${product.slug}`)}
                  />
                  <Button title={"Add To Cart "} className="bgYellow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import { useAuth } from "../contexts/auth";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  const [, , API_ENDPOINT] = useAuth();
  const params = useParams();
  const navigate = useNavigate();

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
      toast.error("Something went wrong: " + err.message);
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

  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <>
      <div className=" flex items-center justify-center flex-col sm:flex-row bg-white m-2 p-2 rounded-md  md:gap-10 ">
        <div>
          <img
            src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
            alt={product?.name}
            className="p-6 w-80 sm:w-96 md:w-[24rem] rounded-t-lg object-contain"
          />
        </div>
        <div className="text-gray-600 md:w-[30rem] ">
          <h1 className="font-bold text-4xl capitalize ">{product?.name}</h1>
          <div className="bg-gray-600 w-20 h-[2px] mt-2 mb-2 rounded-full"></div>
          <p className="text-gray-600 text-lg font-medium">
            ₹ {product?.price}
          </p>
          <div className="flex items-center text-gray-400">
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <p className="text-gray-500 ml-2">0 reviews</p>
          </div>
          <p className="mt-2">
            {!viewMore
              ? product?.description?.substring(0, 300)
              : product?.description}
          </p>
          <div
            className=" mt-1 w-fit duration-200 font-medium cursor-pointer "
            onClick={handleViewMore}
          >
            {!viewMore ? (
              <p className="flex items-center border-4 border-gray-600 p-2 w-fit">
                View More{" "}
                <BiChevronDown
                  size={25}
                  className="text-gray-600 animate-bounce"
                />
              </p>
            ) : (
              <p className="flex items-center border-4 border-gray-600 p-2 w-fit">
                Collapse{" "}
                <MdOutlineKeyboardArrowUp
                  size={25}
                  className="text-gray-600 animate-bounce"
                />
              </p>
            )}
          </div>

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
          <div className=" flex   justify-start items-center   ">
            {relatedProduct.length > 0 ? (
              relatedProduct.map((product) => (
                <div key={product._id} className="">
                  <div className=" w-80  flex  flex-col m-2  max-w-sm bg-white    shadow  border border-gray-300 rounded-xl  ">
                    <img
                      className="p-8 rounded-t-lg object-contain h-56 "
                      src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <h5 className="text-lg font-semibold tracking-tight text-gray-800 ">
                        {product?.name}
                      </h5>
                      <h5 className=" h-24 text-sm font-medium tracking-tight text-gray-700 ">
                        {product?.description?.substring(0, 100)}...
                      </h5>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{product?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-[50rem] flex justify-center items-center   lg:flex lg:flex-wrap lg:justify-center">
                <p>no product found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

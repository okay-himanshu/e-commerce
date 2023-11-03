import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiSolidCategory } from "react-icons/bi";
import { IoPricetagsSharp } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";
import { MdCategory } from "react-icons/md";

import {
  Button,
  Hero,
  Prices,
  Category,
  CustomTitle,
} from "../components/index";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";
import { Footer } from "../pages";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [filterSelection, setFilterSelection] = useState(true);

  const [, , API_ENDPOINT] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/category/get-all-category`
      );

      if (data.success) {
        setCategories(data.allCategory);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // getting all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get-products`
      );
      if (data) {
        setProducts(data.products);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  useEffect(() => {
    if (!checked.length || !selectedPrice.length) getAllProducts();
  }, [checked.length, selectedPrice.length]);

  useEffect(() => {
    if (checked.length || selectedPrice.length) filterProducts();
  }, [checked, selectedPrice]);

  // filter by category
  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  const handleRadioChange = (value) => {
    setSelectedPrice(value);
  };

  // get filtered product
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/api/v1/product/filter-products`,
        { checked, selectedPrice }
      );
      if (data.success) {
        setProducts(data?.products);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  // add to cart

  const addToCart = (product) => {
    setCart([...cart, product]);

    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("product added to cart ");
  };

  const resetFilter = () => {
    if (!checked.length && selectedPrice.length === 0)
      return toast.error("no selected filters");
    else window.location.reload();
  };

  // filter toggle
  const filterButton = () => setFilterSelection(!filterSelection);

  return (
    <>
      <Hero />

      <div className=" max-w-screen-xl mt-5  mx-auto ">
        <CustomTitle title={"CATEGORIES "} className={"text-2xl md:text-4xl"} />
      </div>

      <div className="flex flex-wrap sm:flex-wrap gap-1 sm:gap-2 md:gap-4 max-w-screen-xl mt-5  mx-auto justify-start   ">
        {categories?.map((category) => {
          return (
            <Category
              key={category?._id}
              category={category?.name}
              className="select-none capitalize cursor-pointer bg-gray-300 border-2 border-gray-300 hover:bg-gray-100  duration-300 text-gray-700  text-sm w-96"
            />
          );
        })}
      </div>

      {/* filter */}
      <div className=" gap-2 flex items-center justify-between  max-w-screen-xl mt-5  mx-auto  ">
        <div className="">
          <CustomTitle
            title={"PRODUCTS "}
            className={"text-xl mt-5 md:text-4xl"}
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <div
            onClick={filterButton}
            className=" flex  gap-2 font-medium items-center justify-center h-10 w-20  px-4 py-2 rounded-full select-none  cursor-pointer bg-gray-300 border-2 border-gray-300 hover:bg-gray-100  duration-300 text-gray-700  text-md  uppercase "
          >
            <strong className="flex items-center gap-2 font-medium uppercase ">
              {<FiFilter />}
            </strong>{" "}
          </div>
          <div className=" flex  gap-2 font-medium items-center justify-center h-10 w-20  px-4 py-2 rounded-full select-none  cursor-pointer bg-gray-300 border-2 border-gray-300 hover:bg-gray-100  duration-300 text-gray-700  text-md  uppercase ">
            <strong className="flex items-center gap-2   font-medium uppercase ">
              {<CgDetailsMore />}
            </strong>{" "}
          </div>
          <div
            className={`py-2 mt-2 w-64 px-4 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg overflow-y-auto overflow-x-hidden  h-60 sm:h-80 md:h-96   z-50  absolute top-20 -left-20  ${
              filterSelection ? "hidden" : ""
            }`}
          >
            <div className=" bg-white p-1">
              <button
                onClick={resetFilter}
                className=" w-full block rounded-md px-4 py-2 text-sm text-gray-600 bg-gray-300 font-normal hover:bg-gray-200 duration-300"
              >
                RESET
              </button>
              <strong className="flex items-center gap-1 p-2 text-sm font-medium uppercase text-gray-400">
                {<BiSolidCategory />} Category
              </strong>
              {categories.map((category) => (
                <ul
                  className="w-48   flex items-center gap-2 border-gray-200  p-1 "
                  key={category?._id}
                >
                  <div>
                    <input
                      type="checkbox"
                      className=" w-5 rounded border-gray-300"
                      onChange={(event) =>
                        handleChecked(event.target.checked, category._id)
                      }
                    />
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {category?.name}
                    </span>
                  </div>
                </ul>
              ))}
            </div>
            <div className="  bg-white p-1">
              <strong className="flex items-center gap-1 p-2 text-sm font-medium uppercase text-gray-400">
                {<IoPricetagsSharp />} price
              </strong>
              {Prices.map((price) => (
                <React.Fragment key={price._id}>
                  <div className="">
                    <input
                      type="radio"
                      name="price"
                      value={price.array}
                      id={`price-${price._id}`}
                      className="peer hidden"
                      checked={selectedPrice === price.array}
                      onChange={() => handleRadioChange(price.array)}
                    />
                    <label
                      htmlFor={`price-${price._id}`}
                      className="flex justify-start cursor-pointer items-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-700 hover:border-gray-200  peer-checked:bg-gray-300 "
                    >
                      <p className="text-sm text-gray-500 font-medium">
                        {price.name}
                      </p>
                    </label>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main
        className={`flex  mx-auto  max-w-screen-2xl justify-center lg:flex  lg:items-center ${
          filterSelection ? "blur-0 duration-500  " : "blur-sm duration-500"
        }`}
      >
        <div className="flex justify-between ">
          <div className=" flex mx-auto  flex-wrap justify-center items-center lg:flex lg:flex-wrap  ">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="">
                  <div className=" w-80  flex  flex-col m-2  max-w-sm bg-white    shadow  border border-gray-300 rounded-xl  ">
                    <img
                      className="p-8 rounded-t-lg object-contain h-56 "
                      src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                      alt="product image"
                    />
                    <div className="px-5 pb-5">
                      <h5 className="my-2 text-gray-800 flex items-center gap-2 lowercase bg-gray-300 rounded-full w-fit px-5 py-0.5 text-xs">
                        <BiSolidCategory className="text-gray-500" />{" "}
                        <p>{product?.category?.name}</p>
                      </h5>
                      <h5 className="text-lg font-semibold tracking-tight text-gray-800 ">
                        {product?.name}
                      </h5>
                      <h5 className=" h-24 text-sm font-medium tracking-tight text-gray-700 ">
                        {product?.description?.substring(0, 100)}...
                      </h5>
                      <div className="flex items-center mb-1 mt-1">
                        <svg
                          className="w-4 h-4 text-gray-200 dark:text-gray-600"
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
                        <svg
                          className="w-4 h-4 text-gray-200 dark:text-gray-600"
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
                          0.0
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{product?.price}
                        </span>
                      </div>
                      <div className="card-actions flex gap-2 mt-1">
                        <Button
                          title={"View More"}
                          className="bgGreen"
                          handleClick={() =>
                            navigate(`/product/${product?.slug}`)
                          }
                        />
                        <Button
                          title={"Add to cart"}
                          className="bgGray"
                          handleClick={() => addToCart(product)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-[50rem] mt-20 mb-20 flex justify-center items-center   lg:flex lg:flex-wrap lg:justify-center">
                <p>no product found</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;

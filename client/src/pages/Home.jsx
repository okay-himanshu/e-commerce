import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { Button, Hero, SignUp, Prices } from "../components/index";
import { hero1, hero2, hero3 } from "../images/index";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);

  const [auth, , API_ENDPOINT] = useAuth();
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
      alert("something went wrong ", err);
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
        // alert("all product got successfully");
      } else {
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
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
      alert("Something went wrong: " + err.message);
    }
  };

  // add to cart

  const addToCart = (product) => {
    if (auth?.token) {
      setCart([...cart, product]);

      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      alert("product added to cart");
    } else {
      alert("login/signup to add to cart");
      navigate("/signup");
    }
  };

  const resetFilter = () => {
    window.location.reload();
  };

  return (
    <>
      <Hero />
      <main className="flex justify-center mx-5">
        <div className="flex justify-between">
          <div className="hidden sm:block ">
            <div className="border">
              <h1 className="py-4">FILTER'S BY CATEGORY</h1>
              {categories.map((category) => (
                <ul
                  className="w-48  border-t flex items-center gap-2 border-gray-200 p-1 "
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
                    <span className="text-sm font-medium text-gray-700">
                      {category?.name}
                    </span>
                  </div>
                </ul>
              ))}
            </div>
            <div className="mt-2 border">
              <h1 className="py-4">FILTER'S BY PRICE</h1>
              {Prices.map((price) => (
                <React.Fragment key={price._id}>
                  <div>
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
                      <p className="text-sm font-medium">{price.name}</p>
                    </label>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap  justify-center items-center ">
            {products.map((product) => (
              <div key={product._id}>
                <div className="w-72  flex  flex-col m-2  max-w-sm bg-white    shadow  border border-gray-300 rounded-xl  duration-100 hover:scale-95">
                  <img
                    className="p-8 rounded-t-lg object-contain h-56"
                    src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                      {product?.name}
                    </h5>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                      {product?.description}
                    </h5>
                    <div className="flex items-center mt-2.5 mb-5">
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
                        ${product?.price}
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
                        className="bgYellow"
                        handleClick={() => addToCart(product)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

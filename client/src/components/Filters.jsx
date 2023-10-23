import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Hero, SignUp, Prices } from "../components/index";
import { hero1, hero2, hero3 } from "../images/index";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";

function Filter() {
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
      } else {
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

  // get filtered product
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/api/v1/product/filter-products`,
        { checked, selectedPrice }
      );
      if (data.success) {
        setProducts(data?.products);
      } else {
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

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

  const resetFilter = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex">
        <details className=" overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Category </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className=" border-t border-gray-200 bg-white">
            {categories.map((category) => (
              <div className="flex">
                <ul
                  className="space-y-1 border-t border-gray-200 p-4 flex"
                  key={category?._id}
                >
                  <li>
                    <label
                      htmlFor="FilterInStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterInStock"
                        className="h-5 w-5 rounded border-gray-300"
                        onChange={(event) =>
                          handleChecked(event.target.checked, category._id)
                        }
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {category?.name}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </details>
        <details className=" overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <fieldset className=" flex-wrap gap-3">
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
                      className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                    >
                      <p className="text-sm font-medium">{price.name}</p>
                    </label>
                  </div>
                </React.Fragment>
              ))}
            </fieldset>
          </div>
        </details>
      </div>
    </>
  );
}

export default Filter;

import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Hero, SignUp, Prices } from "../components/index";
import { hero1, hero2, hero3 } from "../images/index";
import { useAuth } from "../contexts/auth";

function Home() {
  const [images] = useState([hero1, hero2, hero3]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);

  const [auth, , API_ENDPOINT] = useAuth();
  const navigate = useNavigate();

  let timeoutId;

  const handleForward = () => {
    clearTimeout(timeoutId);
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleBack = () => {
    clearTimeout(timeoutId);
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    timeoutId = setTimeout(() => {
      handleForward();
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentImageIndex]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/category/get-all-category`
      );
      console.log(data.allCategory);
      if (data.success) {
        setCategories(data.allCategory);
      } else {
        console.log("some error in categories");
      }
    } catch (err) {
      console.log(err);
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
        console.log(data);
        setProducts(data.products);
        console.log("Got all products successfully");
        // alert("all product got successfully");
      } else {
        console.log("Some error occurred:", data.message);
      }
    } catch (err) {
      console.log(err.message);
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

  // // get total count
  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${API_ENDPOINT}/api/v1/product/product-count`
  //     );
  //     console.log(data);
  //     if (data) {
  //       setTotal(data?.total);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Something went wrong: " + err.message);
  //   }
  // };

  // useEffect(() => {
  //   getTotal();
  // }, []);
  //
  // get filtered product
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/api/v1/product/filter-products`,
        { checked, selectedPrice }
      );
      if (data.success) {
        setProducts(data?.products);
        console.log("Got all products successfully");
      } else {
        console.log("Some error occurred:", data.message);
      }
    } catch (err) {
      console.log(err.message);
      alert("Something went wrong: " + err.message);
    }
  };

  const resetFilter = () => {
    window.location.reload();
  };

  return (
    <>
      {/* <div className="relative selection:select-none ">
        <Hero image={images[currentImageIndex]} />
        <div className="absolute top-1/2 cursor-pointer" onClick={handleBack}>
          <MdArrowBackIosNew size={40} className="text-color_white" />
        </div>
        <div
          className="absolute right-0 top-1/2 cursor-pointer"
          onClick={handleForward}
        >
          <MdArrowForwardIos size={40} className="text-color_white" />
        </div>
      </div> */}

      <div className="flex">
        <div className="w-80">
          <h1>Filters By Categories</h1>
          {categories.map((category) => (
            <>
              <div key={category._id}></div>
              <div>
                <h1>{category.name}</h1>
                <input
                  type="checkbox"
                  onChange={(event) =>
                    handleChecked(event.target.checked, category._id)
                  }
                />
              </div>
            </>
          ))}
          <h1>Filters By Price</h1>
          {Prices.map((price) => (
            <div key={price._id}>
              <input
                type="radio"
                value={price.array}
                checked={selectedPrice === price.array}
                onChange={() => handleRadioChange(price.array)}
              />
              <label>{price.name}</label>
            </div>
          ))}
          <Button
            title={"RESET FILTERS"}
            className="bg-color_secondary text-color_white"
            handleClick={resetFilter}
          />
        </div>
        <div>
          <h1>All products </h1>
          <div className="flex flex-wrap">
            {products.map((product) => (
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
                  <Button
                    title={"view more "}
                    className="bg-color_secondary text-color_white"
                    handleClick={() => navigate(`/product/${product.slug}`)}
                  />
                  <Button
                    title={"Add to cart"}
                    className="bg-color_primary text-color_white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

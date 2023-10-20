import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useAuth } from "../contexts/auth";
import { Button } from "../components";
function ProductDetails() {
  const [product, setProduct] = useState({});
  const [, , API_ENDPOINT] = useAuth();

  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/api/v1/product/get-single-product/${params.slug}`
      );

      if (data) {
        setProduct(data.product);
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
          <h1>Category: {product.category.name}</h1>
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
      </div>
    </>
  );
}

export default ProductDetails;

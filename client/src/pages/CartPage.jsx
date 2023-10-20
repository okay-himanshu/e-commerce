import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";
import { Button } from "../components";

function CartPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [auth, setAuth, API_ENDPOINT] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      myCart = myCart.filter((prod) => prod._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      alert("item removed successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
      console.log(total);
    }
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      <div>
        <h1>Cart</h1>
        <h1>
          {cart.length > 1
            ? `You have ${cart.length} item in your cart ${
                auth?.token ? "" : "please login to checkout"
              } `
            : "Your cart is empty"}
        </h1>
      </div>

      {cart?.map((product) => {
        return (
          <>
            <div className="flex">
              <div>
                <img
                  src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                  alt=""
                />
              </div>
              <div>
                <h1>{product.name}</h1>
                <h1>{product.price}</h1>
                <h1>{product.quantity}</h1>
                <h1>{product.totalPrice}</h1>
                <Button
                  handleClick={() => removeCartItem(product._id)}
                  title={"REMOVE"}
                  className="bg-color_secondary text-color_white "
                />
              </div>
            </div>

            <hr />
            <h1>cart summary </h1>

            <h1>TOTAL : {totalPrice}</h1>
          </>
        );
      })}
    </div>
  );
}

export default CartPage;

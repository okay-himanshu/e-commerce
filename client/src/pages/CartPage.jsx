import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";

function CartPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [, , API_ENDPOINT] = useAuth();
  const [cart, setCart] = useCart();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      myCart = myCart.filter((prod) => prod._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("item removed successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    setTotalPrice(total);
  }, [cart]);

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {cart && cart.length < 1 ? (
              <>
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-700 sm:text-3xl">
                    No item in your cart
                  </h1>
                </header>
              </>
            ) : (
              <>
                <header className="text-center">
                  <h1 className="text-xl font-bold text-gray-700 sm:text-3xl">
                    You have {cart?.length} items in your cart
                  </h1>
                </header>
                <div className="mt-8">
                  {cart?.map((product) => {
                    return (
                      <React.Fragment key={product?._id}>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-4">
                            <img
                              src={`${API_ENDPOINT}/api/v1/product/product-image/${product._id}`}
                              alt=""
                              className="h-16 w-16 rounded object-cover"
                            />

                            <div>
                              <h3 className="text-sm text-gray-900">
                                {product?.name}
                              </h3>

                              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                <div>
                                  <dt className="inline">Price:</dt>
                                  <dd className="inline">{product?.price}</dd>
                                </div>

                                <div>
                                  <dt className="inline">Quantity:</dt>
                                  <dd className="inline">
                                    {product?.quantity}
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            <div className="flex flex-1 items-center justify-end gap-2">
                              <form>
                                <input
                                  type="number"
                                  min="1"
                                  defaultValue="1"
                                  id="Line1Qty"
                                  className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                />
                              </form>

                              <button
                                className="text-gray-600 transition hover:text-red-600"
                                onClick={() => removeCartItem(product._id)}
                                title={"REMOVE"}
                              >
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        </ul>
                      </React.Fragment>
                    );
                  })}

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>₹ {totalPrice}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>Discount</dt>
                          <dd>₹ 0.00</dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>₹ {totalPrice}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>

                          <p className="whitespace-nowrap text-xs">
                            0 Discounts Applied
                          </p>
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <div
                          onClick={() =>
                            toast("Payment feature coming soon!", {
                              icon: "",
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                              },
                            })
                          }
                          className="block rounded bg-green-600 px-5 py-3 text-sm text-gray-100 transition hover:bg-green-700"
                        >
                          Checkout
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CartPage;

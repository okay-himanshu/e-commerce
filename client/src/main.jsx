import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import { CartProvider } from "./contexts/cart";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import { CartProvider } from "./contexts/cart";
import { SearchProvider } from "./contexts/search";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

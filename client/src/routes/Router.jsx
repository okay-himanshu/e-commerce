import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Page404,
  Dashboard,
  AdminDashBoard,
  CreateCategory,
  CreateProducts,
  Users,
  Profile,
  Orders,
  Products,
  UpdateProduct,
  ProductDetails,
  CartPage,
} from "../pages";
import { Navbar, SignUp, Login, ForgetPassword } from "../components";
import Private from "../routes/Private";
import AdminRoute from "./AdminRoute";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:slug" element={<ProductDetails />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>

          {/* protected route */}
          <Route path="/dashboard" element={<Private />}>
            <Route path="user" element={<Dashboard />}></Route>
            <Route path="user/profile" element={<Profile />}></Route>
            <Route path="user/orders" element={<Orders />}></Route>
          </Route>

          {/* admin route */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashBoard />}></Route>
            <Route
              path="admin/create-category"
              element={<CreateCategory />}
            ></Route>
            <Route
              path="admin/create-products"
              element={<CreateProducts />}
            ></Route>
            <Route
              path="admin/product/:slug"
              element={<UpdateProduct />}
            ></Route>
            <Route path="admin/products" element={<Products />}></Route>
            <Route path="admin/users" element={<Users />}></Route>
          </Route>
          {/*  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;

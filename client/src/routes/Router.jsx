import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Page404 } from "../pages";
import { Navbar, SignUp, Login } from "../components";
function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;

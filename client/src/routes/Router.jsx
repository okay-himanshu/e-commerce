import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Page404, Dashboard } from "../pages";
import { Navbar, SignUp, Login, ForgetPassword } from "../components";
import Private from "../routes/Private";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="*" element={<Page404 />}></Route>

          {/* protected route */}
          <Route path="/dashboard" element={<Private />}>
            <Route path="" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;

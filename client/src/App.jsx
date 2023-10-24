import React from "react";
import { Toaster } from "react-hot-toast";

import Router from "./routes/Router";
function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;

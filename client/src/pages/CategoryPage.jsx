import React from "react";
import CustomTitle from "../components/CustomTitle";

function CategoryPage() {
  return (
    <div className=" max-w-screen-xl mt-5  mx-auto">
      <CustomTitle title={"Category Page"} className={"m-auto"} />
      <h1 className="text-xl text-center mt-10 mb-10">*under development*</h1>
      <div className="flex gap-1 flex-wrap items-start justify-center ">
        <div className="bg-gray-300 h-60 w-1/3"></div>
        <div className="bg-gray-300 h-60 w-1/3 "></div>
        <div className="bg-gray-300 h-60 w-1/3 "></div>
        <div className="bg-gray-300 h-60 w-1/3"></div>
        <div className="bg-gray-300 h-60 w-1/3"></div>
        <div className="bg-gray-300 h-60 w-1/3"></div>
      </div>
    </div>
  );
}

export default CategoryPage;

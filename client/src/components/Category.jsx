import React from "react";

function Category({ category, className = "" }) {
  return (
    <div className="flex justify-center items-center gap-4">
      <div
        className={`${className} flex justify-center  items-center px-6 py-2 w-fit  rounded-full bg-gray-300`}
      >
        {category}
      </div>
    </div>
  );
}

export default Category;

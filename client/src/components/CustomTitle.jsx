import React from "react";

function CustomTitle({ title, className }) {
  return (
    <>
      <h1
        className={`${className} text-transparent  bg-clip-text bg-gradient-to-r from-pink-600 to-purple-400 text-4xl font-bold text-center mt-10 text-color_primary  w-fit`}
      >
        {title}
        <div className="bg-gradient-to-r from-pink-600 to-purple-400 w-20 h-[2px] mt-2 mb-2 rounded-full"></div>
      </h1>
    </>
  );
}

export default CustomTitle;

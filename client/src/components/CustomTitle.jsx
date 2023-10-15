import React from "react";

function CustomTitle({ title, className }) {
  return (
    <>
      <h1
        className={`${className} text-4xl font-bold text-center mt-10 text-color_primary  w-fit`}
      >
        {title}
      </h1>
    </>
  );
}

export default CustomTitle;

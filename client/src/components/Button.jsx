import React from "react";

function Button({ title, handleClick, className = "", icon }) {
  return (
    <>
      <button className={`${className} p-2 rounded-sm `}>
        {title} {icon}
      </button>
    </>
  );
}

export default Button;

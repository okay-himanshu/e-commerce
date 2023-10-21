import React from "react";

function Button({ title, handleClick, className = "", icon }) {
  const classNames = {
    bgTeal:
      "rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow",
    bgGray:
      "rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600",
    bgRed:
      "rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow",
    bgGreen:
      "rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow",
    bgOrange:
      "rounded-md bg-orange-600 px-5 py-2.5 text-sm font-medium text-white shadow",
  };

  const buttonClass = classNames[className] || classNames.bgTeal;

  return (
    <button onClick={handleClick} className={buttonClass}>
      {title} {icon}
    </button>
  );
}

export default Button;

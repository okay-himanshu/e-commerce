import React from "react";

export default function Input({
  htmlFor,
  label,
  type,
  placeholder,
  className = "",
  value,
  handleChange,
  accept,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleChange}
        className={`${className} mt-1  rounded-md border-gray-200 shadow-sm sm:text-sm p-[10px] border focus:outline-none  `}
        accept={accept}
      />
    </div>
  );
}

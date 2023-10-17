import React from "react";

export default function Input({
  htmlFor,
  label,
  type,
  placeholder,
  className = "",
  value,
  handleChange,
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
        className={`${className} p-1.5 border mt-1 mb-1 rounded-[3px] w-96`}
      />
    </div>
  );
}

import React from "react";

export function Input({ htmlFor, label, type, placeholder, className = "",value ,handleChange}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleChange}
        className={`${className} p-2 border mt-1 mb-2 rounded-[3px] w-96`}
      />
    </div>
  );
}

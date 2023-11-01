import React from "react";

function Search({ placeholder, handleChange, className = "" }) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className={`  ${className} pr-2 pl-2 pt-0.5 pb-0.5  border rounded-sm  `}
      />
    </>
  );
}

export default Search;

import React from "react";

function Hero({ image, alt }) {
  return (
    <>
      <div>
        <img src={image} alt={alt} className="w-screen h-[31.7rem]" />
      </div>
    </>
  );
}

export default Hero;

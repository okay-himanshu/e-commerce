import React from "react";

function Hero({ image, alt }) {
  return (
    <>
      <div>
        <img src={image} alt={alt} className="w-screen" />
      </div>
    </>
  );
}

export default Hero;

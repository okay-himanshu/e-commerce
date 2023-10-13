import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { Hero } from "../components/index";
import { hero1, hero2, hero3 } from "../images/index";

function Home() {
  const [images] = useState([hero1, hero2, hero3]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let timeoutId;

  const handleForward = () => {
    clearTimeout(timeoutId);
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleBack = () => {
    clearTimeout(timeoutId);
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    timeoutId = setTimeout(() => {
      handleForward();
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentImageIndex]);

  return (
    <>
      <div className="relative selection:select-none ">
        <Hero image={images[currentImageIndex]} />
        <div className="absolute top-1/2 cursor-pointer" onClick={handleBack}>
          <MdArrowBackIosNew size={40} className="text-color_white" />
        </div>
        <div
          className="absolute right-0 top-1/2 cursor-pointer"
          onClick={handleForward}
        >
          <MdArrowForwardIos size={40} className="text-color_white" />
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { hero1, hero2, hero3 } from "../images";

function Hero() {
  const images = [hero1, hero2, hero3];
  const [image, setImage] = useState(hero1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex(currentIndex + 1);
    setImage(images[currentIndex + 1]);
    if (currentIndex + 1 === images.length) {
      setCurrentIndex(0);
      setImage(images[0]);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      next();
    }, 6000);
    return () => clearInterval(id);
  }, [next]);

  const prev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setImage(images[newIndex]);
  };

  return (
    <>
      <div className=" relative mx-auto  max-w-screen-2xl justify-center lg:flex  lg:items-center ">
        <img src={image} alt="" className="w-full " />
        <div
          className="absolute right-0 top-1/2 text-white text-2xl sm:text-6xl cursor-pointer hover:border"
          onClick={next}
        >
          <IoIosArrowForward />
        </div>
        <div
          className="absolute left-0 top-1/2 text-white text-2xl sm:text-6xl cursor-pointer hover:border "
          onClick={prev}
        >
          <IoIosArrowBack />
        </div>
      </div>
    </>
  );
}

export default Hero;

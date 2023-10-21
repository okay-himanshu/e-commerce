import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Hero() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Explore Trend Tribe
              <strong className="font-extrabold text-red-700 sm:block">
                Your Premier Shopping Destination
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Elevate Your Retail Experience. Find Unique Products and Savings.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="bgRed" title={"Start shopping"} />

              <NavLink className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
                Learn More
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

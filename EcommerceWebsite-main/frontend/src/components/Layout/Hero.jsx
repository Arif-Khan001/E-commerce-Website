import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

/*
  Hero section for home page
*/
const Hero = () => {
  return (
    <section className="relative h-[750px]">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Vacation-ready fashion"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white p-6 max-w-xl">
          <h1 className="font-bold uppercase tracking-tight text-[clamp(2rem,10vw,5rem)] mb-4">
            Vacation <br /> Ready
          </h1>

          <p className="text-sm md:text-lg mb-6 font-medium">
            Explore vacation-ready outfits with fast worldwide shipping.
          </p>

          <Link
            to="/collections/all"
            className="inline-block bg-white text-gray-900 px-6 py-3 text-lg font-semibold rounded hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl overflow-hidden shadow-sm">

        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
            Comfort & Style
          </h3>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Apparel made for your everyday life
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every day.
          </p>

          <Link
            to="/collections/all"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg
                       hover:bg-gray-800 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;

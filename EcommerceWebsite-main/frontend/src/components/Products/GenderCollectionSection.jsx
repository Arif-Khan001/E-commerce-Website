import mensCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Women's Collection */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={womenCollectionImage}
            alt="Women's Collection"
            className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

          <div className="absolute bottom-8 left-8 bg-white/95 p-5 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Women's Collection
            </h2>

            <Link
              to="/collections/all?gender=Women"
              className="text-black font-medium underline underline-offset-4 hover:text-gray-700"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

          <div className="absolute bottom-8 left-8 bg-white/95 p-5 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Men's Collection
            </h2>

            <Link
              to="/collections/all?gender=Men"
              className="text-black font-medium underline underline-offset-4 hover:text-gray-700"
            >
              Shop Now →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GenderCollectionSection;

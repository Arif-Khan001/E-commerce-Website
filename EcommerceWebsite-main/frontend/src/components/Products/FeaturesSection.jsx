import {
  HiArrowPathRoundedSquare,
  HiShoppingBag,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        {/* Feature 1 */}
        <div className="flex flex-col items-center group">
          <div className="p-4 rounded-full bg-gray-100 mb-4 group-hover:bg-black transition">
            <HiShoppingBag className="text-2xl text-black group-hover:text-white transition" />
          </div>

          <h4 className="font-semibold tracking-tight mb-2">
            FREE INTERNATIONAL SHIPPING
          </h4>

          <p className="text-gray-600 text-sm">
            On all orders over $100.00
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center group">
          <div className="p-4 rounded-full bg-gray-100 mb-4 group-hover:bg-black transition">
            <HiArrowPathRoundedSquare className="text-2xl text-black group-hover:text-white transition" />
          </div>

          <h4 className="font-semibold tracking-tight mb-2">
            45 DAYS RETURN
          </h4>

          <p className="text-gray-600 text-sm">
            Money back guarantee
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center group">
          <div className="p-4 rounded-full bg-gray-100 mb-4 group-hover:bg-black transition">
            <HiOutlineCreditCard className="text-2xl text-black group-hover:text-white transition" />
          </div>

          <h4 className="font-semibold tracking-tight mb-2">
            SECURE CHECKOUT
          </h4>

          <p className="text-gray-600 text-sm">
            100% secured checkout process
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;

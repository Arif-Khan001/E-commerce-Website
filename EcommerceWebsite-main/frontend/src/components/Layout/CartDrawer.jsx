import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartContents from "../Cart/CartContents";

/*
  CartDrawer slides from the right.
  It supports:
  - Guest cart
  - Logged-in user cart
  - Outside click to close
*/
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const userId = user?._id || null;

  /* -------- Close drawer on outside click -------- */
  useEffect(() => {
    if (!drawerOpen) return;

    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        toggleCartDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen, toggleCartDrawer]);

  // Handle checkout click
  const handleCheckout = () => {
    toggleCartDrawer();

    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        drawerOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      {drawerOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem]
          bg-white shadow-lg flex flex-col
          transform transition-transform duration-300
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close */}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer} aria-label="Close cart">
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Checkout Section */}
        {cart?.products?.length > 0 && (
          <div className="p-4 border-t">
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Checkout
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Shipping, taxes, and discounts calculated at checkout.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;

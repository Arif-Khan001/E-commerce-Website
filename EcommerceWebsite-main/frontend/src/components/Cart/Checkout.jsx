import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../../redux/slices/cartSlice";
import { createCheckout, setCheckout } from "../../redux/slices/checkoutSlice";
import PayPalButton from "./PayPalButton";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [creatingCheckout, setCreatingCheckout] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart?.products?.length && !checkoutId) navigate("/");
  }, [cart, checkoutId, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((p) => ({ ...p, [name]: value }));
  };

  const isShippingValid = () =>
    Object.values(shippingAddress).every((v) => v.trim() !== "");

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (!isShippingValid() || creatingCheckout || checkoutId) return;

    try {
      setCreatingCheckout(true);
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
        })
      ).unwrap();

      setCheckoutId(res._id);
    } finally {
      setCreatingCheckout(false);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const token = localStorage.getItem("userToken");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(setCheckout(data));
      navigate("/order-confirmation");
      dispatch(clearCart());
    } catch {
      alert("Payment failed");
    }
  };

  const computedTotal = useMemo(() => {
    return cart.products.reduce(
      (sum, p) => sum + Number(p.price) * Number(p.quantity),
      0
    );
  }, [cart.products]);

  if (!cart?.products?.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT — CHECKOUT */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckout} className="space-y-5">
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-50"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleAddressChange}
              className="p-2 border rounded"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleAddressChange}
              className="p-2 border rounded"
            />
          </div>

          <input
            name="address"
            placeholder="Address"
            onChange={handleAddressChange}
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="City"
              onChange={handleAddressChange}
              className="p-2 border rounded"
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleAddressChange}
              className="p-2 border rounded"
            />
          </div>

          <input
            name="country"
            placeholder="Country"
            onChange={handleAddressChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleAddressChange}
            className="w-full p-2 border rounded"
          />

          {!checkoutId ? (
            <button
              type="submit"
              disabled={creatingCheckout}
              className="w-full bg-black text-white py-3 rounded"
            >
              {creatingCheckout ? "Processing..." : "Continue to Payment"}
            </button>
          ) : (
            <PayPalButton
              amount={computedTotal}
              onSuccess={handlePaymentSuccess}
              onError={() => alert("Payment failed")}
            />
          )}
        </form>
      </div>

      {/* RIGHT — ORDER SUMMARY */}
      <div className="bg-gray-50 rounded-xl shadow-sm p-6 sticky top-24 h-fit">
        <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

        <div className="space-y-4">
          {cart.products.map((p, i) => (
            <div key={i} className="flex gap-4 border-b pb-4">
              <img
                src={
                  p.image
                    ? `${import.meta.env.VITE_BACKEND_URL}${p.image}`
                    : "/placeholder.png"
                }
                className="w-20 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">
                  {p.size} • {p.color}
                </p>
                <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
              </div>

              <p className="font-semibold">
                ${(p.price * p.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${computedTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>${computedTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

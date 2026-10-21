import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (!checkout?._id) {
      navigate("/my-orders");
    }
  }, [checkout, navigate]);

  if (!checkout) return null;

  const items =
    checkout.checkoutItems ||
    checkout.items ||
    checkout.orderItems ||
    [];

  const estimatedDelivery = () => {
    const d = new Date(checkout.createdAt);
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      <div className="border rounded-lg p-6 space-y-6">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">Order ID</h2>
            <p className="text-gray-600">{checkout._id}</p>
          </div>

          <div className="text-right">
            <h2 className="font-semibold">Order Date</h2>
            <p className="text-gray-600">
              {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>

          {items.length === 0 && (
            <p className="text-gray-500">No items found.</p>
          )}

          {items.map((item) => (
            <div
              key={item.productId || item._id}
              className="flex items-center gap-4 border p-4 rounded mb-3"
            >
              <img
                src={
                  item.image
                    ? `${import.meta.env.VITE_BACKEND_URL}${item.image}`
                    : "/placeholder.png"
                }
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  {item.color} • Qty {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p className="text-gray-600">
            {checkout.shippingAddress?.address},{" "}
            {checkout.shippingAddress?.city},{" "}
            {checkout.shippingAddress?.country}
          </p>
        </div>

        <div className="flex justify-between text-xl font-bold border-t pt-4">
          <span>Total</span>
          <span>${checkout.totalPrice}</span>
        </div>

        <p className="text-emerald-700 text-sm">
          Estimated Delivery: {estimatedDelivery()}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

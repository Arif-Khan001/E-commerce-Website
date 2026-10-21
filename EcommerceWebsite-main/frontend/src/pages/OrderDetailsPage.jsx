import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderDetails, loading, error } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id, user, navigate]);

  if (loading) return <p className="text-center py-10">Loading order…</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load order
      </p>
    );

  if (!orderDetails) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>

      <div className="bg-white border rounded-lg p-6">
        <p className="text-sm text-gray-500 mb-4">
          Order ID: {orderDetails._id}
        </p>

        <table className="min-w-full border rounded">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderItems.map((item) => (
              <tr key={item.productId} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={
                      item.image
                        ? `${import.meta.env.VITE_BACKEND_URL}${item.image}`
                        : "/placeholder.png"
                    }
                    className="w-12 h-12 object-cover rounded"
                  />
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="p-3 text-center">${item.price}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-center font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link
          to="/my-orders"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

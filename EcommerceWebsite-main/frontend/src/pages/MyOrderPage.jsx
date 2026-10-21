import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders = [], loading, error } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  /* ---------- Guard ---------- */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchUserOrders());
  }, [dispatch, user, navigate]);

  if (loading) return <p className="text-center py-10">Loading orders…</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load orders
      </p>
    );
  if (!orders.length)
    return <p className="text-center py-10">No orders found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => navigate(`/order/${order._id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 font-medium">{order._id}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">{order.orderItems.length}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;

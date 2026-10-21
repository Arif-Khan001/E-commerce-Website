import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchAllOrders,
    updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector(
        (state) => state.adminOrders
    );

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);

    const handleStatusChange = async (orderId, status) => {
        await dispatch(updateOrderStatus({ id: orderId, status }));
        dispatch(fetchAllOrders());
    };


    if (loading) {
        return (
            <p className="text-center py-10 text-gray-500">
                Loading orders...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center py-10 text-red-500">
                {error}
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Order Management
            </h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No orders found.
                </p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                    <table className="min-w-full text-left text-sm text-gray-700">
                        <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Total</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-4 px-4 font-medium text-gray-900">
                                        #{order._id}
                                    </td>

                                    <td className="py-4 px-4">
                                        {order.user?.name || "Guest"}
                                    </td>

                                    <td className="py-4 px-4">
                                        ${order.totalPrice.toFixed(2)}
                                    </td>

                                    <td className="py-4 px-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-black focus:border-black"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>

                                    <td className="py-4 px-4 text-right">
                                        {order.status !== "Delivered" && (
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(
                                                        order._id,
                                                        "Delivered"
                                                    )
                                                }
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;

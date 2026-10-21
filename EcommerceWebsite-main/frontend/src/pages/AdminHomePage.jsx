import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts } from '../redux/slices/adminProductSlice'
import { fetchAllOrders } from '../redux/slices/adminOrderSlice'

const AdminHomePage = () => {
  const dispatch = useDispatch()

  const {
    products = [],
    loading: productsLoading,
    error: productsError
  } = useSelector((state) => state.adminProducts)

  const {
    orders = [],
    totalOrders = 0,
    totalSales = 0,
    loading: ordersLoading,
    error: ordersError
  } = useSelector((state) => state.adminOrders)

  useEffect(() => {
    dispatch(fetchAdminProducts())
    dispatch(fetchAllOrders())
  }, [dispatch])

  if (productsLoading || ordersLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading dashboard...
      </div>
    )
  }

  if (productsError || ordersError) {
    return (
      <div className="text-center text-red-500 mt-10">
        {productsError || ordersError}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ${Number(totalSales).toFixed(2)}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
          <Link
            to="/admin/orders"
            className="inline-block mt-3 text-sm text-blue-600 hover:underline"
          >
            View Orders →
          </Link>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
          <Link
            to="/admin/products"
            className="inline-block mt-3 text-sm text-blue-600 hover:underline"
          >
            Manage Products →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-mono text-xs">{order._id}</td>
                    <td className="p-3">
                      {order.user?.name || 'Guest'}
                    </td>
                    <td className="p-3">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage

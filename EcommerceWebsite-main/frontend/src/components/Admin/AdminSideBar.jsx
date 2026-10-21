import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaUser,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="p-6 flex flex-col h-full">

      {/* Logo → Home */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight hover:text-gray-300 transition"
        >
          Rabbit
        </Link>
      </div>

      {/* Admin Dashboard → /admin */}
      <Link
        to="/admin"
        className="text-xl font-medium mb-6 text-center hover:text-gray-300 transition"
      >
        Admin Dashboard
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center gap-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center gap-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center gap-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center gap-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center gap-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSideBar;

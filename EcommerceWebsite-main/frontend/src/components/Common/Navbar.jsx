import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

/*
  Navbar responsibilities:
  - Primary navigation (desktop & mobile)
  - Cart access + item count
  - Search
  - Auth / Admin entry point
*/
const Navbar = () => {
  // Auth & cart state from Redux
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // UI state
  const [drawerOpen, setDrawerOpen] = useState(false);     // cart drawer
  const [navDrawerOpen, setNavDrawerOpen] = useState(false); // mobile nav

  // Ref for detecting outside click on mobile nav
  const navDrawerRef = useRef(null);

  // Safely compute cart item count
  const cartItemCount =
    cart?.products?.reduce(
      (total, product) => total + (product.quantity || 0),
      0
    ) || 0;

  // Toggle handlers
  const toggleCartDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleNavDrawer = () => setNavDrawerOpen((prev) => !prev);

  /* ---------------- Close mobile nav on outside click ---------------- */
  useEffect(() => {
    if (!navDrawerOpen) return;

    const handleClickOutside = (e) => {
      if (navDrawerRef.current && !navDrawerRef.current.contains(e.target)) {
        setNavDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navDrawerOpen]);

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
          Rabbit
        </Link>

        {/* Center links (desktop only) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className="nav-link"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="nav-link"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="nav-link"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="nav-link"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {/* Admin shortcut */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="bg-black text-white text-xs px-3 py-1 rounded"
            >
              Admin
            </Link>
          )}

          {/* Profile / Login */}
          <Link to={user ? "/profile" : "/login"} aria-label="User profile">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative"
            aria-label="Open cart"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search */}
          <SearchBar />

          {/* Mobile menu button */}
          <button
            onClick={toggleNavDrawer}
            className="md:hidden"
            aria-label="Open menu"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* ================= CART DRAWER ================= */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* ================= MOBILE NAV DRAWER ================= */}
      <aside
        ref={navDrawerRef}
        className={`
          fixed top-0 left-0 h-full w-3/4 sm:w-1/3 bg-white shadow-lg
          transform transition-transform duration-300 z-50
          ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer} aria-label="Close menu">
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Menu links */}
        <nav className="p-4 space-y-4 font-medium">
          <Link
            to="/collections/all?gender=Men"
            onClick={toggleNavDrawer}
            className="block text-gray-700 hover:text-black"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            onClick={toggleNavDrawer}
            className="block text-gray-700 hover:text-black"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            onClick={toggleNavDrawer}
            className="block text-gray-700 hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            onClick={toggleNavDrawer}
            className="block text-gray-700 hover:text-black"
          >
            Bottom Wear
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;

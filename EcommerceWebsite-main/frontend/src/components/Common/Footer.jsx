import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

/*
  Footer is a global site component.
  It provides:
  - Newsletter signup
  - Quick links
  - Social links
  - Contact info
*/
const Footer = () => {
  return (
    <footer className="border-t py-12 bg-white">
      {/* ================= MAIN FOOTER ================= */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">

        {/* Newsletter */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>

          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and offers.
          </p>

          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-gray-500">Men's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Women's Top Wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Men's Bottom Wear</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Women's Bottom Wear</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="#" className="hover:text-gray-500">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-gray-500">About Us</Link></li>
            <li><Link to="#" className="hover:text-gray-500">FAQs</Link></li>
            <li><Link to="#" className="hover:text-gray-500">Features</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>

          <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <RiTwitterXLine className="h-4 w-5" />
            </a>
          </div>

          <p className="text-gray-500">Call Us</p>
          <p className="flex items-center gap-2">
            <FiPhoneCall />
            01234-456-789
          </p>
        </div>
      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="container mx-auto mt-12 border-t pt-6">
        <p className="text-gray-500 text-sm text-center">
          © 2025 Rabbit. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

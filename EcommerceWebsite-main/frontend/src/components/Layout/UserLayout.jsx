import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

/*
  UserLayout wraps all user-facing pages.
  It ensures Header and Footer remain consistent
  while the main content changes using <Outlet />.
*/
const UserLayout = () => {
  return (
    <>
      {/* Global site header (navbar, cart, auth links) */}
      <Header />

      {/* Main content area where routed pages render */}
      <main className="min-h-screen px-4 md:px-8">
        <Outlet />
      </main>

      {/* Global site footer */}
      <Footer />
    </>
  );
};

export default UserLayout;

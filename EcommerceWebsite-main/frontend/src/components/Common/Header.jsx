import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

/*
  Header is a global component shown on all user pages.
  It contains:
  - Topbar (offers, info, etc.)
  - Navbar (logo, navigation, cart, auth)
*/
const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;

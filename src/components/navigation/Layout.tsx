// ShoppingLayout.js
import React, { useContext, useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import Footer from "../UI/Footer";

import { useLocation } from "react-router-dom";
import useAuthContext from "../../auth-store/useAuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { state } = useAuthContext();
  const isLandingScreen = pathname === "/";
  const { isAuthenticated } = state;
  const shouldShowSidebar = !isLandingScreen && isAuthenticated;

  return (
    <div className="flex flex-col min-h-screen bg-theme-bg">
      {shouldShowSidebar && <TopHeader />}
      
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </main>

      {shouldShowSidebar && <Footer />}
    </div>
  );
};

export default Layout;

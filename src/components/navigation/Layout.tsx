// ShoppingLayout.js
import React, { useContext, useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import SideNav from "./SideNav";
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
    <div className="flex min-h-screen bg-theme-bg">
      {/* Sidebar - Fixed Left */}
      {shouldShowSidebar && (
        <div className="hidden md:block">
          <SideNav />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {shouldShowSidebar && <TopHeader />}
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </main>

        {shouldShowSidebar && <Footer />}
      </div>
    </div>
  );
};

export default Layout;

// ShoppingLayout.js
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./SideNav";

import { useLocation } from "react-router-dom";
import useAuthContext from "../../auth-store/useAuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { state } = useAuthContext();
  const isLandingScreen = pathname === "/";
  const { isAuthenticated } = state;
  const shouldShowSidebar = !isLandingScreen && isAuthenticated;

  return (
    <>
      <div className={`${shouldShowSidebar ? "flex" : ""}`}>
        {shouldShowSidebar && (
          <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
            <Sidebar />
          </div>
        )}
        <main
          className={`${
            shouldShowSidebar ? "flex" : ""
          } w-full min-h-screen overflow-y: scroll`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

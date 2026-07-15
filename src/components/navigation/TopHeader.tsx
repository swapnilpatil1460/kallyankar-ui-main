import { NavLink } from "react-router-dom";
import { LogOutIcon, Menu, X, User } from "lucide-react";
import useSessionManagement from "../../hooks/useSessionManagement";
import { NavLinkProps } from "./NavLinkProps";
import { useState, useRef, useEffect } from "react";
import invoiceLogo from "../svg/InvoiceLogo.svg";
import useAuthContext from "../../auth-store/useAuthContext";

const TopHeader = () => {
  const { handleUserLogout } = useSessionManagement();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { state: { user } } = useAuthContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-theme-c2 border-b border-theme-c3 z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
             <span className="text-white font-bold text-xl tracking-wider">KALYANKAR BATTERIES</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center h-full">
            {NavLinkProps.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 h-full border-b-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? "border-theme-c1 text-white" 
                      : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side - Profile Dropdown */}
          <div className="hidden md:flex items-center">
            <div className="ml-3 relative" ref={dropdownRef}>
              <div>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-500 transition duration-150 ease-in-out"
                >
                  <div className="h-8 w-8 rounded-full bg-theme-c3 flex items-center justify-center text-gray-300 border border-gray-600 hover:text-white transition-colors">
                    <User size={18} />
                  </div>
                </button>
              </div>
              
              {/* Dropdown panel */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-theme-c2 ring-1 ring-black ring-opacity-5 py-1 border border-theme-c3">
                  <div className="px-4 py-2 border-b border-theme-c3">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">Product Owner</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleUserLogout();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-theme-c3 hover:text-white transition-colors"
                  >
                    <LogOutIcon size={16} className="mr-2 text-gray-400" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-theme-c3 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-theme-c2 border-b border-theme-c3">
          <div className="pt-2 pb-3 space-y-1">
            {NavLinkProps.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? "bg-[#2a0000] border-theme-c1 text-theme-c1" 
                      : "border-transparent text-gray-400 hover:bg-theme-c3 hover:border-gray-500 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-theme-c3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-theme-c3 flex items-center justify-center text-gray-300 border border-gray-600">
                  <User size={20} />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.name || "Admin"}</div>
                <div className="text-sm font-medium text-gray-400">Product Owner</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleUserLogout();
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-theme-c3"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopHeader;

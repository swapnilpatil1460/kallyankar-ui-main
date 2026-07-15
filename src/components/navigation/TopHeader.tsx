import { LogOutIcon, Menu, User } from "lucide-react";
import useSessionManagement from "../../hooks/useSessionManagement";
import { useState, useRef, useEffect } from "react";
import useAuthContext from "../../auth-store/useAuthContext";

interface TopHeaderProps {
  onMenuClick?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick }) => {
  const { handleUserLogout } = useSessionManagement();
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
    <header className="w-full bg-white border-b border-theme-c3 z-40 sticky top-0 h-20 flex items-center justify-end px-4 sm:px-8">
      <div className="flex-1 flex md:hidden">
        <button onClick={onMenuClick} className="text-slate-500 hover:text-theme-c1 transition-colors p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Right side - Profile Dropdown */}
      <div className="flex items-center gap-6">

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{user?.name || "Admin"}</p>
              <p className="text-xs font-medium text-slate-400">Product Owner</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-theme-bg flex items-center justify-center text-slate-500 border border-theme-c3 group-hover:border-theme-c1 group-hover:text-theme-c1 transition-all shadow-sm">
              <User size={20} />
            </div>
          </button>
          
          {/* Dropdown panel */}
          {isProfileOpen && (
            <div className="origin-top-right absolute right-0 mt-3 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-2 border border-theme-c3 z-50">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  handleUserLogout();
                }}
                className="flex w-full items-center px-4 py-2 text-sm font-bold text-slate-600 hover:bg-theme-bg hover:text-theme-c1 transition-colors"
              >
                <LogOutIcon size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;

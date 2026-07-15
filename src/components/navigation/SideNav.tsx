import { NavLink } from "react-router-dom";
import { NavLinkProps } from "./NavLinkProps";
import { KalyankarLogo } from "../../assets/images";

interface SideNavProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

function SideNav({ isOpen = false, setIsOpen }: SideNavProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen?.(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col w-64 bg-white border-r border-theme-c3 min-h-[100svh]`}>
        <div className="flex items-center justify-between p-6 border-b border-theme-c3">
          <div className="flex items-center gap-3">
            <img src={KalyankarLogo} alt="Logo" className="w-10 h-10 object-contain rounded shadow-sm" />
            <span className="font-black text-sm tracking-widest text-slate-900 uppercase">Kalyankar</span>
          </div>
          <button onClick={() => setIsOpen?.(false)} className="md:hidden text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Dashboard</p>
          {NavLinkProps.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen?.(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-theme-c1/10 text-theme-c1 shadow-[0_4px_10px_rgba(204,0,0,0.1)]"
                    : "text-slate-500 hover:bg-theme-c3/50 hover:text-slate-800"
                }`
              }
            >
              <span className="opacity-80">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-theme-c3">
          <div className="bg-theme-bg rounded-xl p-4 text-center border border-theme-c3">
            <p className="text-xs font-bold text-slate-500 mb-1">Amaron Authorized</p>
            <p className="text-sm font-black text-slate-800">Gargoti Branch</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;

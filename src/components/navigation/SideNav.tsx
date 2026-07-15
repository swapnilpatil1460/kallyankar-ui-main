import { NavLink } from "react-router-dom";
import { NavLinkProps } from "./NavLinkProps";
import { KalyankarLogo } from "../../assets/images";

function SideNav() {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-theme-c3 min-h-[100svh] sticky top-0">
      <div className="flex items-center gap-3 p-6 border-b border-theme-c3">
        <img src={KalyankarLogo} alt="Logo" className="w-10 h-10 object-contain rounded shadow-sm" />
        <span className="font-black text-sm tracking-widest text-slate-900 uppercase">Kalyankar</span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Dashboard</p>
        {NavLinkProps.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
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
  );
}

export default SideNav;

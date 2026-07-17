import { Link } from "react-router-dom";
import { KalyankarLogo } from "../../assets/images";

const Footer = () => (
  <footer className="bg-theme-c2 border-t border-theme-c3 px-5 py-10 text-gray-400 sm:px-8 lg:px-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <span className="rounded-2xl bg-white p-2">
          <img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-16 w-16 object-contain" />
        </span>
        <span className="font-semibold text-gray-700 text-lg">Kalyankar Batteries</span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2"><a href="#services" className="hover:text-gray-700 transition-colors">Services</a><a href="#workplace" className="hover:text-gray-700 transition-colors">Workplace</a><a href="#contact" className="hover:text-gray-700 transition-colors">Contact</a><Link to="/admin-login" className="hover:text-theme-c1 transition-colors">Admin login</Link></div>
      <p>© {new Date().getFullYear()} Kalyankar Batteries.</p>
    </div>
  </footer>
);

export default Footer;

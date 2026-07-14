import { Link } from "react-router-dom";
import { KalyankarLogo } from "../../assets/images";

const Footer = () => (
  <footer className="bg-slate-950 px-5 py-10 text-slate-400 sm:px-8 lg:px-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3"><span className="rounded-xl bg-white p-1"><img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-8 w-8 object-contain" /></span><span className="font-semibold text-white">Kalyankar Batteries</span></div>
      <div className="flex flex-wrap gap-x-6 gap-y-2"><a href="#services" className="hover:text-lime-300">Services</a><a href="#workplace" className="hover:text-lime-300">Workplace</a><a href="#contact" className="hover:text-lime-300">Contact</a><Link to="/admin-login" className="hover:text-lime-300">Admin login</Link></div>
      <p>© {new Date().getFullYear()} Kalyankar Batteries.</p>
    </div>
  </footer>
);

export default Footer;

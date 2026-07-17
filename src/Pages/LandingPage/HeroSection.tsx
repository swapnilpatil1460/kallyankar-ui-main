import { ArrowRight, LogIn, Menu, Phone, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { KalyankarLogo, KalyankarShop } from "../../assets/images";

const HeroSection = () => {
  return (
    <section className="relative isolate min-h-[100svh] flex flex-col bg-theme-bg text-gray-700 overflow-hidden">
      {/* Cinematic Background */}
      <img
        src={KalyankarShop}
        alt="Kalyankar Batteries showroom"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30 grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-theme-bg/60 via-theme-bg/90 to-theme-bg" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-c1/10 blur-[100px]" />

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-4 group" aria-label="Kalyankar Batteries home">
          <span className="rounded-2xl bg-white p-2 shadow-[0_0_20px_rgba(204,0,0,0.2)] transition-shadow group-hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]">
            <img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-20 w-20 rounded-xl object-contain" />
          </span>
          <span className="text-sm font-bold tracking-[0.2em] uppercase sm:text-base hidden sm:block">KALYANKAR <span className="text-theme-c1">BATTERIES</span></span>
        </a>
        <div className="hidden items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400 md:flex">
          <a className="transition hover:text-gray-700" href="#services">Services</a>
          <a className="transition hover:text-gray-700" href="#workplace">Workplace</a>
          <a className="transition hover:text-gray-700" href="#contact">Contact</a>
          <Link to="/admin-login" className="rounded-full border border-theme-c3 bg-theme-c2/50 backdrop-blur-md px-6 py-2.5 transition hover:border-theme-c1 hover:text-gray-700 shadow-lg">Admin Login</Link>
        </div>
        <a href="#contact" className="rounded-full bg-theme-c1 p-3 text-gray-700 md:hidden shadow-lg" aria-label="Contact us"><Menu size={20} /></a>
      </nav>

      {/* Centered Hero Content */}
      <div id="home" className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-5 py-12 sm:px-8 lg:px-10">
        
        {/* Top Badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-theme-c3 bg-theme-c2/30 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-theme-c1 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-c1 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-c1"></span>
          </span>
          Power that keeps you moving
        </div>

        {/* Massive Typography */}
        <h1 className="max-w-5xl text-5xl font-black leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl">
          Unrelenting power for <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-c1 to-red-500">
            every journey.
          </span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl font-medium">
          Premium automotive batteries, expert diagnostics, and trusted service you can count on—right here in Gargoti.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row w-full max-w-md mx-auto sm:max-w-none justify-center">
          <a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-theme-c1 px-8 py-4 text-sm font-bold uppercase tracking-widest text-gray-700 shadow-[0_0_20px_rgba(204,0,0,0.3)] transition hover:bg-theme-c1-b hover:shadow-[0_0_30px_rgba(204,0,0,0.5)]">
            Find Your Battery <ArrowRight size={18} />
          </a>
          <a href="tel:9359163465" className="inline-flex items-center justify-center gap-3 rounded-full border border-theme-c3 bg-theme-c2/30 backdrop-blur-sm px-8 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-white hover:text-black">
            <Phone size={18} /> Call 9359163465
          </a>
        </div>

        {/* Premium Stats/Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-theme-c3/50 pt-10 sm:grid-cols-3 max-w-3xl w-full mx-auto">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-theme-c1 mb-3" size={32} />
            <strong className="block text-2xl font-black text-gray-700">100%</strong>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Authentic</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="text-theme-c1 mb-3" size={32} />
            <strong className="block text-2xl font-black text-gray-700">Expert</strong>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Diagnostics</span>
          </div>
          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <div className="text-theme-c1 mb-3 flex items-center justify-center font-serif text-3xl font-black italic">A</div>
            <strong className="block text-2xl font-black text-gray-700">Authorized</strong>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Amaron Dealer</span>
          </div>
        </div>
      </div>

      {/* Mobile Admin Link */}
      <Link to="/admin-login" className="absolute bottom-6 right-6 inline-flex z-20 items-center gap-2 rounded-full border border-theme-c3 bg-theme-c2/50 backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition hover:border-theme-c1 md:hidden">
        <LogIn size={15} className="text-theme-c1" /> Admin
      </Link>
    </section>
  );
};

export default HeroSection;

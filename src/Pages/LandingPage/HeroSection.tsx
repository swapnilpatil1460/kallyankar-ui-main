import { ArrowRight, LogIn, Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { KalyankarLogo, KalyankarShop, LandingPageBattery } from "../../assets/images";

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <img
        src={KalyankarShop}
        alt="Kalyankar Batteries showroom"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950/95 to-emerald-950/80" />
      <div className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-lime-400/20 blur-3xl" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-3" aria-label="Kalyankar Batteries home">
          <span className="rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20">
            <img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-9 w-9 rounded-xl object-contain" />
          </span>
          <span className="text-sm font-bold tracking-wide sm:text-base">KALYANKAR <span className="text-lime-300">BATTERIES</span></span>
        </a>
        <div className="hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
          <a className="transition hover:text-lime-300" href="#services">Services</a>
          <a className="transition hover:text-lime-300" href="#workplace">Our workplace</a>
          <a className="transition hover:text-lime-300" href="#contact">Contact</a>
          <Link to="/admin-login" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-lime-300 hover:bg-white/10">Admin login</Link>
        </div>
        <a href="#contact" className="rounded-full bg-lime-300 p-2.5 text-slate-950 md:hidden" aria-label="Contact us"><Menu size={20} /></a>
      </nav>

      <div id="home" className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pb-28">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
            <span className="h-2 w-2 rounded-full bg-lime-300" /> Power that keeps you moving
          </p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Power for every <span className="text-lime-300">journey.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Reliable batteries, practical guidance and service you can count on—right here in Gargoti.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-lime-200">
              Find the right battery <ArrowRight size={18} />
            </a>
            <a href="tel:9359163465" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold transition hover:bg-white/10">
              <Phone size={18} /> Call 9359163465
            </a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm">
            <div><strong className="block text-2xl text-lime-300">Tested</strong><span className="text-slate-300">for reliability</span></div>
            <div><strong className="block text-2xl text-lime-300">Trusted</strong><span className="text-slate-300">local service</span></div>
            <div><strong className="block text-2xl text-lime-300">Ready</strong><span className="text-slate-300">when you are</span></div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute inset-8 rounded-[3rem] bg-lime-300/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
            <img src={LandingPageBattery} alt="High quality battery" className="h-[330px] w-full rounded-[2rem] object-cover sm:h-[420px]" />
            <div className="absolute bottom-10 left-10 rounded-2xl bg-slate-950/85 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-lime-200">Drive with confidence</p>
              <p className="mt-1 font-semibold">Battery expertise, nearby.</p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/admin-login" className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/20 md:hidden"><LogIn size={15} /> Admin</Link>
    </section>
  );
};

export default HeroSection;

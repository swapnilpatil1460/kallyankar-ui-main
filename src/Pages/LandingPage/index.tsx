import { Award, BatteryCharging, CarFront, ShieldCheck, Wrench } from "lucide-react";
import Contact from "./contact";
import Footer from "./footer";
import LandingPageHeader from "./HeroSection";
import { KB_1, KB_2, KB_3 } from "../../assets/images";

const services = [
  { icon: <ShieldCheck />, title: "Quality guarantee", text: "Every battery is thoroughly checked for dependable performance." },
  { icon: <BatteryCharging />, title: "Reliable options", text: "Find battery solutions suited to your vehicle and daily use." },
  { icon: <Wrench />, title: "Expert guidance", text: "Clear, practical help choosing the battery that fits your needs." },
  { icon: <Award />, title: "Trusted partnerships", text: "Quality products and service from brands you can rely on." },
];

const LandingPage = () => (
  <div className="bg-stone-50 text-slate-900">
    <LandingPageHeader />
    <main>
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Why Kalyankar</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Made for the road ahead.</h2>
            <p className="mt-5 max-w-md leading-7 text-slate-600">We make battery buying simple: dependable products, honest advice and help that continues after purchase.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-emerald-950 px-5 py-4 text-white">
              <CarFront className="text-lime-300" size={28} />
              <span><strong className="block">For every drive</strong><span className="text-sm text-slate-300">Personal and commercial vehicles</span></span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => <article key={service.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
              <div className="mb-5 inline-flex rounded-2xl bg-lime-100 p-3 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-lime-200">{service.icon}</div>
              <h3 className="text-lg font-bold">{service.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{service.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="workplace" className="overflow-hidden bg-emerald-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Our workplace</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A familiar place for dependable power.</h2></div><p className="max-w-md leading-7 text-slate-300">Visit us for practical answers and battery support from people who understand the road you travel.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[KB_1, KB_2, KB_3].map((image, index) => <img key={image} src={image} alt={`Kalyankar Batteries workplace ${index + 1}`} className={`h-72 w-full rounded-3xl object-cover ${index === 1 ? "md:-translate-y-6" : ""}`} />)}
          </div>
        </div>
      </section>
      <Contact />
    </main>
    <Footer />
  </div>
);

export default LandingPage;

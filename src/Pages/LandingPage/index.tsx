import { Award, BatteryCharging, CarFront, ShieldCheck, Wrench } from "lucide-react";
import Contact from "./contact";
import Footer from "./footer";
import LandingPageHeader from "./HeroSection";
import { KB_1, KB_2, KB_3 } from "../../assets/images";
import ImageSlider from "../../components/UI/ImageSlider";

const services = [
  { icon: <ShieldCheck />, title: "Quality guarantee", text: "Every battery is thoroughly checked for dependable performance." },
  { icon: <BatteryCharging />, title: "Reliable options", text: "Find battery solutions suited to your vehicle and daily use." },
  { icon: <Wrench />, title: "Expert guidance", text: "Clear, practical help choosing the battery that fits your needs." },
  { icon: <Award />, title: "Trusted partnerships", text: "Quality products and service from brands you can rely on." },
];

const LandingPage = () => (
  <div className="bg-theme-bg text-gray-700">
    <LandingPageHeader />
    <main>
      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-theme-c1">Why Kalyankar</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Made for the road ahead.</h2>
            <p className="mt-5 max-w-md leading-7 text-gray-400">We make battery buying simple: dependable products, honest advice and help that continues after purchase.</p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-theme-c2 px-5 py-4 text-gray-700 border border-theme-c3">
              <CarFront className="text-theme-c1" size={28} />
              <span><strong className="block">For every drive</strong><span className="text-sm text-gray-400">Personal and commercial vehicles</span></span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => <article key={service.title} className="group rounded-3xl border border-theme-c3 bg-theme-c2 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-theme-c1 hover:shadow-xl">
              <div className="mb-5 inline-flex rounded-2xl bg-black p-3 text-gray-700 border border-theme-c3 transition group-hover:bg-theme-c1 group-hover:border-theme-c1">{service.icon}</div>
              <h3 className="text-lg font-bold">{service.title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{service.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="workplace" className="overflow-hidden bg-theme-c2 border-y border-theme-c3 px-5 py-20 text-gray-700 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-theme-c1">Our workplace</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A familiar place for dependable power.</h2></div><p className="max-w-md leading-7 text-gray-400">Visit us for practical answers and battery support from people who understand the road you travel.</p></div>
          <div className="mt-12 w-full max-w-5xl mx-auto">
            <ImageSlider images={[KB_1, KB_2, KB_3]} interval={3000} />
          </div>
        </div>
      </section>
      <Contact />
    </main>
    <Footer />
  </div>
);

export default LandingPage;

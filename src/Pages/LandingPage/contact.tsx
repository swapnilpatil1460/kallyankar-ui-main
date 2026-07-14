import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const Contact = () => (
  <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
    <div className="overflow-hidden rounded-[2rem] bg-lime-300 shadow-xl shadow-lime-900/10 lg:grid lg:grid-cols-[.9fr_1.1fr]">
      <div className="bg-slate-950 p-8 text-white sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Contact us</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight">Let’s find your battery.</h2>
        <p className="mt-5 leading-7 text-slate-300">Call, message or visit Kalyankar Batteries in Gargoti. We are happy to help you make the right choice.</p>
        <div className="mt-9 space-y-5 text-sm">
          <a className="flex items-start gap-3 transition hover:text-lime-300" href="https://maps.google.com/?q=Shinde+complex+main-road+Gargoti+Bhudargad+Kolhapur+416209" target="_blank" rel="noreferrer"><MapPin className="mt-0.5 shrink-0 text-lime-300" size={20} /><span>Shinde complex, main-road Gargoti<br />Bhudargad, Kolhapur – 416209</span></a>
          <a className="flex items-center gap-3 transition hover:text-lime-300" href="tel:9359163465"><Phone className="shrink-0 text-lime-300" size={20} />9359163465</a>
          <a className="flex items-center gap-3 transition hover:text-lime-300" href="mailto:siddhesh@kalyankar.com"><Mail className="shrink-0 text-lime-300" size={20} />siddhesh@kalyankar.com</a>
        </div>
      </div>
      <div className="p-8 sm:p-12"><p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-900">Quick support</p><h3 className="mt-4 text-3xl font-bold tracking-tight text-emerald-950">Have a question? Start a conversation.</h3><p className="mt-4 max-w-md leading-7 text-emerald-950/75">Send us a WhatsApp message for quick assistance with availability, replacement and battery guidance.</p><a href="https://wa.me/919359163465" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-950 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-900"><MessageCircle size={19} /> Chat on WhatsApp</a></div>
    </div>
  </section>
);

export default Contact;

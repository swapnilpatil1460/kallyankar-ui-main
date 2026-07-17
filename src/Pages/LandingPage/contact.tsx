import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const Contact = () => (
  <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
    <div className="overflow-hidden rounded-[2rem] bg-theme-c1 border border-theme-c3 shadow-xl lg:grid lg:grid-cols-[.9fr_1.1fr]">
      <div className="bg-black p-8 text-gray-700 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-theme-c1">Contact us</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight">Let’s find your battery.</h2>
        <p className="mt-5 leading-7 text-gray-400">Call, message or visit Kalyankar Batteries in Gargoti. We are happy to help you make the right choice.</p>
        <div className="mt-9 space-y-5 text-sm">
          <a className="flex items-start gap-3 transition hover:text-theme-c1" href="https://maps.google.com/?q=Shinde+complex+main-road+Gargoti+Bhudargad+Kolhapur+416209" target="_blank" rel="noreferrer"><MapPin className="mt-0.5 shrink-0 text-theme-c1" size={20} /><span>Shinde complex, main-road Gargoti<br />Bhudargad, Kolhapur – 416209</span></a>
          <a className="flex items-center gap-3 transition hover:text-theme-c1" href="tel:9359163465"><Phone className="shrink-0 text-theme-c1" size={20} />9359163465</a>
          <a className="flex items-center gap-3 transition hover:text-theme-c1" href="mailto:siddhesh@kalyankar.com"><Mail className="shrink-0 text-theme-c1" size={20} />siddhesh@kalyankar.com</a>
        </div>
      </div>
      <div className="bg-theme-c2 p-8 sm:p-12 text-gray-700"><p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Quick support</p><h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-700">Have a question? Start a conversation.</h3><p className="mt-4 max-w-md leading-7 text-gray-400">Send us a WhatsApp message for quick assistance with availability, replacement and battery guidance.</p><a href="https://wa.me/919359163465" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-theme-c1 px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-theme-c1-b"><MessageCircle size={19} /> Chat on WhatsApp</a></div>
    </div>
  </section>
);

export default Contact;

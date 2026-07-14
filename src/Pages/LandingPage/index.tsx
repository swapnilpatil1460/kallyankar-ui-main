import {
  CloudIcon,
  CarIcon,
  GearIcon,
  GiftIcon,
} from "../../assets/images/SVGIcons";

LandingPageBattery;
import Contact from "./contact";
import Footer from "./footer";
import LandingPageHeader from "./HeroSection";

import { LandingPageBattery, KB_1, KB_2, KB_3 } from "../../assets/images";
import Carousel from "../../components/UI/Carousel";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <LandingPageHeader />
      <div id="feature" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="mb-8 text-3xl font-semibold text-indigo-700 tracking-wide text-center lg:text-left">
                Our Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ServiceCard
                  icon={<CloudIcon />}
                  title="Quality Guarantee"
                  description="We thoroughly test our batteries to make sure they're reliable and perform well."
                />
                <ServiceCard
                  icon={<GiftIcon />}
                  title="Quality Assurance"
                  description="We thoroughly test our batteries to make sure they're reliable and perform well."
                />
                <ServiceCard
                  icon={<GearIcon />}
                  title="Expert Guidance"
                  description="Our knowledgeable team will help you choose the right battery for your vehicle."
                />
                <ServiceCard
                  icon={<CarIcon />}
                  title="Trusted Partnerships"
                  description="We work with top brands to offer you the best quality and service."
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="mx-auto lg:ml-12 flex justify-center">
                <img
                  src={LandingPageBattery}
                  alt="Battery"
                  className="w-full max-w-md lg:max-w-lg h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="team" className="bg-slate-100 w-full p-10">
        <div className="m-12">
          <h2 className="mb-8 text-3xl font-semibold text-indigo-700 tracking-wide">
            Our Workplace
          </h2>
          <Carousel interval={10000} images={[KB_1, KB_2, KB_3]} />
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

// Example of ServiceCard component
const ServiceCard: React.FC<any> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4 text-indigo-700">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h4>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default LandingPage;

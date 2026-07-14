import { WhatsAppIcon } from "../../assets/images/SVGIcons";
const Contact = () => {
  return (
    <section id="contact" className="bg-gray-50 py-16 px-6 md:px-20 -mt-12">
      <div className="w-full mb-12 text-center">
        <h4 className="uppercase text-3xl font-semibold text-indigo-800 tracking-wider">
          Contact Us
        </h4>
        <div className="flex justify-center items-center space-x-2 my-4">
          <div className="border-b-4 border-gray-500 w-16 shadow-xl"></div>
          <div className="border-b-4 border-red-500 w-16 shadow-xl"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        <div className="w-full md:w-1/2">
          <iframe
            title="map"
            className="w-full h-80 rounded-lg shadow-lg"
            frameBorder={0}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15316.444992372923!2d74.142921!3d16.317259!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1688978645117!5m2!1sen!2sin"
          ></iframe>
        </div>

        <div className="w-full md:w-1/2 text-gray-700">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-indigo-800 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>
              <p className="text-lg font-medium">
                Shinde complex, main-road Gargoti Bhudargad, Kolhapur, PIN
                416209
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="text-indigo-800 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <p className="text-lg font-medium">siddhesh@kalyankar.com</p>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-4">
                  <WhatsAppIcon />
                </span>
                <p className="text-lg font-medium">9359163465</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 text-gray-400 my-12"></div>
    </section>
  );
};

export default Contact;

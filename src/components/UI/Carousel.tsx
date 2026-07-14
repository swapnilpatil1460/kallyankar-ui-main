import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState, useEffect } from "react";

type CarouselProps = {
  images: string[];
  interval: number;
};
const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex, interval]);

  return (
    <div className="relative h-[80vh] flex justify-center items-center">
      <div className="carousel relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } absolute inset-0 transition-opacity duration-1000`}
          >
            <img
              className="w-full h-full object-cover rounded-sm shadow-md"
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white shadow-md hover:bg-opacity-70 transition duration-300 md:left-6 lg:left-8"
        >
          <MoveLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full text-white shadow-md hover:bg-opacity-70 transition duration-300 md:right-6 lg:right-8"
        >
          <MoveRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

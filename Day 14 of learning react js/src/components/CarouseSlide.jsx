import { useState } from "react";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

// Unsplash images (replace with your own or use dynamic fetching)
const images = [
  "https://plus.unsplash.com/premium_photo-1693060075019-9bbfa21e3328?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1694475501793-0d378480d190?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614335770666-46566338336b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center transition-all duration-300 ${
        darkMode ? "bg-gray-900" : "bg-blue-50"
      }`}
    >
      {/* Dark Mode Toggle Button (Top Right Corner) */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white hover:text-blue-600 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-400 transition-all duration-300 shadow-lg"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Carousel Container */}
      <div className="relative w-full max-w-4xl mx-4 overflow-hidden rounded-xl shadow-2xl">
        {/* Carousel Images */}
        <div className="relative h-96 md:h-[500px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white hover:text-blue-600 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-400 transition-all duration-300 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white hover:text-blue-600 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-400 transition-all duration-300 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
              } transition-all duration-300`}
              aria-label={`Go to Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

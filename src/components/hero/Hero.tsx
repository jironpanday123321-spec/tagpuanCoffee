import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coffeeBanner from "@/assets/coffee-banner.jpg";
import matchaBanner from "@/assets/matchaBanner.jpg";
import coffeeBanner2 from "@/assets/coffee-banner2.jpg";

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      banner: coffeeBanner,
      bgClass: "bg-[#0d3427]",
      badgeBg: "bg-[#fdf8f5]",
      badgeText: "text-[#0d3427]",
      badgeContent: "✨ Fresh series",
      titlePart1: "THE HAPPY",
      titlePart2: "ICED SERIES",
      title2Class: "text-[#c8a97e]",
      subheadingText: "FEATURING BALER SIGNATURE CREATIONS",
      subheadingClass: "text-[#fdf8f5] opacity-90",
      bodyText: "Beat the heat with our signature iced series. Enjoy a rich Iced Caramel Macchiato, smooth Iced Vanilla Latte, or creamy Iced Hazelnut Latte — each hand-blended with premium espresso, fresh milk, and rich flavors.",
      bodyClass: "text-neutral-200",
      ctaClass: "text-[#c8a97e] hover:text-white",
      rightBg: "bg-[#0a271d]",
      gradientFrom: "#0d3427",
    },
    {
      banner: matchaBanner,
      bgClass: "bg-[#F7F6F3]",
      badgeBg: "bg-[#486f45]",
      badgeText: "text-[#F7F6F3]",
      badgeContent: "🍵 Premium Matcha",
      titlePart1: "ICED MATCHA",
      titlePart2: "LATTE SERIES",
      title2Class: "text-[#486f45]",
      subheadingText: "AUTHENTIC SHIZUOKA CEREMONIAL GRADE",
      subheadingClass: "text-neutral-700 opacity-90",
      bodyText: "Indulge in our exquisite Iced Matcha Latte series. Whisked to perfection with premium stone-ground green tea leaves, naturally sweet, earthy, and combined with cold organic milk over ice.",
      bodyClass: "text-[#444444]",
      ctaClass: "text-[#486f45] hover:text-[#2d472c]",
      rightBg: "bg-white",
      gradientFrom: "#F7F6F3",
    },
    {
      banner: coffeeBanner2,
      bgClass: "bg-[#FFF5F6]",
      badgeBg: "bg-[#e0007e]",
      badgeText: "text-white",
      badgeContent: "🍓 Fruit lattes",
      titlePart1: "NON-COFFEE",
      titlePart2: "LATTE SERIES",
      title2Class: "text-[#e0007e]",
      subheadingText: "FRESH CREAMY FRUIT INFUSIONS",
      subheadingClass: "text-neutral-700 opacity-90",
      bodyText: "Explore our colorful, caffeine-free fruit lattes. Enjoy Strawberry, Blueberry, Mango, Kiwi, or Passion Fruit lattes — crafted with real milk, vibrant fruits, and creamy textures.",
      bodyClass: "text-[#444444]",
      ctaClass: "text-[#e0007e] hover:text-[#b00062]",
      rightBg: "bg-white",
      gradientFrom: "#FFF5F6",
    }
  ];

  const currentSlide = slides[activeSlide];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={`w-full relative overflow-hidden select-none transition-colors duration-700 ${currentSlide.bgClass}`}>
      {/* Full-width hero container */}
      <div className="relative w-full flex flex-col md:flex-row min-h-[440px] sm:min-h-[500px] md:min-h-[540px]">

        {/* ── Left: Text Content ── */}
        <div className={`relative z-10 flex flex-col justify-center gap-4 px-8 sm:px-12 md:px-16 py-14 md:py-20 w-full md:w-[45%] shrink-0 transition-colors duration-700 ${currentSlide.bgClass}`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-3"
            >
              {/* Optional Badge */}
              <span className={`self-start text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm transition-colors duration-700 ${currentSlide.badgeBg} ${currentSlide.badgeText}`}>
                {currentSlide.badgeContent}
              </span>

              {/* Main Headline */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[1.05] tracking-tight transition-colors duration-700 font-['Montserrat',sans-serif] ${activeSlide === 0 ? "text-white" : "text-neutral-900"}`}>
                {currentSlide.titlePart1}
                <br />
                <span className={`transition-colors duration-550 ${currentSlide.title2Class}`}>
                  {currentSlide.titlePart2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-700 ${currentSlide.subheadingClass}`}>
                {currentSlide.subheadingText}
              </p>

              {/* Body Copy */}
              <p className={`text-xs sm:text-sm leading-relaxed max-w-xs transition-colors duration-700 ${currentSlide.bodyClass}`}>
                {currentSlide.bodyText}
              </p>

              {/* CTA */}
              <a
                href="#drinks"
                className={`inline-flex items-center gap-2 mt-3 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-500 group ${currentSlide.ctaClass}`}
              >
                <span>Order Yours Now</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>

          {/* ── Slide Navigation Buttons ── */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              className={`p-2 rounded-full border transition-all duration-300 ${
                activeSlide === 0
                  ? "border-white/20 text-white hover:bg-white/10"
                  : activeSlide === 1
                    ? "border-[#486f45]/20 text-[#486f45] hover:bg-[#486f45]/10"
                    : "border-[#e0007e]/20 text-[#e0007e] hover:bg-[#e0007e]/10"
              }`}
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2 mx-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? activeSlide === 0
                        ? "w-6 bg-[#c8a97e]"
                        : activeSlide === 1
                          ? "w-6 bg-[#486f45]"
                          : "w-6 bg-[#e0007e]"
                      : activeSlide === 0
                        ? "w-2 bg-white/30"
                        : activeSlide === 1
                          ? "w-2 bg-[#486f45]/30"
                          : "w-2 bg-[#e0007e]/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className={`p-2 rounded-full border transition-all duration-300 ${
                activeSlide === 0
                  ? "border-white/20 text-white hover:bg-white/10"
                  : activeSlide === 1
                    ? "border-[#486f45]/20 text-[#486f45] hover:bg-[#486f45]/10"
                    : "border-[#e0007e]/20 text-[#e0007e] hover:bg-[#e0007e]/10"
              }`}
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* ── Right: Media Display (Dynamic Banner Image) ── */}
        <div className={`relative flex-1 min-h-[290px] md:min-h-0 overflow-hidden transition-colors duration-700 ${currentSlide.rightBg}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.banner}
                alt={`${currentSlide.titlePart1} ${currentSlide.titlePart2} Banner`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dynamic left fade gradient overlay to blend seamlessly with left panel theme */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `linear-gradient(to right, ${currentSlide.gradientFrom} 0%, ${currentSlide.gradientFrom}33 30%, transparent 100%)`
            }}
          />
        </div>

      </div>
    </section>
  );
}



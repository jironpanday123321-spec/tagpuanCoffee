import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sizzlingImg from "@/assets/sizzling-plate.webp";

interface FoodItem {
  id: number;
  name: string;
  tag: string;
  description: string;
  price: string;
}

const foodsData: FoodItem[] = [
  {
    id: 1,
    name: "Classic Tapsilog",
    tag: "Signature",
    description: "Premium marinated beef tapa served with garlic rice & fried egg",
    price: "₱169",
  },
  {
    id: 2,
    name: "Sizzling Pork Sisig",
    tag: "Local Favorite",
    description: "Savory minced pork with red onions & spices on a hot iron plate",
    price: "₱229",
  },
  {
    id: 3,
    name: "Pork Sinigang in Hotpot",
    tag: "Best Seller",
    description: "Tamarind-soured pork ribs soup with kangkong, radish & green chili",
    price: "₱390",
  },
  {
    id: 4,
    name: "Classic Carbonara",
    tag: "Cooked to Order",
    description: "Rich and creamy pasta with crispy bacon, parmesan & garlic toast",
    price: "₱269",
  },
  {
    id: 5,
    name: "Crispy Pata",
    tag: "Specialty",
    description: "Deep fried pork leg with crunchy exterior & tender inside",
    price: "₱799",
  }
];

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  const [count, setCount] = useState(getCount);
  useEffect(() => {
    const handler = () => setCount(getCount());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return count;
}

function FoodCard({ food }: { food: FoodItem }) {
  return (
    <div className="group relative flex flex-col items-center justify-end pt-28 cursor-pointer transition-transform duration-300 hover:-translate-y-2 w-full">
      {/* Floating food image above card */}
      <div className="absolute -top-[5px] sm:-top-[25px] z-20 w-[215px] sm:w-[260px] h-[215px] sm:h-[260px] flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-105">
        <img
          src={sizzlingImg}
          alt={food.name}
          className="w-full h-full object-contain drop-shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Card body */}
      <div className="w-full h-[260px] sm:h-[280px] bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-end pb-6 pt-36 sm:pt-40 px-4 text-center shadow-sm border border-neutral-200/80 transition-all duration-300 group-hover:shadow-xl group-hover:border-amber-300 group-hover:bg-amber-50/40 relative z-10">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full mb-2">
          {food.tag}
        </span>
        <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] font-['Montserrat',sans-serif] tracking-tight group-hover:text-amber-900 transition-colors leading-tight mb-1">
          {food.name}
        </h3>
        <p className="text-xs text-neutral-600 leading-snug px-1 font-medium z-20">
          {food.description}
        </p>
        <span className="mt-2 text-sm font-extrabold text-[#0d3427]">
          {food.price}
        </span>
      </div>
    </div>
  );
}

export function FeaturedFoods() {
  const visibleCount = useVisibleCount();
  const total = foodsData.length;
  const maxIndex = total - visibleCount;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((prev) => Math.max(0, Math.min(prev + dir, maxIndex)));
    },
    [maxIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  // Clamp index when viewport resizes and maxIndex shrinks
  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const dotCount = maxIndex + 1;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      id="featured-foods"
      className="w-full bg-white pb-14 sm:pb-20 md:pb-28 px-4 sm:px-6 overflow-hidden select-none"
      aria-label="Featured Foods Showcase"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] leading-tight font-['Montserrat',sans-serif]">
            Featured Foods
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto mt-2 font-medium">
            Explore our signature food specialties.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full">
          {/* Slides */}
          <div className="overflow-hidden pt-4 pb-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: "easeInOut" }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
                }}
              >
                {foodsData.slice(index, index + visibleCount).map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev button */}
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous foods"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-30 w-10 h-10 rounded-full bg-white border border-[#c8a97e]/30 shadow-md flex items-center justify-center text-[#0d3427] hover:bg-[#0d3427] hover:text-white hover:border-[#0d3427] transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={() => go(1)}
            disabled={index >= maxIndex}
            aria-label="Next foods"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-30 w-10 h-10 rounded-full bg-white border border-[#c8a97e]/30 shadow-md flex items-center justify-center text-[#0d3427] hover:bg-[#0d3427] hover:text-white hover:border-[#0d3427] transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === index
                  ? "w-6 bg-[#0d3427]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

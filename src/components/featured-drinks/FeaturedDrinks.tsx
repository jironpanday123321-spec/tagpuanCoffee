import { motion } from "framer-motion";
import drinkImg from "@/assets/drinkonly-removebg-preview.png";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

interface DrinkItem {
  id: number;
  name: string;
  tag: string;
  description: string;
  price: string;
}

const drinksData: DrinkItem[] = [
  {
    id: 1,
    name: "Caramel Macchiato",
    tag: "Signature",
    description: "Rich espresso layered with vanilla & caramel drizzle",
    price: "₱140",
  },
  {
    id: 2,
    name: "Iced Spanish Latte",
    tag: "Best Seller",
    description: "Espresso with sweet condensed milk & fresh milk",
    price: "₱145",
  },
  {
    id: 3,
    name: "Matcha Frappe",
    tag: "Popular",
    description: "Premium Japanese matcha blended to creamy perfection",
    price: "₱155",
  },
  {
    id: 4,
    name: "Dark Mocha",
    tag: "House Blend",
    description: "Espresso combined with rich dark chocolate cocoa",
    price: "₱150",
  },
  {
    id: 5,
    name: "Salted Caramel",
    tag: "Specialty",
    description: "Savory salted caramel espresso over cold ice",
    price: "₱150",
  },
  {
    id: 6,
    name: "Hazelnut Cold Brew",
    tag: "Slow Steeped",
    description: "12-hour cold brew infused with roasted hazelnut",
    price: "₱135",
  },
  {
    id: 7,
    name: "Vanilla Cold Foam",
    tag: "Classic",
    description: "Smooth cold brew topped with sweet vanilla foam",
    price: "₱140",
  },
  {
    id: 8,
    name: "Sea Salt Latte",
    tag: "Trending",
    description: "Espresso topped with creamy sea salt froth",
    price: "₱150",
  },
];

export function FeaturedDrinks() {
  return (
    <section
      id="drinks"
      className="w-full bg-white py-14 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden select-none"
      aria-label="Featured Drinks Showcase"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A1A] leading-tight font-['Montserrat',sans-serif]">
            Featured Drinks
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto mt-2 font-medium">
            Explore our signature coffee creations.
          </p>
        </motion.div>

        {/* Infinite Scroll Container with Edge Fading */}
        <div className="relative w-full max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)] py-4">
          <InfiniteSlider
            duration={50}
            durationOnHover={150}
            gap={24}
            className="py-4"
          >
            {drinksData.map((drink) => (
              <div
                key={drink.id}
                className="group relative flex flex-col items-center justify-end w-[250px] sm:w-[280px] md:w-[300px] pt-24 sm:pt-28 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Floating Drink Image (Elevated above card text) */}
                <div className="absolute -top-4 sm:-top-6 z-20 w-[150px] sm:w-[175px] md:w-[190px] h-[170px] sm:h-[195px] md:h-[210px] flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={drinkImg}
                    alt={drink.name}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                    draggable={false}
                  />
                </div>

                {/* Pedestal Card with zero text overlap */}
                <div className="w-full h-[190px] sm:h-[210px] bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-end pb-6 pt-24 sm:pt-28 px-4 text-center shadow-sm border border-neutral-200/80 transition-all duration-300 group-hover:shadow-xl group-hover:border-amber-300 group-hover:bg-amber-50/40 relative z-10">
                  {/* Category Tag */}
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full mb-1.5">
                    {drink.tag}
                  </span>

                  {/* Clean Drink Title & Description */}
                  <h3 className="text-base sm:text-lg font-black text-[#1A1A1A] font-['Montserrat',sans-serif] tracking-tight group-hover:text-amber-900 transition-colors leading-tight mb-1">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 font-medium leading-snug px-1">
                    {drink.description}
                  </p>
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}



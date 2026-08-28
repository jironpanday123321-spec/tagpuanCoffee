import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  price: string; // e.g. "₱119 / ₱169" or "₱150"
  description?: string;
  badge?: string;
}

interface MenuCategory {
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

const FOOD_MENU: MenuCategory[] = [
  {
    title: "Silog Choices",
    subtitle: "Served with Garlic Rice & Fried Egg",
    items: [
      { name: "Tapsilog", price: "₱119 (Sm) / ₱169 (Big)", badge: "Signature" },
      { name: "Liemposilog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Tocilog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Bumosilog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Corned Beef Silog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Tuyosilog", price: "₱89 (Sm) / ₱129 (Big)", badge: "Budget" },
      { name: "Baconsilog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Hotdog Silog", price: "₱99 (Sm) / ₱139 (Big)" },
      { name: "Porksilog", price: "₱119 (Sm) / ₱169 (Big)" },
      { name: "Chicken Silog", price: "₱119 (Sm) / ₱169 (Big)" },
    ],
  },
  {
    title: "Regular Dish",
    subtitle: "Perfect for sharing",
    items: [
      { name: "Pork Sinigang in Hotpot", price: "₱390", badge: "Best Seller" },
      { name: "Vegetable Kare-Kare", price: "₱189" },
      { name: "Ampalaya with Egg", price: "₱159" },
      { name: "Grilled Liempo", price: "₱179" },
      { name: "Sweet & Sour Fish Fillet", price: "₱259" },
      { name: "Garlic Chicken Whole", price: "₱709", description: "20 mins waiting" },
      { name: "Garlic Chicken Half", price: "₱379", description: "20 mins waiting" },
      { name: "Crispy Pata", price: "₱799", description: "30 mins waiting", badge: "Chef's Special" },
    ],
  },
  {
    title: "Appetizers",
    subtitle: "Sizzling & quick bites",
    items: [
      { name: "Sizzling Pork Sisig", price: "₱229", badge: "Local Favorite" },
      { name: "Sizzling Hotdog", price: "₱189" },
      { name: "Sizzling Mushroom", price: "₱189" },
      { name: "Sinugba na Bangus", price: "₱219" },
      { name: "Pork Shoimai (15pcs)", price: "₱199" },
      { name: "Chicken Shoimai (15pcs)", price: "₱199" },
      { name: "Beef Shoimai (15pcs)", price: "₱199" },
      { name: "Lumpiang Shanghai", price: "₱179" },
      { name: "French Fries", price: "₱159" },
      { name: "Garlic Butter Peanuts", price: "₱69" },
      { name: "Kropek", price: "₱119" },
    ],
  },
  {
    title: "Pasta",
    subtitle: "Freshly cooked noodles",
    items: [
      { name: "Classic Bolognese", price: "₱269" },
      { name: "Classic Carbonara", price: "₱269", badge: "Creamy" },
      { name: "Chicken Pesto Pasta", price: "₱279" },
    ],
  },
];

const DRINKS_MENU: MenuCategory[] = [
  {
    title: "Espresso Coffee",
    subtitle: "Hot / Iced Options Available",
    items: [
      { name: "Americano", price: "₱100 / ₱110" },
      { name: "Latte", price: "₱120 / ₱130" },
      { name: "Cappuccino", price: "₱120 / ₱130" },
      { name: "Bone Dry Cappuccino", price: "₱120 (Hot)" },
      { name: "Vienna Coffee", price: "₱135 / ₱145" },
      { name: "Spanish Latte", price: "₱145 / ₱155", badge: "Best Seller" },
      { name: "Caramel Macchiato", price: "₱145 / ₱155" },
      { name: "Vanilla Latte", price: "₱140 / ₱150" },
      { name: "Hazelnut Latte", price: "₱140 / ₱150" },
      { name: "White Mocha Latte", price: "₱150 / ₱160" },
      { name: "Taro Iced Latte", price: "₱150 (Iced)" },
      { name: "Peanut Butter Latte", price: "₱150 / ₱160" },
      { name: "Biscoff Latte", price: "₱150 / ₱160", badge: "Trending" },
      { name: "Chocnut Latte", price: "₱150 / ₱160", description: "Filipino twist espresso" },
    ],
  },
  {
    title: "Matcha Series",
    subtitle: "Premium Japanese Green Tea",
    items: [
      { name: "Matcha Latte", price: "₱130" },
      { name: "Dirty Matcha", price: "₱150", badge: "Espresso Shot" },
      { name: "Strawberry Matcha", price: "₱150", badge: "Popular" },
      { name: "Blueberry Matcha", price: "₱150" },
      { name: "Kiwi Matcha", price: "₱150" },
      { name: "Mango Matcha", price: "₱150" },
      { name: "Passion Fruit Matcha", price: "₱150" },
    ],
  },
  {
    title: "Refreshers",
    subtitle: "Ice Cold Beverages",
    items: [
      { name: "Freshly Brewed Iced Tea", price: "₱70" },
      { name: "Freshly Brewed Lemongrass Iced Tea", price: "₱60" },
      { name: "Freshly Squeezed Lemonade", price: "₱130", badge: "Fresh" },
      { name: "Freshly Squeezed Calamansi Juice", price: "₱109" },
      { name: "Pure Mango Juice / Shake", price: "₱150" },
      { name: "Pure Watermelon Juice / Shake", price: "₱150" },
    ],
  },
  {
    title: "Non-Coffee Lattes",
    subtitle: "Creamy iced milk blends",
    items: [
      { name: "Strawberry Latte", price: "₱129" },
      { name: "Blueberry Latte", price: "₱129" },
      { name: "Kiwi Latte", price: "₱129" },
      { name: "Mango Latte", price: "₱129" },
      { name: "Passion Fruit Latte", price: "₱129" },
    ],
  },
  {
    title: "Milkshake",
    subtitle: "Thick & creamy shakes topped with whipped cream",
    items: [
      { name: "Vanilla Milkshake", price: "₱120" },
      { name: "Chocolate Milkshake", price: "₱120" },
      { name: "Strawberry Milkshake", price: "₱120" },
    ],
  },
  {
    title: "Frappes",
    subtitle: "Ice blended creams & coffee",
    items: [
      { name: "Cookies & Cream Frappe", price: "₱160" },
      { name: "Triple Chocolate Frappe", price: "₱160" },
      { name: "Matcha Frappe", price: "₱160", badge: "Top Green" },
      { name: "Caramel Macchiato Frappe", price: "₱160" },
      { name: "Coffee Jelly Frappe", price: "₱160" },
      { name: "Peanut Butter Frappe", price: "₱160" },
      { name: "White Mocha Frappe", price: "₱160" },
      { name: "Strawberry Coffee Frappe", price: "₱160" },
      { name: "Orange Julius", price: "₱160", badge: "Citrus Blend" },
    ],
  },
  {
    title: "Hot Teas",
    subtitle: "Per cup",
    items: [
      { name: "Chamomile", price: "₱90" },
      { name: "English Breakfast", price: "₱90" },
      { name: "Green Tea", price: "₱90" },
      { name: "Peppermint", price: "₱90" },
      { name: "Lemon & Ginger", price: "₱90" },
      { name: "Earl Grey", price: "₱90" },
    ],
  },
];

interface MenuPageProps {
  initialTab?: "food" | "drinks";
}

export function MenuPage({ initialTab = "food" }: MenuPageProps) {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategories = useMemo(() => {
    return activeTab === "food" ? FOOD_MENU : DRINKS_MENU;
  }, [activeTab]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return currentCategories;
    const query = searchQuery.toLowerCase().trim();

    return currentCategories
      .map((cat) => {
        const filteredItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        );
        return { ...cat, items: filteredItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [currentCategories, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2B2320] py-10 px-4 sm:px-6 relative overflow-hidden select-none font-sans">
      {/* Luxury textured linen backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(200,169,126,0.15) 0%, rgba(0,0,0,0) 80%),
                            repeating-linear-gradient(0deg, rgba(13,52,39,0.05) 0px, rgba(13,52,39,0.05) 1px, transparent 1px, transparent 8px),
                            repeating-linear-gradient(90deg, rgba(13,52,39,0.05) 0px, rgba(13,52,39,0.05) 1px, transparent 1px, transparent 8px)`
        }}
      />

      <div className="max-w-[1200px] mx-auto z-10 relative">
        {/* Back and title bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-dashed border-[#c8a97e]/35 pb-8 mb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-[#0d3427] font-['Montserrat',sans-serif]">
              Tagpuan Menu
            </h1>
            <p className="text-xs sm:text-sm text-[#c8a97e] mt-1.5 uppercase tracking-widest font-mono font-bold">
              ★ Handcrafted Fresh Daily in Baler ★
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#c8a97e] bg-white text-[#0d3427] text-xs sm:text-sm font-bold uppercase hover:bg-[#0d3427] hover:text-white hover:border-[#0d3427] transition-all shadow-[0_4px_12px_rgba(200,169,126,0.1)]"
          >
            ← Back to Home
          </a>
        </div>

        {/* Search Bar & Tab Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Tab switches */}
          <div className="flex p-1.5 bg-[#F4EFE6] rounded-full border border-[#c8a97e]/30 w-full sm:w-[320px] shadow-sm">
            <button
              onClick={() => { setActiveTab("food"); setSearchQuery(""); }}
              className={`flex-1 text-center py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase transition-all duration-300 ${
                activeTab === "food"
                  ? "bg-[#0d3427] text-white shadow-md"
                  : "text-[#0d3427]/70 hover:text-[#0d3427]"
              }`}
            >
              🍽️ Food Menu
            </button>
            <button
              onClick={() => { setActiveTab("drinks"); setSearchQuery(""); }}
              className={`flex-1 text-center py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase transition-all duration-300 ${
                activeTab === "drinks"
                  ? "bg-[#0d3427] text-white shadow-md"
                  : "text-[#0d3427]/70 hover:text-[#0d3427]"
              }`}
            >
              ☕ Drinks Menu
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-[400px]">
            <input
              type="text"
              placeholder="Search dishes or brews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#c8a97e]/45 rounded-full py-3 px-6 pl-12 text-sm text-[#0d3427] placeholder-stone-400 focus:outline-none focus:border-[#0d3427] transition-colors shadow-sm"
            />
            <svg 
              className="w-4 h-4 text-[#0d3427]/70 absolute left-4 top-1/2 -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Menu Chalk Board Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "_" + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div 
                  key={category.title}
                  className="bg-white border border-[#c8a97e]/35 rounded-3xl p-6 sm:p-8 relative shadow-[0_15px_45px_rgba(200,169,126,0.06)] hover:shadow-[0_20px_50px_rgba(200,169,126,0.12)] hover:border-[#c8a97e]/60 transition-all duration-355"
                >
                  {/* Subtle inner gold frame border */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-[#c8a97e]/15 rounded-2xl pointer-events-none border-dashed" />
                  
                  {/* Category Title Header */}
                  <div className="text-center mb-6 relative">
                    <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.25em] text-[#c8a97e] block mb-1 font-mono">
                      {category.subtitle || "Authentic Recipe"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0d3427] font-['Montserrat',sans-serif] tracking-tight relative inline-block">
                      {category.title}
                      {/* Gold line underline */}
                      <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-dashed bg-gradient-to-r from-transparent via-[#c8a97e]/40 to-transparent" />
                    </h2>
                  </div>

                  {/* Category Items List */}
                  <div className="flex flex-col gap-5 relative z-10 pt-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex flex-col">
                        <div className="flex items-baseline justify-between gap-4">
                          {/* Name + Badge */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-bold text-[#2B2320] uppercase font-mono tracking-tight">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[8px] sm:text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#0d3427]/10 text-[#0d3427] border border-[#0d3427]/20 tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Dotted Leader Line */}
                          <div className="flex-1 border-b border-dashed border-[#c8a97e]/20 mx-2" />

                          {/* Price */}
                          <span className="text-sm sm:text-base font-black text-[#c8a97e] font-mono whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>

                        {/* Extra Details / Notes */}
                        {item.description && (
                          <span className="text-[10px] sm:text-xs text-stone-500 font-medium italic mt-0.5 block">
                            * {item.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-[#c8a97e]/35 rounded-3xl bg-white shadow-sm">
                <span className="text-3xl">☕</span>
                <h3 className="text-lg font-bold text-[#0d3427] mt-2">No matching items found</h3>
                <p className="text-sm text-stone-500 mt-1">Try searching for another drink, brew, or Silog option.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer info */}
        <div className="mt-16 text-center border-t border-dashed border-[#c8a97e]/30 pt-8 text-[#2B2320]/50 text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Tagpuan Coffee, Baler. Prices subject to change without notice.</p>
        </div>
      </div>
    </div>
  );
}

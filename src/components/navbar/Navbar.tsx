import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/El dorado_20251103_111141_0000.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#0d3427]/95 backdrop-blur-md w-full border-b border-[#c8a97e]/15"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Logo Badge */}
          <a href="#" className="flex items-center gap-2 group">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              src={logoImg}
              alt="TAPUAN Logo"
              className="h-12 sm:h-14 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {/* Center-left Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-200">
            <a href="#menu" className="hover:text-[#c8a97e] transition-colors">
              Menu
            </a>
            <a href="#drinks" className="hover:text-[#c8a97e] transition-colors">
              drinks
            </a>
            <a href="#location" className="hover:text-[#c8a97e] transition-colors">
              location
            </a>
          </nav>
        </div>

        {/* Right Contact Us Link & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-block text-sm font-medium text-stone-200 hover:text-[#c8a97e] transition-colors"
          >
            Contact Us
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-200 hover:bg-[#0a271d] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#0d3427] border-b border-[#c8a97e]/15 px-6 py-4 flex flex-col gap-4 shadow-lg md:hidden z-50"
          >
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-stone-200 hover:text-[#c8a97e] transition-colors"
            >
              Menu
            </a>
            <a
              href="#drinks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-stone-200 hover:text-[#c8a97e] transition-colors"
            >
              drinks
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-stone-200 hover:text-[#c8a97e] transition-colors"
            >
              location
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#c8a97e] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;

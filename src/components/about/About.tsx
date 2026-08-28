import { motion } from "framer-motion";
import staffImg from "@/assets/tagpuan-staff.jpg";
import coffeeSolo1 from "@/assets/coffee-solo1.png";
import coffeeSolo2 from "@/assets/coffee-solo2.png";

export function About() {
  return (
    <section className="relative w-full bg-white">
      {/* Floating Coffee Cup 1 Overlapping Featured Drinks -> About */}
      <div className="absolute top-[-90px] sm:top-[-140px] md:top-[-180px] left-[2%] sm:left-[4%] md:left-[6%] w-[180px] sm:w-[285px] md:w-[350px] z-20 pointer-events-none">
        <motion.img
          src={coffeeSolo1}
          alt="Floating Caramel Macchiato"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(3px 0px 0px #cf1414ff) drop-shadow(-3px 0px 0px #cf1414ff) drop-shadow(0px 3px 0px #cf1414ff) drop-shadow(0px -3px 0px #cf1414ff) drop-shadow(2px 2px 0px #cf1414ff) drop-shadow(-2px -2px 0px #cf1414ff) drop-shadow(2px -2px 0px #cf1414ff) drop-shadow(-2px 2px 0px #cf1414ff) drop-shadow(0px 8px 16px rgba(0,0,0,0.3))"
          }}
        />
      </div>

      {/* ── Wavy Top Edge (white bg above → brown section) ── */}
      <div className="w-full leading-[0] -mb-px">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#2B2320"
          />
        </svg>
      </div>

      {/* ── Main Content Area ── */}
      <div className="w-full bg-[#2B2320] relative">
        {/* Subtle wavy texture lines as background decoration */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d={`M0,${40 + i * 55} C360,${10 + i * 55} 720,${70 + i * 55} 1080,${25 + i * 55} S1440,${50 + i * 55} 1440,${40 + i * 55}`}
              fill="none"
              stroke="#c8a97e"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center px-4 sm:px-6 py-14 sm:py-20 md:py-24 text-white">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0 text-center md:text-left"
          >
            {/* Decorative label */}
            <span className="text-[#c8a97e] text-xs font-bold uppercase tracking-[0.2em]">
              Our Story
            </span>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-white font-['Montserrat',sans-serif]">
              About Us
            </h2>

            <p className="text-[11px] sm:text-xs md:text-sm text-[#D8CFC7] leading-relaxed font-normal tracking-wide">
              Tagpuan Coffee started as a humble corner where friends gathered,
              conversations flowed, and every cup told a tale. We craft each
              brew with care — from sourcing quality beans to perfecting every
              pour — because we believe coffee is more than a drink. It's a
              moment, a memory, a place to belong.
            </p>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#D8CFC7] leading-relaxed font-normal tracking-wide">
              Our team is passionate about creating a warm, welcoming space
              where every guest feels at home. Whether you're starting your
              morning or ending your day, Tagpuan is your place.
            </p>

            <a
              href="#location"
              className="inline-flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-widest text-[#c8a97e] hover:text-white transition-colors group w-fit mx-auto md:mx-0"
            >
              <span>Find Us</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Right Column: Staff Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full h-[220px] sm:h-[300px] md:h-[380px] rounded-xl overflow-hidden shadow-lg border border-[#c8a97e]/20 group"
          >
            <motion.img
              src={staffImg}
              alt="TAPUAN Staff Team"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Coffee Cup 2 Overlapping About -> Location */}
      <div className="absolute bottom-[-75px] sm:bottom-[-125px] md:bottom-[-165px] right-[2%] sm:right-[4%] md:right-[6%] w-[170px] sm:w-[270px] md:w-[350px] z-20 pointer-events-none">
        <motion.img
          src={coffeeSolo2}
          alt="Floating Hazelnut Latte"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.3 }}
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(3px 0px 0px #cf1414ff) drop-shadow(-3px 0px 0px #cf1414ff) drop-shadow(0px 3px 0px #cf1414ff) drop-shadow(0px -3px 0px #cf1414ff) drop-shadow(2px 2px 0px #cf1414ff) drop-shadow(-2px -2px 0px #cf1414ff) drop-shadow(2px -2px 0px #cf1414ff) drop-shadow(-2px 2px 0px #cf1414ff) drop-shadow(0px 8px 16px rgba(0,0,0,0.3))"
          }}
        />
      </div>

      {/* ── Wavy Bottom Edge (brown section → white bg below) ── */}
      <div className="w-full leading-[0] bg-[#2B2320] -mt-px">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}


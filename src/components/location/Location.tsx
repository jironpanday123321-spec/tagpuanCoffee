import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Coordinates for Buton Street, Brgy Sabang, Baler, Aurora, Philippines
const POSITION: [number, number] = [15.7594, 121.5658];

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapRef.current, {
      center: POSITION,
      zoom: 16,
      scrollWheelZoom: false,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom Icon — loaded locally from the leaflet npm package (no CDN)
    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add Marker with Popup
    L.marker(POSITION, { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family: Montserrat, sans-serif; text-align: center; padding: 4px;">
          <strong style="font-size: 14px; color: #1A1A1A;">TAPUAN Coffee Shop</strong><br/>
          <span style="font-size: 12px; color: #555;">Buton Street, Brgy Sabang,<br/>Baler, Aurora, Philippines</span>
        </div>`
      )
      .openPopup();

    leafletInstance.current = map;

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="location" className="relative w-full bg-white overflow-hidden">
      {/* Scroll anchor for Contact Us link */}
      <div id="contact" className="absolute top-[20%] scroll-mt-24 pointer-events-none" />
      {/* ── Wavy Top Edge (white → brown) ── */}
      <div className="w-full leading-[0] -mb-px">
        <style>{`
          @keyframes locationWaveTop {
            0%, 100% {
              d: path("M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,80 L0,80 Z");
            }
            50% {
              d: path("M0,25 C240,35 480,45 720,25 C960,45 1200,40 1440,20 L1440,80 L0,80 Z");
            }
          }
          .animate-location-wave-top {
            animation: locationWaveTop 15s ease-in-out infinite;
          }
        `}</style>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            className="animate-location-wave-top"
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,80 L0,80 Z"
            fill="#2B2320"
          />
        </svg>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative w-full bg-[#2B2320] text-white">
        {/* Wavy line texture - slowly drifting */}
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          animate={{
            y: [6, -6, 6],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
        </motion.svg>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col gap-10 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 text-center md:text-left"
          >
            <span className="text-[#c8a97e] text-xs font-bold uppercase tracking-[0.2em]">
              Come Visit
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-white font-['Montserrat',sans-serif]">
              Location &amp; Hours
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CFC7] font-normal tracking-wide">
              Visit us at Buton Street, Brgy Sabang, Baler, Aurora, Philippines
            </p>
          </motion.div>

          {/* Grid: Details & Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Address & Hours Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#1F1917] p-6 sm:p-8 rounded-xl border border-[#c8a97e]/20 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xs sm:text-sm uppercase font-bold text-[#c8a97e] tracking-wider mb-2">
                    Address
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-white leading-snug">
                    Buton Street, Brgy Sabang,<br />
                    Baler, Aurora, Philippines
                  </p>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm uppercase font-bold text-[#c8a97e] tracking-wider mb-2">
                    Opening Hours
                  </h3>
                  <p className="text-sm font-medium text-white">
                    Monday – Sunday<br />
                    <span className="text-[#D8CFC7]">7:00 AM – 10:00 PM</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm uppercase font-bold text-[#c8a97e] tracking-wider mb-2">
                    Contact Us
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a 
                      href="mailto:tagpuansabalercafe@gmail.com"
                      className="flex items-center gap-3 group text-[#D8CFC7] hover:text-[#c8a97e] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#2B2320] border border-[#c8a97e]/20 flex items-center justify-center group-hover:border-[#c8a97e] group-hover:bg-[#c8a97e]/10 transition-colors">
                        <svg className="w-4 h-4 text-[#c8a97e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold text-stone-500 font-mono tracking-wider">Email</span>
                        <span className="text-xs font-semibold truncate max-w-[210px] sm:max-w-none">tagpuansabalercafe@gmail.com</span>
                      </div>
                    </a>

                    <a 
                      href="https://web.facebook.com/profile.php?id=61593818487910&sk=directory_contact_info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group text-[#D8CFC7] hover:text-[#c8a97e] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#2B2320] border border-[#c8a97e]/20 flex items-center justify-center group-hover:border-[#c8a97e] group-hover:bg-[#c8a97e]/10 transition-colors">
                        <svg className="w-4 h-4 text-[#c8a97e]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-stone-500 font-mono tracking-wider">Messenger</span>
                        <span className="text-xs font-semibold">Tagpuan sa Baler Cafe</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Buton+Street,+Brgy+Sabang,+Baler,+Aurora,+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 rounded-lg bg-[#c8a97e] text-[#1A1A1A] font-semibold text-sm hover:bg-white transition-colors"
              >
                Open in Google Maps
              </a>
            </motion.div>

            {/* Leaflet JS Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 w-full h-[320px] sm:h-[380px] md:h-full min-h-[320px] rounded-xl overflow-hidden shadow-lg border border-[#c8a97e]/20 z-10"
            >
              <div ref={mapRef} className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Wavy Bottom Edge (brown → white) ── */}
      <div className="w-full leading-[0] bg-[#2B2320] -mt-px">
        <style>{`
          @keyframes locationWaveBottom {
            0%, 100% {
              d: path("M0,30 C240,80 480,0 720,45 C960,80 1200,10 1440,40 L1440,80 L0,80 Z");
            }
            50% {
              d: path("M0,15 C240,55 480,25 720,20 C960,55 1200,30 1440,20 L1440,80 L0,80 Z");
            }
          }
          .animate-location-wave-bottom {
            animation: locationWaveBottom 13s ease-in-out infinite;
          }
        `}</style>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            className="animate-location-wave-bottom"
            d="M0,30 C240,80 480,0 720,45 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}


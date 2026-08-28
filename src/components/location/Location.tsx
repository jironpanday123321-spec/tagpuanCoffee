import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import L from "leaflet";

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

    // Custom Icon for Leaflet
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
      {/* ── Wavy Top Edge (white → brown) ── */}
      <div className="w-full leading-[0] -mb-px">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,80 L0,80 Z"
            fill="#2B2320"
          />
        </svg>
      </div>

      {/* ── Main Content Area ── */}
      <div className="relative w-full bg-[#2B2320] text-white">
        {/* Wavy line texture */}
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
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            d="M0,30 C240,80 480,0 720,45 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}


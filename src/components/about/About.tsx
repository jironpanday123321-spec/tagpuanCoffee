import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import staffImg from "@/assets/tagpuan-staff.webp";

// Brand colors for the scattering boxes
const COLORS = [
  "#c8a97e", // Gold
  "#0d3427", // Forest Green
  "#fdf8f5", // Cream
  "#ffffff", // White
  "#b39266", // Darker Gold
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  shape: "rect";
}

function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Match canvas size to its display size
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;

  // Inset mapping corresponding to the absolute offset of the canvas (-top-16 = -64px)
  const offsetX = Math.min(64, width / 4);
  const offsetY = Math.min(64, height / 4);
  
  const innerWidth = width - 2 * offsetX;
  const innerHeight = height - 2 * offsetY;
  const totalPerimeter = 2 * (innerWidth + innerHeight);
  
  const COUNT = 130; // High count for rich scatter effect

  const particles: Particle[] = Array.from({ length: COUNT }, () => {
    // Distribute particles with a soft scatter jitter along the perimeter to prevent a rigid "box outline"
    const d = Math.random() * totalPerimeter;
    const jitterX = (Math.random() - 0.5) * 35;
    const jitterY = (Math.random() - 0.5) * 35;
    let x = 0;
    let y = 0;
    let angle = 0;

    if (d < innerWidth) {
      // Top border
      x = offsetX + d + jitterX;
      y = offsetY + jitterY;
      angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.3;
    } else if (d < innerWidth + innerHeight) {
      // Right border
      x = width - offsetX + jitterX;
      y = offsetY + (d - innerWidth) + jitterY;
      angle = 0 + (Math.random() - 0.5) * 1.3;
    } else if (d < 2 * innerWidth + innerHeight) {
      // Bottom border
      x = offsetX + (d - (innerWidth + innerHeight)) + jitterX;
      y = height - offsetY + jitterY;
      angle = Math.PI / 2 + (Math.random() - 0.5) * 1.3;
    } else {
      // Left border
      x = offsetX + jitterX;
      y = offsetY + (d - (2 * innerWidth + innerHeight)) + jitterY;
      angle = Math.PI + (Math.random() - 0.5) * 1.3;
    }

    const speed = 3.5 + Math.random() * 8.5;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10, // Pixels/boxes size
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      alpha: 1.0,
      shape: "rect" as const,
    };
  });

  let rafId: number;

  function draw() {
    ctx!.clearRect(0, 0, width, height);
    let alive = false;

    for (const p of particles) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.20;          // gravity
      p.vx *= 0.98;          // air resistance
      p.rotation += p.rotSpeed;
      p.alpha  -= 0.015;     // alpha fade

      if (p.alpha <= 0) continue;
      alive = true;

      ctx!.save();
      ctx!.globalAlpha = p.alpha;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.fillStyle = p.color;

      // Draw as a rotating filled square/box
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      
      ctx!.restore();
    }

    if (alive) {
      rafId = requestAnimationFrame(draw);
    } else {
      ctx!.clearRect(0, 0, width, height);
    }
  }

  cancelAnimationFrame(rafId!);
  draw();

  return () => cancelAnimationFrame(rafId);
}

export function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  const handleMouseEnter = useCallback(() => {
    if (canvasRef.current) {
      cleanupRef.current?.();
      cleanupRef.current = launchConfetti(canvasRef.current) ?? undefined;
    }
  }, []);

  return (
    <section className="relative w-full bg-white">

      {/* ── Wavy Top Edge (white bg above → brown section) ── */}
      <div className="w-full relative leading-[0] -mb-px">
        <style>{`
          @keyframes aboutWaveTop {
            0%, 100% {
              d: path("M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z");
            }
            50% {
              d: path("M0,15 C240,45 480,45 720,15 C960,65 1200,15 1440,15 L1440,80 L0,80 Z");
            }
          }
          .animate-about-wave-top {
            animation: aboutWaveTop 12s ease-in-out infinite;
          }
        `}</style>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            className="animate-about-wave-top"
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#2B2320"
          />
        </svg>

        {/* Mini surfer riding the moving wave */}
        <motion.div
          className="absolute left-[15%] sm:left-[22%] z-20 pointer-events-none"
          initial={{ y: 20, rotate: -5 }}
          animate={{
            y: [12, 28, 6, 12],        // Follows the height rhythm/peaks of the wave
            x: [0, 8, -4, 0],           // Slight horizontal drift
            rotate: [-6, 3, -10, -6],   // Bending tilt to simulate balancing of board
          }}
          transition={{
            duration: 12,               // Match the duration of the top wave morphing (12 seconds)
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md text-[#c8a97e] fill-current"
          >
            <g transform="translate(4, 4)">
              {/* Surfboard */}
              <path
                d="M4 48 C16 48, 38 43, 54 36 C55.5 35.3, 56 37, 54.5 38 C38 46, 16 51, 4 51 C3 51, 3 48, 4 48 Z"
              />
              {/* Surfer standing on board */}
              <path
                d="M 24,46 C 23,43 21,39 20.5,36 C 22.5,35.5 25,36 27,33.5 C 28,32 28.5,28 27.5,25.5 C 29.5,24 33,26 36,25.5 C 36.5,25.8 37,28 35.5,31 C 33,36 30.5,41 33.5,46 C 32,46.5 28,47 24,46 Z M 26.5,22.5 C 26.5,21.1 27.6,20 29,20 C 30.4,20 31.5,21.1 31.5,22.5 C 31.5,23.9 30.4,25 29,25 C 27.6,25 26.5,23.9 26.5,22.5 Z M 19,35 C 16,33.5 13,31 10.5,27 C 10,26 11,25.5 11.5,26.5 C 13.5,30 16,32 19.5,33 Z M 28,29 C 32,29 36.5,28.5 41,27.5 C 42,27.2 42.5,28.5 41.5,29 C 37,30.5 32,31 28,30.5 Z"
              />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="w-full bg-[#2B2320] relative">
        {/* Subtle wavy texture lines - slowly drifting */}
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 25,
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

        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center px-4 sm:px-6 py-14 sm:py-20 md:py-24 text-white">

          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0 text-center md:text-left"
          >
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

          {/* Right Column: Sibling container allowing overlay bleed. Canvas sits behind z-0, photo container z-10 */}
          <div
            className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] group cursor-pointer"
            onMouseEnter={handleMouseEnter}
          >
            {/* Confetti canvas — placed behind image (z-0) with negative margins to allow it to bleed out */}
            <canvas
              ref={canvasRef}
              className="absolute -top-16 -left-16 -right-16 -bottom-16 w-[calc(100%+128px)] h-[calc(100%+128px)] pointer-events-none z-0"
            />

            {/* Staff photo container (rounded corners, shadow, clipping at z-10) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-[#c8a97e]/20 z-10"
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
      </div>

      {/* ── Wavy Bottom Edge (brown section → white bg below) ── */}
      <div className="w-full leading-[0] bg-[#2B2320] -mt-px">
        <style>{`
          @keyframes aboutWaveBottom {
            0%, 100% {
              d: path("M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z");
            }
            50% {
              d: path("M0,20 C240,50 480,35 720,20 C960,60 1200,35 1440,20 L1440,80 L0,80 Z");
            }
          }
          .animate-about-wave-bottom {
            animation: aboutWaveBottom 14s ease-in-out infinite;
          }
        `}</style>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            className="animate-about-wave-bottom"
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

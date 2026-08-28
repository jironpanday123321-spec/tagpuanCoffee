import { lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import "./App.css";

// Lazy-loaded section components — each gets its own JS chunk
const Hero = lazy(() =>
  import("@/components/hero/Hero").then((m) => ({ default: m.Hero }))
);
const FeaturedDrinks = lazy(() =>
  import("@/components/featured-drinks/FeaturedDrinks").then((m) => ({
    default: m.FeaturedDrinks,
  }))
);
const About = lazy(() =>
  import("@/components/about/About").then((m) => ({ default: m.About }))
);
const Location = lazy(() =>
  import("@/components/location/Location").then((m) => ({
    default: m.Location,
  }))
);

/** Minimal placeholder shown while a section chunk is loading */
function SectionSkeleton() {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.3,
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid currentColor",
          borderTopColor: "transparent",
          display: "inline-block",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-amber-100 overflow-x-hidden w-full relative">
      {/* Navbar is always eagerly loaded — it's the first thing users see */}
      <Navbar />

      <Suspense fallback={<SectionSkeleton />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedDrinks />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Location />
      </Suspense>
    </div>
  );
}

export default App;

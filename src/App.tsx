import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { FeaturedDrinks } from "@/components/featured-drinks/FeaturedDrinks";
import { About } from "@/components/about/About";
import { Location } from "@/components/location/Location";
import "./App.css";

export function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-amber-100 overflow-x-hidden w-full relative">
      <Navbar />
      <Hero />
      <FeaturedDrinks />
      <About />
      <Location />
    </div>
  );
}

export default App;

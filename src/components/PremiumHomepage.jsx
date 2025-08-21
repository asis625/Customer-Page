import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import NewArrivalsSection from "./NewArrivalsSection";
import BackgroundWatermark from "./BackgroundWatermark";

export default function PremiumHomepage() {
  return (
    <div>
      <Navbar />
      <BackgroundWatermark />
      <HeroSection />
      <NewArrivalsSection />
    </div>
  );
}
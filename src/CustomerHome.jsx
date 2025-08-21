
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import NewArrivalsSection from './components/NewArrivalsSection';
import BackgroundWatermark from './components/BackgroundWatermark';

export default function CustomerHome() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fbe9d7 0%, #fff7e6 100%)',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden',
    }}>
      <Navbar />
      <BackgroundWatermark />
      <HeroSection />
      <SearchBar />
      <NewArrivalsSection />
    </div>
  );
}

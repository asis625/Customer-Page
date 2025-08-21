import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import BackgroundWatermark from './components/BackgroundWatermark';

export default function CustomerHome() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'url("/background.png") center/cover no-repeat',
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      <div style={{
        background: 'rgba(255, 247, 230, 0.85)',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backdropFilter: 'blur(2px)',
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <BackgroundWatermark />
        <HeroSection />
        <NewArrivalsSection />
      </div>
    </div>
  );
}
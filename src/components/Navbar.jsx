import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Shop', href: '/shop' },
  { name: 'Accessories', href: '/category/accessories' },
  { name: 'Shawls', href: '/category/shawls' },
  { name: 'Clothing', href: '/category/clothing' },
];

export default function Navbar() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 2rem',
      background: 'rgba(255, 245, 230, 0.95)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      borderRadius: '0 0 24px 24px',
      position: 'relative'
    }}>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#7c4a03'
      }}>
        Aarambha
      </div>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {navLinks.map(link => (
          <Link key={link.name} to={link.href} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem',
            color: '#7c4a03',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'background 0.2s, color 0.2s'
          }}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
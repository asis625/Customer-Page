import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Deals', href: '/deals' },
  { name: 'Tops', href: '/tops' },
  { name: 'Bottoms', href: '/bottoms' },
  { name: 'Accessories', href: '/accessories' },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
  <div className={styles.logo}>Aarambha</div>
      <nav className={styles.navbar}>
        {navLinks.map(link => (
          <a key={link.name} href={link.href} className={styles.navLink}>
            {link.name}
          </a>
        ))}
      </nav>
      <div className={styles.cartIcon}>
        <ShoppingCartIcon width={24} height={24} />
      </div>
    </header>
  );
}

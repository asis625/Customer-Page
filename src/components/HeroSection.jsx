import React from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
  <h1 className={styles.title}>Aarambha</h1>
  <p className={styles.slogan}>Begin anew. नयाँ आरम्भ, नयाँ अंदाज़।</p>
    </section>
  );
}

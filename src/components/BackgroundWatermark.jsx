import React from 'react';
import styles from './BackgroundWatermark.module.css';

export default function BackgroundWatermark() {
  return (
    <div className={styles.watermark}>
      {/* Nepal temple SVG illustration (placeholder) */}
      <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.13">
          <rect x="0" y="40" width="320" height="100" rx="32" fill="#c97c2f" />
          <polygon points="160,20 200,80 120,80" fill="#7c4a03" />
          <rect x="140" y="80" width="40" height="40" rx="8" fill="#a67c52" />
        </g>
      </svg>
    </div>
  );
}

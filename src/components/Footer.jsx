import React from "react";

export default function Footer() {
  return (
    <footer style={{
      padding: 16,
      background: "#f6ecd7",
      color: "#3c2c19",
      textAlign: "center",
      marginTop: 40,
      fontFamily: "serif",
      fontSize: "1rem"
    }}>
      © {new Date().getFullYear()} E-Store Nepal. All rights reserved.
    </footer>
  );
}
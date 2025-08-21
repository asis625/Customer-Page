import React from "react";

export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      margin: "16px 0",
      borderBottom: "1px solid #d8c7a2",
      paddingBottom: 12
    }}>
      <img src={item.imageUrl || "/background.png"} alt={item.name} style={{ width: 60, height: 60, marginRight: 16 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div>NPR {Number(item.price).toLocaleString("en-NP")}</div>
      </div>
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => updateQty(item.id, Number(e.target.value))}
        style={{ width: 50, marginRight: 12 }}
      />
      <button onClick={() => removeItem(item.id)} style={{
        background: "#c0392b", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer"
      }}>Remove</button>
    </div>
  );
}
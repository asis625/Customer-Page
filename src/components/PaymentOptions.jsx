import React from "react";

export default function PaymentOptions({ form, setForm }) {
  return (
    <div style={{ margin: "16px 0" }}>
      <div><b>Payment Options:</b></div>
      <label>
        <input
          type="radio"
          name="payment"
          value="COD"
          checked={form.payment === "COD"}
          onChange={e => setForm({ ...form, payment: e.target.value })}
        /> Cash on Delivery
      </label>
      <label style={{ marginLeft: 24 }}>
        <input
          type="radio"
          name="payment"
          value="Khalti"
          checked={form.payment === "Khalti"}
          onChange={e => setForm({ ...form, payment: e.target.value })}
        /> Khalti
      </label>
      {/* <label style={{ marginLeft: 24 }}>
        <input
          type="radio"
          name="payment"
          value="eSewa"
          checked={form.payment === "eSewa"}
          onChange={e => setForm({ ...form, payment: e.target.value })}
        /> eSewa
      </label> */}
    </div>
  );
}
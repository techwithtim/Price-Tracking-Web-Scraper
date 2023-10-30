// src/NotificationPreferenceForm.js

import React, { useState } from "react";

function NotificationPreferenceForm() {
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      product_id: productId,
      original_price: originalPrice,
    };

    const response = await fetch('http://localhost:5000/set-notification-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
    } else {
      alert('Failed to set notification preference. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Product ID:
        <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required />
      </label>
      <label>
        Original Price:
        <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} required />
      </label>
      <button type="submit">Set Notification Preference</button>
    </form>
  );
}

export default NotificationPreferenceForm;

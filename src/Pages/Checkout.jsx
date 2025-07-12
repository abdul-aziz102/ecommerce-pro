import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextProvider';

const Checkout = () => {
  const { cart, getTotalItems, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'creditCard',
    shippingOption: 'standard',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, address, phone } = formData;

    if (!name || !email || !address || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    // Normally you'd send order to server here
    alert('✅ Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="mx-auto p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-300">Checkout</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div>
          <label className="text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border p-2 bg-gray-700 text-white rounded-md mt-1"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border p-2 bg-gray-700 text-white rounded-md mt-1"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-gray-300">Shipping Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="w-full border p-2 bg-gray-700 text-white rounded-md mt-1"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-gray-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full border p-2 bg-gray-700 text-white rounded-md mt-1"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-gray-300">Payment Method</label>
          <select
            name="paymentMethod"
            className="w-full border p-2 bg-gray-700 text-white rounded-md mt-1"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-400 transition duration-300"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;

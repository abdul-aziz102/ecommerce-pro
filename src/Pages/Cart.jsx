import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextProvider';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(ShopContext);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='mx-auto p-6 min-h-screen bg-gray-900 text-white'>
      <h2 className='text-3xl font-bold text-center mb-6 text-teal-300'>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className='text-center text-gray-400 text-lg'>
          Your cart is empty.{' '}
          <Link to="/collection" className="text-teal-400 hover:underline">
            Shop Now
          </Link>
        </p>
      ) : (
        <div className='grid gap-4 max-w-3xl mx-auto'>
          {cart.map((item) => (
            <div
              key={item._id}
              className='flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 shadow-lg p-4 rounded-lg border border-gray-700'
            >
              <img
                src={item.image?.[0]}
                alt={item.name}
                className='w-full sm:w-20 h-20 object-cover rounded-md mb-4 sm:mb-0'
              />

              <div className='flex-1 px-4'>
                <h3 className='text-lg font-semibold text-white'>{item.name}</h3>
                <p className='text-gray-400'>
                  Price:{' '}
                  <span className="font-bold text-teal-400">${item.price.toFixed(2)}</span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className='flex items-center mt-2 sm:mt-0'>
                <button
                  onClick={() => item.quantity > 1 ? addToCart(item, -1) : removeFromCart(item._id)}
                  className='bg-gray-600 px-3 py-1 rounded-l text-lg hover:bg-gray-500 transition'
                >
                  -
                </button>
                <span className='px-4 font-semibold'>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className='bg-gray-600 px-3 py-1 rounded-r text-lg hover:bg-gray-500 transition'
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className='mt-3 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition sm:ml-4'
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price & Checkout */}
          <div className='mt-6 p-4 bg-gray-800 rounded-lg shadow-md text-right border border-gray-700'>
            <p className='text-xl font-semibold'>
              Total:{' '}
              <span className="text-teal-400">${totalPrice.toFixed(2)}</span>
            </p>
            <Link to="/checkout">
              <button className='mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-400 transition'>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

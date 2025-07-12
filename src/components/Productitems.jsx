import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextProvider';

export default function Productitems({ id, image, price, name }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/products/${id}`}
      className="cursor-pointer text-white bg-gray-900 p-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    >
      <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
        <img
          src={image?.[0]} // Safe check in case image is undefined or not an array
          alt={name}
          className="w-full h-full object-cover rounded-lg hover:scale-110 transition duration-300 ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-teal-400 text-lg font-semibold">{name}</p>
      <p className="text-gray-300 text-sm font-light">
        {currency} {price}
      </p>
    </Link>
  );
}

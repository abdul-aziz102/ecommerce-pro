import React, { useContext, useEffect, useState } from 'react';
import Productitems from '../components/Productitems';
import { ShopContext } from '../Context/ShopContextProvider';

const Bestsaler = () => {
  const { products } = useContext(ShopContext);
  const [latestproduct, setLatestproduct] = useState([]);

  useEffect(() => {
    // Only update if products exist
    if (products && products.length > 0) {
      setLatestproduct(products.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="py-10 bg-gray-900 text-white">
      <div className="text-center py-7 font-bold text-4xl font-serif text-teal-300">
        Best Sellers
      </div>
      <p className="text-center pb-6 text-gray-400">
        Explore the most popular and high-demand products.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {latestproduct.map((item) => (
          <Productitems
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestsaler;

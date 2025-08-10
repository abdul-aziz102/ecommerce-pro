import React, { useContext, useState } from 'react';
import Productitems from '../components/Productitems';
import SearchBar from '../components/searchbar';

import { ShopContext } from '../Context/ShopContextProvider';

const Collection = () => {
  const { products , search } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [...new Set(products.map((product) => product.category))];

  console.log('Search Query:', search); // Debugging
  console.log('Selected Category:', selectedCategory); // Debugging

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar />
      <div className=" mx-auto py-10  bg-gray-900 px-4">
        <h2 className="text-3xl font-bold text-center text-teal-500 mb-6">Collection</h2>

        {/* Filters: Category & Price Range */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-6 shadow-lg">
          {/* Category Filter */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Category</label>
            <select
              className="p-2 border rounded bg-gray-800 text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col mt-4 md:mt-0">
            <label className="font-semibold mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="30"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full cursor-pointer accent-teal-500"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Productitems
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;

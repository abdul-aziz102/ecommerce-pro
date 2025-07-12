import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../Context/ShopContextProvider';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show searchbar only on /collection route and if showSearch is true
    setVisible(location.pathname.includes("/collection") && showSearch);
  }, [location, showSearch]);

  if (!visible) return null;

  return (
    <div className="w-full bg-gray-900 py-4 flex justify-center shadow-md z-40">
      <div className="relative w-11/12 sm:w-3/5 flex items-center bg-white rounded-full px-4 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 p-2 outline-none bg-transparent text-black"
        />

        <img
          src={assets.search_icon}
          className="w-5 h-5 cursor-pointer"
          alt="search"
        />

        <img
          src={assets.cross_icon}
          alt="close"
          className="w-5 h-5 cursor-pointer ml-2"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  );
};

export default Searchbar;

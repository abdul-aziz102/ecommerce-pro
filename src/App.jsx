import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Collection from './Pages/Collection';
import Bestsaler from './Pages/Bestsaler';
import Home from './Pages/Home';
import Bestproducts from './Pages/Bestproducts';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Footer from './components/Footer';
import ProductDetail from './Pages/ProductDetail';
import Ourpolicy from './components/Ourpolicy';
import Newslater from './components/Newslater';

const App = () => {
  console.log("✅ App component is rendering"); // <-- ADD THIS LINE

  return (
    <div className='mt-10'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/bestsaler" element={<Bestsaler />} />
        <Route path="/best-products" element={<Bestproducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Ourpolicy />
      <Newslater />
      <Footer />
    </div>
  );
};

export default App;

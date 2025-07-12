import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContextProvider';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const product = products.find((item) => String(item._id) === String(id));

  useEffect(() => {
    if (product?.image?.length > 0) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <h2 className='text-center text-2xl text-white mt-10'>
        Product Not Found
      </h2>
    );
  }

  return (
    <div className='mx-auto p-6 bg-gray-900 text-white min-h-screen relative'>
      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt='Full View'
            className='max-h-full max-w-full rounded-lg shadow-xl'
          />
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6'>
        {/* Image Section */}
        <div>
          {/* Main Image */}
          <div className='w-full h-full bg-black rounded-lg mb-4 flex items-center justify-center'>
            <img
              src={mainImage}
              alt='Selected'
              className='max-h-full max-w-full object-contain cursor-pointer rounded-lg shadow-md'
              onClick={() => setSelectedImage(mainImage)}
            />
          </div>

          {/* Thumbnails */}
          <div className='flex space-x-3 overflow-x-auto scrollbar-hide'>
            {product.image?.map((img, index) => (
              <div key={index} className='h-20 w-20 flex-shrink-0'>
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`h-full w-full object-cover rounded-md cursor-pointer border-2 ${
                    img === mainImage ? 'border-teal-400' : 'border-transparent'
                  }`}
                  onClick={() => setMainImage(img)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='p-4'>
          <h2 className='text-3xl font-bold mb-4 text-teal-300'>{product.name}</h2>
          <p className='text-gray-300 mb-4'>{product.description}</p>
          <p className='text-xl font-semibold text-teal-400'>
            Price: ${product.price}
          </p>
          <p className='text-gray-400 mt-2'>
            Category: <span className='font-semibold'>{product.category}</span>
          </p>
          <p className='text-gray-400 mt-2'>
            Available Sizes:{' '}
            <span className='font-semibold'>
              {product.size?.join(', ') || 'N/A'}
            </span>
          </p>

          {/* Quantity Input */}
          <div className='flex items-center mt-4'>
            <label className='mr-2 font-semibold text-gray-300'>Quantity:</label>
            <input
              type='number'
              value={quantity}
              min={1}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className='border border-gray-600 bg-gray-800 text-white rounded px-2 w-16 text-center'
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, quantity)}
            className='mt-6 px-10 py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-400 transition duration-300'
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

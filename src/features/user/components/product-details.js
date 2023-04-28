import React from 'react';
import { Image } from '@/components/Elements/Image';

const ProductDetails = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

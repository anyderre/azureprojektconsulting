import React from 'react';
import { Button } from '@/components/Elements/Button';
import { ArrowCircleLeftIcon, CurrencyDollarIcon } from '@heroicons/react/outline';
import { Link } from '@/components/Elements';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/Elements/Image';
import { TopSoldProductImage } from './top-sold-product';
import { TopViewedProductImage } from './top-viewed-product';

export const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className=" grid grid-cols-2">
      <div className="relative h-92 max-h-92">
        <Image src={product.fixed_url} alt={product.title} className="object-cover rounded-t-lg" />

        <div className="absolute top-0 right-0 px-4 py-2  rounded-lg">
          <TopViewedProductImage productId={product.uniq_id} />
          <TopSoldProductImage productId={product.uniq_id} />
        </div>

        <div className="container mx-auto absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-700 opacity-70 rounded-lg">
          <div className="md:container md:mx-auto flex justify-between">
            <h3 className="text-xl md:text-lg sm:text-md text-white font-bold">
              {product.category}
            </h3>
            <h3 className="text-xl md:text-lg sm:text-md text-white font-bold">
              {product.sub_cateory}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-col">
        <span>
          <h2 className="text-lg font-bold">
            {product.title}
            {/* <span className="ml-2 mr-2 p-1 bg-sky-500 rounded-lg font-medium text-white">
              {product.category}
            </span>
            <span className=" p-1 bg-sky-500 rounded-lg font-medium text-white">
              {product.sub_cateory}
            </span> */}
          </h2>
          <p
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
          <p className="text-gray-900 font-bold mt-2">
            <span className="font-medium">{product.currency} </span>
            {product.price.toFixed(2)}
          </p>
        </span>
        <div className="flex justify-between self-end">
          <Link className="" to={`/app/orders/${product.uniq_id}`}>
            <Button size="sm" endIcon={<CurrencyDollarIcon className="w-4 h-4" />}>
              Order
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={() => navigate(-1)}
            variant="inverse"
            endIcon={<ArrowCircleLeftIcon className="w-4 h-4" />}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

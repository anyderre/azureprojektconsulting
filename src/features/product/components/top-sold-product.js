import React, { useState } from 'react';
import { useTopSoldProduct } from '../api/getTopSoldProduct';
import { Spinner, Image } from '@/components/Elements';
import best_seller from '@/assets/best-seller.png';
import { useEffect } from 'react';
import abbreviate from '@/utils/abbreviation-thousandsand';

export const TopSoldProductImage = ({ productId }) => {
  const [topProduct, setTopProduct] = useState();
  const [product, setProduct] = useState();
  const topSoldProduct = useTopSoldProduct();

  useEffect(() => {
    async function getData() {
      if (topSoldProduct.data && topSoldProduct.data.data.length > 0) {
        setTopProduct(() => topSoldProduct.data.data);
      }
    }
    getData();
  }, [topSoldProduct.data]);

  useEffect(() => {
    if (topProduct && topProduct.length > 0) {
      setProduct(topProduct.find((item) => item.product_id === productId));
    }
  }, [topProduct, productId]);

  if (topSoldProduct.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (topSoldProduct.isError || topSoldProduct.error) return null;

  if (!topSoldProduct.data) return null;

  if (!product) return null;

  return (
    <div className="group" title={'Best seller Product'}>
      <div className="relative">
        <Image
          src={best_seller}
          alt={'Best seller Product'}
          className="h-16 w-16 rounded-full group-hover:opacity-40"
        />
        <div className="absolute bottom-0 left-0 right-0 px-3 py-3 bg-purple-400 opacity-90 rounded-full invisible group-hover:visible">
          <span className="font-bold text-white">{abbreviate(product.total_sales.toFixed(2))}</span>
        </div>
      </div>
    </div>
  );
};

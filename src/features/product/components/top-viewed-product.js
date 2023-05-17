import React, { useState } from 'react';
import { useTopViewedProduct } from '../api/getTopViewedProduct';
import { useCallback } from 'react';
import { Spinner, Image } from '@/components/Elements';
import most_viewed from '@/assets/most-viewed.png';
import { useEffect } from 'react';
import abbreviate from '@/utils/abbreviation-thousandsand';

export const TopViewedProductImage = ({ productId }) => {
  const [topProduct, setTopProduct] = useState();
  const [product, setProduct] = useState();
  const topViewedProduct = useTopViewedProduct();

  const getData = useCallback(async () => {
    if (topViewedProduct.data && topViewedProduct.data.data.length > 0)
      setTopProduct(() => topViewedProduct.data.data);
  }, [topViewedProduct.data]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (topProduct && topProduct.length > 0) {
      setProduct(topProduct.find((item) => item.productId === productId));
    }
  }, [topProduct, productId]);

  if (topViewedProduct.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (topViewedProduct.isError || topViewedProduct.error) return null;

  if (!topViewedProduct.data) return null;

  if (!product) return null;

  return (
    <div className="group" title={'Most viewed Product'}>
      <div className="relative">
        <Image
          src={most_viewed}
          alt={'Most view Product'}
          className="h-14 w-14 rounded-full group-hover:opacity-40"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-purple-400 opacity-90 rounded-full invisible  group-hover:visible">
          <span className="font-bold text-white">{abbreviate(product.views)}</span>
        </div>
      </div>
    </div>
  );
};

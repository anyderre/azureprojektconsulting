import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
import { ProductDetails } from '../components/product-details';
import { sendEvent } from '@/utils/sendEvent';
import { EVENT_TYPE } from '@/utils/enum';
import { getProduct } from '../api/staticProduct';

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = React.useState();

  useEffect(() => {
    const foundProduct = getProduct(productId);
    setProduct(foundProduct);
    sendEvent(foundProduct, EVENT_TYPE.PRODUCT_VIEW);
  }, [productId]);

  if (!product) return null;

  return (
    <>
      <Head title={product.title} />
      <ContentLayout>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="mt-1 max-w-full text-sm text-gray-500">
                <ProductDetails product={product} />
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

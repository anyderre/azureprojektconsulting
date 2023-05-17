import React, { useEffect } from 'react';
import { useLastViewedProducts } from '../api/getLastViewedProducts';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { Carousel } from '@/components/Elements/Carousel';
import { Image } from '@/components/Elements/Image';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/Elements';

const LastViewedProduct = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();

  // TODO: Clarify with Alex about the EVENTTYPE name
  const lastProductViewedQuery = useLastViewedProducts({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
  });

  if (lastProductViewedQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (lastProductViewedQuery.isError || lastProductViewedQuery.error) return null;

  if (!lastProductViewedQuery.data) return null;

  const handleProductView = (productId) => {
    navigate(`/public/products/${productId}`);
  };
  return (
    <div className="w-full grid items-center justify-center">
      <Carousel type={'SCROLLING'}>
        {lastProductViewedQuery.data &&
          lastProductViewedQuery.data.data &&
          lastProductViewedQuery.data.data.map((item) => (
            <div
              onClick={() => handleProductView(item.productId)}
              key={item.productId}
              className="flex items-center border border-gray-300 rounded-2xl h-10 pl-3 pr-2 cursor-pointer mt-4 mr-2"
              title="Last Product Seen"
            >
              <Image src={item.images} alt={item.title} className="h-8 w-8 rounded-full mr-2" />
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default LastViewedProduct;

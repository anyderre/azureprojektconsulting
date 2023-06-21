import React, { useEffect } from 'react';
import { useLastViewedProducts } from '../api/getLastViewedProducts';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { Image } from '@/components/Elements/Image';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/Elements';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { swiperSettings } from '@/utils/swiper-config';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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
    <>
      {lastProductViewedQuery.data &&
        lastProductViewedQuery.data.data &&
        lastProductViewedQuery.data.data.length > 0 && (
          <div className="swiper-container sm:max-w-full sm:w-full xs:max-w-screen xs:w-screen bg-white rounded-lg drop-shadow-sm shadow-sm font-medium p-4">
            <>
              <h2 className="object-scale-down">Last 3 Viewed Products</h2>
              <Swiper
                {...swiperSettings}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper mt-4 mr-2"
              >
                {lastProductViewedQuery.data.data.map((item) => (
                  <SwiperSlide className="mx-10" key={item.productId} centeredSlides={true}>
                    <div
                      onClick={() => handleProductView(item.productId)}
                      className="flex items-center border border-gray-300 rounded-2xl h-10 pl-3 pr-2 cursor-pointer"
                      title="Last Product Seen"
                    >
                      <Image
                        src={item.images}
                        alt={item.title}
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <span className="text-sm">{item.title}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          </div>
        )}
    </>
  );
};

export default LastViewedProduct;

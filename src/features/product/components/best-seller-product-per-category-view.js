import React, { useState } from 'react';
import { useBestSellerInCategory } from '../api/getBestSellerInCategory';
import { useCallback } from 'react';
import { Spinner, Image } from '@/components/Elements';
import { useEffect } from 'react';
import abbreviate from '@/utils/abbreviation-thousandsand';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { useNavigate } from 'react-router-dom';
import { swiperSettings } from '@/utils/swiper-config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export const BestSellerProductPerCategoryView = ({ category }) => {
  const [productListAmountOfSales, setProductListAmountOfSales] = useState();
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  const productObjPerCategory = useBestSellerInCategory({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
  });

  const getData = useCallback(async () => {
    if (productObjPerCategory.data && productObjPerCategory.data.data.length > 0) {
      setProductListAmountOfSales(() => productObjPerCategory.data.data);
    }
  }, [productObjPerCategory.data]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (category && productListAmountOfSales && productListAmountOfSales.length > 0) {
      const productsFound = Array.from(
        new Set(productListAmountOfSales.filter((item) => item.category === category))
      );
      setProducts(() => productsFound);
    }
  }, [category, productListAmountOfSales]);

  if (productObjPerCategory.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (productObjPerCategory.isError || productObjPerCategory.error) return null;

  if (!productObjPerCategory.data) return null;

  if (!category) return null;
  if (!products || products?.length <= 0) return null;

  const handleProductView = (productId) => {
    navigate(`/public/products/${productId}`);
  };

  return (
    <div className="swiper-container w-full xs:w-1/2 mx-auto  bg-white rounded-lg shadow-md p-2">
      <h2 className="font-bold">Best seller in {category}</h2>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        {...swiperSettings}
        className="mySwiper mt-4 mr-2"
      >
        {products.length > 0 &&
          products.map((item) => (
            <SwiperSlide className="overflow-x-hidden" key={item.productId}>
              <div
                onClick={() => handleProductView(item.product_id)}
                key={item.product_id}
                title={item.product_name}
                className="relative bg-white drop-shadow rounded-lg w-full h-full shadow-md cursor-pointer"
              >
                <Image
                  className="m-auto h-60 w-60 object-scale-down"
                  src={item.images}
                  alt={item.product_name}
                />
                <div className="absolute top-0 right-0 rounded-lg drop-shadow-xl">
                  <div>
                    <span className="bg-sky-500 flex flex-col text-lg text-center font-serif text-white rounded-lg p-1 mt-2">
                      ${abbreviate(item.order_total.toFixed(2))}
                      <span className="italic text-xs">Amt. sold</span>
                    </span>
                    <span className="bg-green-500 flex flex-col text-center text-lg font-serif text-white rounded-lg p-1 mt-2">
                      {item.count}
                      <span className="italic text-xs">Times sold</span>
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-[60%] right-1 bg-green-500 rounded-lg drop-shadow-xl"></div>
                <div className="bg-gray-400 object-scale-down rounded-lg p-2 text-center">
                  <span className="text-md text-center text-white font-medium">
                    {item.product_name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
    // <div className="max-w-full w-full rounded-lg shadow-md p-2 h-96">

    // </div>
  );
};

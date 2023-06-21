import React, { useState, useEffect, useMemo } from 'react';
import { useTopSoldFromLastVisited } from '../api/getTopSoldFromLastVisited';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import Rating from 'react-rating';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { Spinner } from '@/components/Elements';

const TopProductViewed = ({ handleDataLoaded, handleCategoryClick, initialCategory }) => {
  // TODO: Clarify with Alex about the EVENTTYPE name
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [max, setMax] = useState();

  const topProductCategorySoldQuery = useTopSoldFromLastVisited({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
  });

  useEffect(() => {
    if (
      topProductCategorySoldQuery &&
      topProductCategorySoldQuery.data &&
      topProductCategorySoldQuery.data.data.length > 0
    ) {
      setMax(() => topProductCategorySoldQuery.data.data[0].price_sold);
    }
  }, [topProductCategorySoldQuery.data]);

  useEffect(() => {
    if (!topProductCategorySoldQuery.isLoading) {
      if (
        topProductCategorySoldQuery &&
        topProductCategorySoldQuery.data &&
        topProductCategorySoldQuery.data.data.length > 0
      ) {
        handleDataLoaded(true);
        setMax(() => topProductCategorySoldQuery.data.data[0].price_sold);
      } else {
        handleDataLoaded(false);
      }
    }
  }, [topProductCategorySoldQuery.data]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  if (topProductCategorySoldQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (topProductCategorySoldQuery.isError || topProductCategorySoldQuery.error) return null;

  if (!topProductCategorySoldQuery.data) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-2 grid grid-flow-row">
      <div className="flex gap-1">
        <h2 className="font-bold">Top categories sold of the product you interested in</h2>
        <CurrencyDollarIcon className="ml-1 w-6 h-6" />
      </div>
      {max &&
        topProductCategorySoldQuery.data &&
        topProductCategorySoldQuery.data.data &&
        topProductCategorySoldQuery.data.data.map((item) => (
          <span
            key={item.category}
            onClick={() => {
              const categorySelected = selectedCategory === item.category ? '' : item.category;
              setSelectedCategory((previousCategory) =>
                previousCategory === item.category ? '' : item.category
              );
              handleCategoryClick(categorySelected, 'TopProductSold');
            }}
          >
            <div
              className={`flex items-center justify-between border  ${
                item.category === selectedCategory ? 'bg-gray-200' : ''
              } border-gray-300 rounded-2xl h-10 pl-3 pr-2 cursor-pointer mt-4 mr-2`}
              title="Popular Categories you last visited"
            >
              <span className="rounded-full mr-2">{item.category}</span>
              <span className="text-lg">
                <span className="font-medium font-serif">{item.currency} </span>
                {item.price_sold.toFixed(2)}
              </span>
            </div>
            <Rating
              className="items-end justify-end float-right  mr-2"
              readonly
              initialRating={((item.price_sold * 5) / max).toFixed(1)}
            />
          </span>
        ))}
    </div>
  );
};

export default TopProductViewed;

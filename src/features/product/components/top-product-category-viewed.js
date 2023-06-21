import React, { useEffect, useState } from 'react';
import { useTopViewedFromLastVisited } from '../api/getTopViewedFromLastVisited';
import { EyeIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import Rating from 'react-rating';
import { Spinner } from '@/components/Elements';

const TopProductViewed = ({ handleDataLoaded, handleCategoryClick, initialCategory }) => {
  const [max, setMax] = useState();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // TODO: Clarify with Alex about the EVENTTYPE name
  const topProductCategoryViewedQuery = useTopViewedFromLastVisited({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
  });

  useEffect(() => {
    if (
      topProductCategoryViewedQuery &&
      topProductCategoryViewedQuery.data &&
      topProductCategoryViewedQuery.data.data.length > 0
    ) {
      setMax(() => topProductCategoryViewedQuery.data.data[0].views);
    }
  }, [topProductCategoryViewedQuery.data]);

  useEffect(() => {
    if (!topProductCategoryViewedQuery.isLoading) {
      if (
        topProductCategoryViewedQuery &&
        topProductCategoryViewedQuery.data &&
        topProductCategoryViewedQuery.data.data.length > 0
      ) {
        handleDataLoaded(true);
      } else {
        handleDataLoaded(false);
      }
    }
  }, [topProductCategoryViewedQuery.isLoading]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  if (topProductCategoryViewedQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (topProductCategoryViewedQuery.isError || topProductCategoryViewedQuery.error) return null;

  if (!topProductCategoryViewedQuery.data) return null;

  return (
    <div className="w-full object-scale-down bg-white rounded-lg shadow-md p-2 grid grid-flow-row">
      <div className="flex gap-1">
        <h2 className="font-bold">Top categories viewed of the products you interested in</h2>
        <EyeIcon className="ml-1 w-6 h-6" />
      </div>
      {max &&
        topProductCategoryViewedQuery.data &&
        topProductCategoryViewedQuery.data.data &&
        topProductCategoryViewedQuery.data.data.map((item) => (
          <span
            key={item.category}
            onClick={() => {
              const categorySelected = selectedCategory === item.category ? '' : item.category;
              setSelectedCategory((previousCategory) =>
                previousCategory === item.category ? '' : item.category
              );
              handleCategoryClick(categorySelected, 'TopProductViewed');
            }}
          >
            <div
              className={`flex items-center justify-between border ${
                item.category === selectedCategory ? 'bg-gray-200' : ''
              }  border-gray-300 rounded-2xl h-10 pl-3 pr-2 cursor-pointer mt-4 mr-2`}
              title="Popular Categories you last visited"
            >
              <span className="rounded-full mr-2">{item.category}</span>
              <span className="text-lg">{item.views}</span>
            </div>
            <Rating
              className="items-end justify-end float-right mr-2 "
              readonly
              initialRating={((item.views * 5) / max).toFixed(1)}
            />
          </span>
        ))}
    </div>
  );
};

export default TopProductViewed;

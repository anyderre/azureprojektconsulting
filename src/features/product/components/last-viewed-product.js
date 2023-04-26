import React, { useEffect } from 'react';
import { useLastViewedProducts } from '../api/getLastViewedProducts';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { Carousel } from '@/components/Elements/Carousel';
import { useNavigate } from 'react-router-dom';

const LastViewedProduct = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();

  // TODO: Clarify with Alex about the EVENTTYPE name
  const lastProductViewedQuery = useLastViewedProducts({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
    // visitorId: 'visitor1',
    // sessionId: 'session456',
    // eventType: 'view',
  });

  if (lastProductViewedQuery.isLoading) {
    return <div className="w-full h-48 flex justify-center items-center"></div>;
  }

  if (!lastProductViewedQuery.data) return null;

  const handleProductView = (productId) => {
    navigate(`/public/products/${productId}`);
  };

  return (
    <div className="w-full grid items-center justify-center">
      <Carousel>
        {lastProductViewedQuery.data &&
          lastProductViewedQuery.data.data &&
          lastProductViewedQuery.data.data.map((item) => (
            <div
              onClick={() => handleProductView(item.productId)}
              key={item.productId}
              class="flex items-center border border-gray-300 rounded-2xl h-10 pl-3 pr-2 cursor-pointer mt-4 mr-2"
              title="Last Product Seen"
            >
              <img
                src={
                  item.images ??
                  `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAEBQYHAv/EACwQAAEDAwEFCAMBAAAAAAAAAAECAwQABRESBiExQXETIiNRYZGhsRRSwQf/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A2VaCsUG/AyCpakpSOJJwKVzNvbLGcCEOaxzUTgDpxzUhdtqjc5ZEO4PvKUT2TaYoV2Y8gAoZ64JqyJar5DlrYJbdu0BC/wBVyUA/dBybaiU2XIrzT6cZy0sK+qxiVZp866POsrdkvBRW4oN6dIHHmcdKfWa2SC2gvSWoTqDlK0vHI6ADI96uGpWfcIxltIQmdhWB4jaUg53b+4Dkdafx7ibcw0xFeVokK0vAtJBCfQjfR7+wDBV4E+U0nOcFWr7rhH+fpAwq5PHcRkoSdx9Du+KCZRdl/kx57bim21btGvuhJz3ccgBjkcnJzniSm5F86ITMh5fmngf581UW3YW1wUpS6pcjScjtDu9qesx4sROlhpCQPIUH/9k=`
                }
                alt={item.title}
                class="h-8 w-8 rounded-full mr-2"
              />
              <span class="text-sm">{item.title}</span>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default LastViewedProduct;

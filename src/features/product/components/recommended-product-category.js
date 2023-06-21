import React from 'react';
import { useRecommendedProductCategory } from '../api/getRecommendedProductCategory';
import Cookies from 'js-cookie';
import { EVENT_TYPE, COOKIES_TYPE } from '@/utils/enum';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/Elements';
import { useTopProductCategory } from '../api/getTopProductCategory';
import Rating from 'react-rating';
import { Popover, Button, Avatar, Grid } from '@nextui-org/react';
import { Link } from '@/components/Elements';
import abbreviate from '@/utils/abbreviation-thousandsand';

const RecommendedProductCategory = () => {
  const navigate = useNavigate();

  // TODO: Clarify with Alex about the EVENTTYPE name
  const recommendedProductCategoryQuery = useRecommendedProductCategory({
    visitorId: Cookies.get(COOKIES_TYPE.VISITORID),
    sessionId: Cookies.get(COOKIES_TYPE.SESSIONID),
    eventType: EVENT_TYPE.PRODUCT_VIEW,
  });

  if (recommendedProductCategoryQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (recommendedProductCategoryQuery.isError || recommendedProductCategoryQuery.error) return null;

  if (!recommendedProductCategoryQuery.data) return null;

  return (
    <>
      {recommendedProductCategoryQuery.data &&
        recommendedProductCategoryQuery.data.data &&
        recommendedProductCategoryQuery.data.data.length > 0 && (
          <div className="bg-white rounded-lg drop-shadow-sm shadow-sm  p-4">
            <h2 className="font-medium text-center object-scale-down">
              These Products Category could interest you
            </h2>
            <Grid.Container alignContent="center" gap={2}>
              {recommendedProductCategoryQuery.data.data.map((item) => (
                <Grid xs={12} sm={12} md={4} justify="center">
                  <CategoryPopover category={item.category} />
                </Grid>
              ))}
            </Grid.Container>
            {/* <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 gap-2 mt-4 mr-2">
            </div> */}
          </div>
        )}
    </>
  );
};

function CategoryPopover({ category }) {
  const categoryProductsQuery = useTopProductCategory({
    category,
  });

  if (categoryProductsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (categoryProductsQuery.isError || categoryProductsQuery.error) return null;

  if (!categoryProductsQuery.data) return null;

  return (
    <Popover placement={'bottom-right'}>
      <Popover.Trigger>
        <Button shadow color="gradient" className="w-full">
          {category}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          {categoryProductsQuery.data &&
            categoryProductsQuery.data.data &&
            categoryProductsQuery.data.data.length > 0 && (
              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                {categoryProductsQuery.data.data.map((product) => (
                  <Link key={product.productId} to={`/public/products/${product.productId}`}>
                    <a
                      href="#/"
                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex shrink-0 items-center justify-center text-white">
                        <Avatar size="xl" src={product.images} color="secondary" bordered squared />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">
                          <span className="drop-shadow-lg text-lg text-center text-red-500 font-serif rounded-lg p-1 mx-2">
                            <span className="italic text-xs ">{product.currency}</span>$
                            {abbreviate(product.price.toFixed(2))}
                          </span>
                          <Rating
                            className="drop-shadow-lg items-end justify-end mr-2 "
                            readonly
                            fullSymbol={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#FFA500"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            }
                            emptySymbol={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            }
                            initialRating={product.average_rating}
                          />
                          ({product.reviews_count})
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
        </div>
      </Popover.Content>
    </Popover>
  );
}

export default RecommendedProductCategory;

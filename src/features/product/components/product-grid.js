import React, { useState } from 'react';
import { Spinner, Link } from '@/components/Elements';
import data from '@/data/data.json';
import ReactPaginate from 'react-paginate';
import { Button } from '@/components/Elements/Button';
import Skeleton from 'react-loading-skeleton';
import { EyeIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { sendEvent } from '@/utils/sendEvent';
import { EVENT_TYPE } from '@/utils/enum';

function Product({ currentProducts }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts &&
          currentProducts.map(
            (product, index) =>
              (
                <div
                  key={product.uniq_id}
                  className="bg-white rounded-lg shadow-md p-2 grid grid-flow-row"
                >
                  <img
                    src={product.images}
                    alt={product.title || `Product ${index}`}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{product.title}</h2>
                    <p className="text-gray-900 font-bold mt-2">
                      <span className="font-medium">{product.currency} </span>
                      {product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex self-end items-center justify-between">
                    <span className="italic">
                      {product.item_condition === 'UsedCondition' ? 'Used' : 'New'}
                    </span>
                    <Link className="justify-self-end" to={`./${product.uniq_id}`}>
                      <Button size="sm" endIcon={<EyeIcon className="w-4 h-4" />}>
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ) || <Skeleton />
          )}
      </div>
    </>
  );
}

export const ProductGrid = () => {
  // / Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    sendEvent(null, EVENT_TYPE.PAGE_PRODUCTS_VIEWED);
  };

  return (
    <>
      <Product currentProducts={currentItems} />
      <ReactPaginate
        activeClassName="bg-sky-900 text-xl rounded-full text-white"
        breakClassName="text-gray-500"
        breakLabel="..."
        containerClassName="flex justify-center items-center bg-blue-500 h-20 w-full mt-6 relative"
        // containerClassName="flex flex-wrap justify-center"
        disabledClassName="opacity-50 cursor-not-allowed"
        marginPagesDisplayed={10}
        nextClassName="bg-blue-500 text-white ml-2 px-2 py-1 rounded"
        nextLabel={<ArrowCircleRightIcon style={{ fontSize: 18, width: 50 }} />}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageClassName="text-white-500 hover:bg-gray-500 hover:text-white px-2 py-1"
        pageRangeDisplayed={10}
        previousClassName="bg-blue-500 text-white mr-2 px-2 py-1 rounded"
        previousLabel={<ArrowCircleLeftIcon style={{ fontSize: 18, width: 50 }} />}
      />
    </>
  );
};

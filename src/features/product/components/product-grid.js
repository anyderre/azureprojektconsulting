import React, { useEffect, useState } from 'react';
import { Link } from '@/components/Elements';
import ReactPaginate from 'react-paginate';
import { Button } from '@/components/Elements/Button';
import { Skeleton } from '@/components/Elements/Skeleton';
import { EyeIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { sendEvent } from '@/utils/sendEvent';
import { EVENT_TYPE } from '@/utils/enum';
import { Image } from '@/components/Elements/Image';
import { useMemo } from 'react';
import Select, { components } from 'react-select';
import { TopSoldProductImage } from './top-sold-product';
import { TopViewedProductImage } from './top-viewed-product';
import storage from '@/utils/storage';

function Product({ currentProducts }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
        {currentProducts &&
          currentProducts.length > 0 &&
          currentProducts.map(
            (product, index) =>
              (
                <div
                  key={product.uniq_id}
                  className="bg-white rounded-lg shadow-md p-2 grid grid-flow-row"
                >
                  <div className="relative h-92 max-h-92">
                    <Image
                      src={product.fixed_url}
                      alt={product.title || `Product ${index}`}
                      className="h-96 w-96 object-scale-down rounded-t-lg"
                    />
                    <div className="absolute top-0 right-0 px-4 py-2  rounded-lg">
                      <TopViewedProductImage productId={product.uniq_id} />
                      <TopSoldProductImage productId={product.uniq_id} />
                    </div>

                    <div className="container mx-auto absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-700 opacity-70 rounded-lg">
                      <div className="md:container md:mx-auto flex justify-between">
                        <h3 className="text-xl md:text-lg sm:text-md text-white font-bold">
                          {product.category}
                        </h3>
                        <h3 className="text-xl md:text-lg sm:text-md text-white font-bold">
                          {product.sub_cateory}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 container mx-auto">
                    <div className="md:container md:mx-auto">
                      <h2 className="text-lg md:text-md sm:text-sm font-bold">{product.title}</h2>
                    </div>
                    <div className="flex justify-start">
                      <p className="text-gray-900 bg-yellow-400 font-bold mt-2 p-1 cash-currency rounded-tl-lg rounded-br-lg ">
                        <span className="font-medium text-xl font-serif">{product.currency} </span>
                        <sup>$</sup>
                        {product.price.toFixed(2)}
                      </p>
                    </div>
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
        {currentProducts && currentProducts.length <= 0 && (
          <div className="col-span-full flex justify-center items-center h-full">
            <p className="text-gray-500 text-center">No items found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export const ProductGrid = ({ data, initialCategory }) => {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState(initialCategory);
  const [selected, setSelected] = useState();
  const [subCategories, setSubCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // / Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [dataFiltered, setDataFiltered] = useState(data);
  const itemsPerPage = 12;
  // const data = useAppStore((state) => state.data);
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataFiltered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataFiltered.length / itemsPerPage);

  useEffect(() => {
    if (storage.getPage()) {
      const newOffset = (parseInt(storage.getPage()) * itemsPerPage) % dataFiltered.length;
      setItemOffset(newOffset);
    }
    setSelected(parseInt(storage.getPage()));
  }, [dataFiltered]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataFiltered.length;
    storage.setPage(event.selected);
    setSelected(event.selected);
    setItemOffset(newOffset);
    sendEvent(null, EVENT_TYPE.PAGE_PRODUCTS_VIEWED);
  };

  useMemo(() => {
    const distinctCategories = Array.from(new Set(data.map((item) => item.category)));
    const distinctSubCategories = Array.from(new Set(data.map((item) => item.sub_cateory)));
    setCategories(() => distinctCategories.map((item, index) => ({ value: index, label: item })));
    setSubCategories(() =>
      distinctSubCategories.map((item, index) => ({ value: index, label: item }))
    );
  }, [data]);

  useMemo(() => {
    const arrayCategories = [...selectedCategories.map((item) => item.label)];
    const arraySubCategories = [...selectedSubCategories.map((item) => item.label)];
    if (category) arrayCategories.push(category);

    const categoriesToFilter = Array.from(new Set(arrayCategories));
    const subCategoriesToFilter = Array.from(new Set(arraySubCategories));

    if (!category && categoriesToFilter.length <= 0 && subCategoriesToFilter.length <= 0) {
      // refreshSelectedCategories();
      setDataFiltered(data);
      return;
    }

    const filteredCategories =
      categoriesToFilter && categoriesToFilter.length > 0
        ? data.filter((item) => categoriesToFilter.includes(item.category))
        : [];
    const filteredSubCatgories =
      subCategoriesToFilter && subCategoriesToFilter.length > 0
        ? data.filter((item) => subCategoriesToFilter.includes(item.sub_cateory))
        : [];

    const filtered = [...filteredCategories, ...filteredSubCatgories];

    setDataFiltered(Array.from(new Set(filtered.length > 0 ? filtered : data)));

    refreshSelectedCategories();
  }, [category, data, selectedCategories, selectedSubCategories]);

  const orderOptions = (values) => {
    return values.filter((v) => v.isFixed).concat(values.filter((v) => !v.isFixed));
  };

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (storage.getCategories()) {
      try {
        const { category: cat, selCate, selSubCate } = JSON.parse(storage.getCategories());
        setCategory(cat);
        setSelectedCategories(selCate);
        setSelectedSubCategories(selSubCate);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, []);

  const handleChangeCategories = (newValue, actionMeta) => {
    // eslint-disable-next-line default-case
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        newValue = categories.filter((v) => v.isFixed);
        break;
    }

    setSelectedCategories(() => orderOptions(newValue));
    refreshSelectedCategories(orderOptions(newValue), selectedSubCategories);
  };

  function refreshSelectedCategories(newCategories = null, newSubCategories = null) {
    storage.setCategories(
      JSON.stringify({
        category,
        selCate: newCategories ?? selectedCategories,
        selSubCate: newSubCategories ?? selectedSubCategories,
      })
    );
  }
  const handleChangeSubCategories = (newValue, actionMeta) => {
    // eslint-disable-next-line default-case
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        newValue = subCategories.filter((v) => v.isFixed);
        break;
    }

    setSelectedSubCategories(() => orderOptions(newValue));
    refreshSelectedCategories(selectedCategories, orderOptions(newValue));
  };

  const Input = (inputProps) => <components.Input {...inputProps} autoComplete={'nope'} />;
  const customStyles = {
    ///.....
    menuPortal: (provided) => ({ ...provided, zIndex: 999 }),
    menu: (provided) => ({ ...provided, zIndex: 999 }),
    ///.....
  };
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-auto gap-2">
        <Select
          // {...rest}
          components={{ Input }}
          inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
          closeMenuOnSelect={false}
          className="basic-single mb-2 w-full z-[4]"
          classNamePrefix="select"
          isMulti
          onChange={handleChangeCategories}
          value={selectedCategories}
          isClearable={true}
          isSearchable={false}
          name="Categories"
          options={categories}
          // menuPortalTarget={document.body}
          // menuPosition={'fixed'}
          // styles={customStyles}
          menuPosition={'fixed'}
          // menuPortalTarget={document.body}
          menuPortalTarget={document.querySelector('body')}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 4 }) }}
        />
        <Select
          inputProps={{ autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
          components={{ Input }}
          closeMenuOnSelect={false}
          className="basic-single mb-2 w-full z-[4]"
          classNamePrefix="select"
          isMulti
          onChange={handleChangeSubCategories}
          value={selectedSubCategories}
          isClearable={true}
          isSearchable={false}
          name="Sub Categories"
          options={subCategories}
          // menuPortalTarget={document.body}
          // menuPosition={'fixed'}
          // styles={customStyles}
          menuPortalTarget={document.querySelector('body')}
          // menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 4 }) }}
          menuPosition={'fixed'}
        />
      </div>
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
        forcePage={selected}
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

import { ContentLayout } from '@/components/Layout';
import { ProductGrid } from '../components/product-grid';
import { getData } from '@/utils/data';
import { useState } from 'react';
import { useEffect } from 'react';
import TopProductViewed from '../components/top-product-category-viewed';
import TopProductSold from '../components/top-product-category-sold';
import { useCallback } from 'react';
import { BestSellerProductPerCategoryView } from '../components/best-seller-product-per-category-view';

export const Products = () => {
  const [data, setData] = useState();
  const [category, setCategory] = useState('');
  const [topSoldCategory, setTopSoldCategory] = useState('');
  const [topViewedcategory, setTopViewedCategory] = useState('');
  const [haveDataAnalyzed, setHaveDataAnalyzed] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await getData();
    setData(response);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) return <></>;

  const handleDataLoaded = (value) => {
    setHaveDataAnalyzed(() => value);
  };
  const handleCategoryClick = (categorySelected, type) => {
    if (type === 'TopProductViewed') {
      setTopSoldCategory('');
      setTopViewedCategory(categorySelected);
    } else if (type === 'TopProductSold') {
      setTopViewedCategory('');
      setTopSoldCategory(categorySelected);
    }
    setCategory(() => categorySelected);
  };

  return (
    <ContentLayout
      title="Products"
      className={
        haveDataAnalyzed
          ? `max-w-full px-4 sm:px-6 md:px-8`
          : 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8'
      }
    >
      {haveDataAnalyzed && (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 mt-4 flex flex-col gap-2">
            <TopProductViewed
              handleDataLoaded={handleDataLoaded}
              handleCategoryClick={handleCategoryClick}
              initialCategory={topViewedcategory}
            />
            <TopProductSold
              handleDataLoaded={handleDataLoaded}
              handleCategoryClick={handleCategoryClick}
              initialCategory={topSoldCategory}
            />
            <BestSellerProductPerCategoryView category={category} />
          </div>
          <div className={`self-start col-span-3 flex items-center justify-center `}>
            <div className="max-w-full w-full">
              <div className="mt-4">
                <ProductGrid data={data} initialCategory={category} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!haveDataAnalyzed && (
        <div className="mt-4">
          <ProductGrid data={data} category={category} />
        </div>
      )}
    </ContentLayout>
  );
};

import { ContentLayout } from '@/components/Layout';
import { ProductGrid } from '../components/product-grid';
import { getData } from '@/utils/data';
import { useState } from 'react';
import { useEffect } from 'react';
import TopProductViewed from '../components/top-product-category-viewed';
import TopProductSold from '../components/top-product-category-sold';
import { useCallback } from 'react';
import { BestSellerProductPerCategoryView } from '../components/best-seller-product-per-category-view';
import { Grid } from '@nextui-org/react';

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
        // <Grid.Container>
        //   <Grid xs sm>
        //     <div className="col-span-1 mt-4 flex flex-col gap-2">
        //       <TopProductViewed
        //         handleDataLoaded={handleDataLoaded}
        //         handleCategoryClick={handleCategoryClick}
        //         initialCategory={topViewedcategory}
        //       />
        //       <TopProductSold
        //         handleDataLoaded={handleDataLoaded}
        //         handleCategoryClick={handleCategoryClick}
        //         initialCategory={topSoldCategory}
        //       />
        //       <BestSellerProductPerCategoryView category={category} />
        //     </div>
        //   </Grid>
        //   <Grid xs={12} sm={12}>
        //     <Grid.Container>
        //       <div className="max-w-full w-full">
        //         <div className="mt-4">
        //           <ProductGrid data={data} initialCategory={category} />
        //         </div>
        //       </div>
        //     </Grid.Container>
        //   </Grid>
        // </Grid.Container>
        <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-1">
          <div className="col-span-1 mt-4 flex flex-col gap-2">
            <Grid.Container gap={2} style={{ padding: 0 }}>
              <Grid xs={12}>
                <TopProductViewed
                  handleDataLoaded={handleDataLoaded}
                  handleCategoryClick={handleCategoryClick}
                  initialCategory={topViewedcategory}
                />
              </Grid>
              <Grid xs={12}>
                <TopProductSold
                  handleDataLoaded={handleDataLoaded}
                  handleCategoryClick={handleCategoryClick}
                  initialCategory={topSoldCategory}
                />
              </Grid>
              <Grid xs={12} sm md className="w-full xs:w-1/2 mx-auto">
                <BestSellerProductPerCategoryView category={category} />
              </Grid>
            </Grid.Container>
          </div>
          <div
            className={`self-start md:col-span-3 sm:col-span-1 flex items-center justify-center `}
          >
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

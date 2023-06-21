import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import LastViewedProduct from '@/features/product/components/last-viewed-product';
import RecommendedProductCategory from '@/features/product/components/recommended-product-category';

export const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 xs:grid-cols-1  h-full gap-2 max-w-screen px-4 sm:px-6 md:px-8 mt-3">
          <LastViewedProduct />
          <RecommendedProductCategory />
        </div>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

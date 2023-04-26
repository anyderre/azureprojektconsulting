import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import LastViewedProduct from '@/features/product/components/last-viewed-product';

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
        <LastViewedProduct />
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

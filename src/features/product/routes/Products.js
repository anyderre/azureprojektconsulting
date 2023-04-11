import { ContentLayout } from '@/components/Layout';
import { ProductGrid } from '../components/product-grid';

export const Products = () => {
  return (
    <ContentLayout title="Products">
      <div className="mt-4">
        <ProductGrid />
      </div>
    </ContentLayout>
  );
};

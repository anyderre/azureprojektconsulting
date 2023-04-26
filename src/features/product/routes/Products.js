import { ContentLayout } from '@/components/Layout';
import { ProductGrid } from '../components/product-grid';
import { getData } from '@/utils/data';
import { useState } from 'react';
import { useEffect } from 'react';

export const Products = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getData();
      setData(response);
    }
    fetchData();
  }, []);

  if (!data) return <></>;

  return (
    <ContentLayout title="Products">
      <div className="mt-4">
        <ProductGrid data={data} />
      </div>
    </ContentLayout>
  );
};

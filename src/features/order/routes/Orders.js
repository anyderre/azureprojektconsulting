import { ContentLayout } from '@/components/Layout';
import { OrdersList } from '../components/orders';
import { Link, Button } from '@/components/Elements';
import { ArchiveIcon } from '@heroicons/react/outline';

export const Orders = () => {
  return (
    <ContentLayout title="Orders">
      <div className="mt-4 bg-white rounded-lg shadow-md p-2 grid grid-rows grid-flow-row gap-2">
        <OrdersList />
        <div className="place-self-end">
          <Link className="" to={`/public/products`}>
            <Button size="sm" variant="primary" endIcon={<ArchiveIcon className="w-4 h-4" />}>
              Order your product now
            </Button>
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
};

import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/format';
import { useOrders } from '../api/getOrders';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const OrdersList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);

  const ordersQuery = useOrders({ username: user?.username });

  if (ordersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!ordersQuery.data) return null;

  return (
    <Table
      data={ordersQuery.data}
      columns={[
        {
          title: 'Product',
          field: 'productId',
          className: 'px-6 py-4 text-sm font-medium text-gray-900',
          Cell({ entry: { productId, productName } }) {
            return (
              <Link className="break-all" to={`/public/products/${productId}`}>
                {productName}
              </Link>
            );
          },
        },
        {
          title: 'Brand',
          field: 'productBrand',
        },
        {
          title: 'Currency',
          field: 'productCurrency',
        },
        {
          title: '$Price',
          field: 'productPrice',
        },
        {
          title: 'Order Total',
          field: 'orderTotal',
        },
        {
          title: 'Created At',
          field: 'createdDate',
          Cell({ entry: { createdDate } }) {
            return <span>{formatDate(createdDate)}</span>;
          },
        },
      ]}
    />
  );
};

import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { Link } from '@/components/Elements';
export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      {user && (
        <h1 className="text-xl mt-2">
          Welcome <b>{`${user?.firstName} ${user?.lastName}`}</b>
        </h1>
      )}
      <p className="font-medium">In this application you can:</p>
      <ul className="my-4 list-inside list-disc">
        <li>
          <Link to={`/public/products`}>Create Order</Link>
        </li>
        <li>
          <Link to={`/app/orders`}>See your Orders</Link>
        </li>
        <li>
          <Link to={`/public/products`}>View Products</Link>
        </li>
        <li>
          <Link to={`/public/products`}>View Product Info</Link>
        </li>
      </ul>
    </ContentLayout>
  );
};

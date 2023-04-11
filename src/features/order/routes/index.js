import { Navigate, Route, Routes } from 'react-router-dom';

// import { Register } from './Register';
import { Order } from './Order';
import { Orders } from './Orders';

export const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Orders />} />
      <Route path=":productId" element={<Order />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

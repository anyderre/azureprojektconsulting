import { lazyImport } from '@/utils/lazyImports';
import { App } from './app';

const { OrderRoutes } = lazyImport(() => import('@/features/order/routes'), 'OrderRoutes');

export const privateRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'orders/*',
        element: <OrderRoutes />,
      },
    ],
  },
];

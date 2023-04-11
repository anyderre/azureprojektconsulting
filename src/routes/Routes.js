import { Navigate } from 'react-router-dom';
import { Login } from '@/features/auth/routes/Login';
import { Register } from '@/features/auth/routes/Register';
import { lazyImport } from '@/utils/lazyImports';
import { Dashboard, Landing } from '@/features/home';
import { App } from './app';
const { ProductsRoutes } = lazyImport(() => import('@/features/product/routes'), 'ProductsRoutes');
const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const Routes = (user) => [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '/public',
    element: <App />,
    children: [
      {
        path: 'products/*',
        element: <ProductsRoutes />,
      },

      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

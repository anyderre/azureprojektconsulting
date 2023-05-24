// import { useAuth } from '@/lib/auth';
import { useRoutes } from 'react-router-dom';
import { Routes } from './Routes';
import { privateRoutes } from './PrivateRoutes';
import { Landing } from '@/features/home';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = Routes();

  const element = useRoutes([...routes, ...privateRoutes, ...commonRoutes]);

  return <>{element}</>;
};

// import { useAuth } from '@/lib/auth';
import { useRoutes } from 'react-router-dom';
import { Routes } from './Routes';
import { privateRoutes } from './PrivateRoutes';
import { useAuth } from '@/lib/auth';
import { Landing } from '@/features/home';

export const AppRoutes = () => {
  const auth = useAuth();
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = Routes(auth.user);

  const element = useRoutes([...routes, ...privateRoutes, ...commonRoutes]);

  return <>{element}</>;
};

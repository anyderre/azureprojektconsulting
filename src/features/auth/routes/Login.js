import { useNavigate, useLocation } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => navigate(-2)} />
    </Layout>
  );
};

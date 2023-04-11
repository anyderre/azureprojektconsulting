import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '@/stores/notifications';

import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  const handleOnSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Account Created successfully',
    });
    navigate('/auth/login/');
  };

  return (
    <Layout title="Register your account">
      <RegisterForm onSuccess={handleOnSuccess} />
    </Layout>
  );
};

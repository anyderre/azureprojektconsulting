import { initReactQueryAuth } from 'react-query-auth';
import { Spinner } from '@/components/Elements';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(data) {
  const { token, user } = data;
  storage.setToken(token);
  return user;
}

async function loadUser() {
  const token = storage.getToken();
  if (token && token !== null && token !== undefined && token !== 'undefined') {
    return storage.getUser();
  }
  return null;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data) {
  await registerWithEmailAndPassword(data);
  // const user = await handleUserResponse(response);
  return null;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin);
}

async function isLoggedIn() {
  return storage.getToken() !== null;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  isLoggedIn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);

import { axios } from '@/lib/axios';

export const loginWithEmailAndPassword = (data) => {
  return axios.post('/api/auth/signin', data);
};

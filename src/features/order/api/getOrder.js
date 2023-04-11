import { axios } from '@/lib/axios';

export const getOrder = (username) => {
  return axios.get(`/api/order/${username}`);
};

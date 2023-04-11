import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

export const getOrders = (username) => {
  return axios.get(`/api/order/list/${username}`);
};

export const useOrders = ({ config, username } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['orders'],
    queryFn: () => getOrders(username),
  });
};

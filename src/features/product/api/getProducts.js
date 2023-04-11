import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getProducts = () => {
  return axios.get(`/products`);
};

export const useProducts = ({ config }) => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: () => getProducts(),
    ...config,
  });
};

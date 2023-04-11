import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getProduct = ({ productId }) => {
  return axios.get(`/product`, {
    params: {
      productId,
    },
  });
};

export const useProduct = ({ productId, config }) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId }),
    ...config,
  });
};

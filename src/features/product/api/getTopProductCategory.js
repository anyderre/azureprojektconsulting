import { useQuery } from 'react-query';
import { handleError } from '@/lib/handle-error';
import { axiosInstance } from '@/lib/axios-instance';

export const getTopProductCategory = async (category) => {
  const params = {
    category,
  };
  return await axiosInstance.get(`/api/TopProductCategory`, { params }).catch(handleError);
};

export const useTopProductCategory = ({ config, category } = {}) => {
  return useQuery({
    fetchPolicy: 'network-only',
    ...config,
    queryKey: ['topProductCategory', category],
    queryFn: ({ queryKey }) => getTopProductCategory(queryKey[1]),
  });
};

import { useQuery } from 'react-query';
import { axiosInstance } from '@/lib/axios-instance';
import { handleError } from '@/lib/handle-error';

export const getTopSoldProduct = async () => {
  return await axiosInstance.get(`/api/TopSoldProduct`).catch(handleError);
};

export const useTopSoldProduct = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['topSoldProduct'],
    queryFn: () => getTopSoldProduct(),
  });
};

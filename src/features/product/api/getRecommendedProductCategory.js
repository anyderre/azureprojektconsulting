import { useQuery } from 'react-query';
import { axiosInstance } from '@/lib/axios-instance';
import { handleError } from '@/lib/handle-error';

export const getRecommendedProductCategory = async () => {
  return await axiosInstance.get(`/api/RecommendedProductCategory`).catch(handleError);
};

export const useRecommendedProductCategory = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['recommendedProductCategory'],
    queryFn: () => getRecommendedProductCategory(),
  });
};

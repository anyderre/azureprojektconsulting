import { useQuery } from 'react-query';
import { axiosInstance } from '@/lib/axios-instance';
import { handleError } from '@/lib/handle-error';
import { EVENT_TYPE } from '@/utils/enum';

export const getTopViewedProduct = async (event_type = EVENT_TYPE.PRODUCT_VIEW) => {
  const params = { event_type: event_type };
  return await axiosInstance.get(`/api/TopViewedProduct`, { params }).catch(handleError);
};

export const useTopViewedProduct = ({ config } = {}, event_type) => {
  return useQuery({
    ...config,
    queryKey: ['topViewedProduct'],
    queryFn: () => getTopViewedProduct(),
  });
};

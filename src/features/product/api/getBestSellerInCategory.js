import { useQuery } from 'react-query';
import { handleError } from '@/lib/handle-error';
import { axiosInstance } from '@/lib/axios-instance';

export const getBestSellerInCategory = async (visitorId, sessionId, eventType = 'View Product') => {
  const params = {
    visitor_id: visitorId,
    session_id: sessionId,
    event_type: eventType,
  };
  return await axiosInstance
    .get(`/api/TopSoldProductByCategory`, { params: params })
    .catch(handleError);
};

export const useBestSellerInCategory = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    fetchPolicy: 'network-only',
    ...config,
    queryKey: ['bestSellerInCategory'],
    queryFn: () => getBestSellerInCategory(visitorId, sessionId, eventType),
  });
};

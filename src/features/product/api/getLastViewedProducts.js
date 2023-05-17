import { useQuery } from 'react-query';
import { handleError } from '@/lib/handle-error';
import { axiosInstance } from '@/lib/axios-instance';

export const getLastViewedProducts = async (visitorId, sessionId, eventType = 'View Product') => {
  const params = {
    visitor_id: visitorId,
    session_id: sessionId,
    event_type: eventType,
  };
  return await axiosInstance
    .get(`/api/GetLastVisitedProduct`, { params: params })
    .catch(handleError);
};

export const useLastViewedProducts = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['getLastVisitedProduct'],
    queryFn: () => getLastViewedProducts(visitorId, sessionId, eventType),
  });
};

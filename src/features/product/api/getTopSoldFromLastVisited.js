import { useQuery } from 'react-query';
import { handleError } from '@/lib/handle-error';
import { axiosInstance } from '@/lib/axios-instance';

export const getTopSoldFromLastVisited = async (
  visitorId,
  sessionId,
  eventType = 'View Product'
) => {
  const params = {
    visitor_id: visitorId,
    session_id: sessionId,
    event_type: eventType,
  };
  return await axiosInstance.get(`/api/TopSellerByCategory`, { params: params }).catch(handleError);
};

export const useTopSoldFromLastVisited = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    fetchPolicy: 'network-only',
    ...config,
    queryKey: ['topSellerByCategory'],
    queryFn: () => getTopSoldFromLastVisited(visitorId, sessionId, eventType),
  });
};

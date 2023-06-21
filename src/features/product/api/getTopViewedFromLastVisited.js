import { useQuery } from 'react-query';
import { handleError } from '@/lib/handle-error';
import { axiosInstance } from '@/lib/axios-instance';
import { EVENT_TYPE } from '@/utils/enum';

export const getTopViewedFromLastVisited = async (
  visitorId,
  sessionId,
  eventType = EVENT_TYPE.PRODUCT_VIEW
) => {
  const params = {
    visitor_id: visitorId,
    session_id: sessionId,
    event_type: eventType,
  };
  return await axiosInstance.get(`/api/TopCategoryByView`, { params: params }).catch(handleError);
};

export const useTopViewedFromLastVisited = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    fetchPolicy: 'network-only',
    ...config,
    queryKey: ['topCategoryByView'],
    queryFn: () => getTopViewedFromLastVisited(visitorId, sessionId, eventType),
  });
};

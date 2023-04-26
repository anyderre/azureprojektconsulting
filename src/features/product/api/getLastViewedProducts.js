import { useQuery } from 'react-query';
import axios from 'axios';
import { API_FUNCTION_URL } from '@/config';

export const getLastViewedProducts = async (visitorId, sessionId, eventType = 'View Product') => {
  return await axios.get(`${API_FUNCTION_URL}/api/product/${visitorId}/${sessionId}/${eventType}`);
};

export const useLastViewedProducts = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['products'],
    queryFn: () => getLastViewedProducts(visitorId, sessionId, eventType),
  });
};

import { useQuery } from 'react-query';
import axios from 'axios';
import { API_FUNCTION_URL } from '@/config';
import axiosRetry from 'axios-retry';

export const getLastViewedProducts = async (visitorId, sessionId, eventType = 'View Product') => {
  return await axiosInstance
    .get(`/api/product/${visitorId}/${sessionId}/${eventType}`)
    .catch((err) => {
      if (err.response) {
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        // client never received a response, or request never left
      } else {
        // anything else
      }
    });
};

export const useLastViewedProducts = ({ config, visitorId, eventType, sessionId } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['products'],
    queryFn: () => getLastViewedProducts(visitorId, sessionId, eventType),
  });
};

const axiosInstance = axios.create({
  baseURL: `${API_FUNCTION_URL}`,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

axiosRetry(axiosInstance, {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});

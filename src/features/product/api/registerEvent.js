import { axios } from '@/lib/axios';

export const registerEvent = (data) => {
  return axios.post('/api/events/unique', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

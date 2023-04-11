import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

export const saveOrder = ({ data }) => {
  return axios.post(`/api/order/create`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const useSaveOrder = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries('orders');

      const previousOrders = queryClient.getQueryData('orders');

      queryClient.setQueryData('orders', [...(previousOrders || []), newOrder.data]);

      return { previousOrders };
    },
    onError: (_, __, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData('orders', context.previousOrders);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      addNotification({
        type: 'success',
        title: 'Order Created successfully',
      });
    },
    ...config,
    mutationFn: saveOrder,
  });
};

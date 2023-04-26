import { getData } from '@/utils/data';

const getProduct = async (productId) => {
  const data = await getData();
  return data.find((item) => item.uniq_id === productId) || null;
};

export { getProduct };

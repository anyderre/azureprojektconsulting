import data from '@/data/data';
const getProduct = (productId) => {
  return data.find((item) => item.uniq_id === productId) || null;
};

export { getProduct };
